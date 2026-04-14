"""news/admin.py"""
from django.contrib import admin
from .models import NewsCategory, NewsArticle


@admin.register(NewsCategory)
class NewsCategoryAdmin(admin.ModelAdmin):
    list_display  = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display  = ['title', 'category', 'author', 'status', 'published_at', 'created_at']
    list_filter   = ['status', 'category']
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at', 'published_at']
    date_hierarchy  = 'created_at'
    actions = ['publish_articles', 'archive_articles']

    def publish_articles(self, request, queryset):
        queryset.update(status=NewsArticle.Status.PUBLISHED)
        self.message_user(request, f'{queryset.count()} article(s) published.')
    publish_articles.short_description = 'Publish selected articles'

    def archive_articles(self, request, queryset):
        queryset.update(status=NewsArticle.Status.ARCHIVED)
        self.message_user(request, f'{queryset.count()} article(s) archived.')
    archive_articles.short_description = 'Archive selected articles'
