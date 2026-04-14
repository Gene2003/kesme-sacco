"""news/models.py"""
from django.db import models
from django.conf import settings
from django.utils import timezone
from django.utils.text import slugify


def article_image_path(instance, filename):
    ext = filename.split('.')[-1]
    return f'news/{instance.slug}.{ext}'


class NewsCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    description = models.CharField(max_length=200, blank=True)

    class Meta:
        verbose_name_plural = 'News Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class NewsArticle(models.Model):

    class Status(models.TextChoices):
        DRAFT     = 'draft',     'Draft'
        PUBLISHED = 'published', 'Published'
        ARCHIVED  = 'archived',  'Archived'

    title        = models.CharField(max_length=200)
    slug         = models.SlugField(unique=True, blank=True, max_length=220)
    category     = models.ForeignKey(NewsCategory, on_delete=models.PROTECT, related_name='articles')
    excerpt      = models.TextField(max_length=400, help_text='Short summary shown in listings')
    content      = models.TextField()
    image        = models.ImageField(upload_to=article_image_path, null=True, blank=True)
    status       = models.CharField(max_length=15, choices=Status.choices, default=Status.DRAFT)
    author       = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL,
        null=True, related_name='articles'
    )
    published_at = models.DateTimeField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at', '-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:200]
        if self.status == self.Status.PUBLISHED and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
