"""news/serializers.py"""
from rest_framework import serializers
from .models import NewsCategory, NewsArticle


class NewsCategorySerializer(serializers.ModelSerializer):
    article_count = serializers.SerializerMethodField()

    class Meta:
        model  = NewsCategory
        fields = ['id', 'name', 'slug', 'description', 'article_count']
        read_only_fields = ['slug']

    def get_article_count(self, obj):
        return obj.articles.filter(status=NewsArticle.Status.PUBLISHED).count()


class NewsArticleListSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    author_name   = serializers.SerializerMethodField()

    class Meta:
        model  = NewsArticle
        fields = [
            'id', 'title', 'slug', 'category', 'category_name',
            'excerpt', 'image', 'status', 'author_name', 'published_at',
        ]

    def get_category_name(self, obj):
        return obj.category.name

    def get_author_name(self, obj):
        return obj.author.get_full_name() if obj.author else 'KESME SACCO'


class NewsArticleDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    author_name   = serializers.SerializerMethodField()

    class Meta:
        model  = NewsArticle
        fields = [
            'id', 'title', 'slug', 'category', 'category_name',
            'excerpt', 'content', 'image', 'status',
            'author', 'author_name', 'published_at', 'created_at', 'updated_at',
        ]
        read_only_fields = ['slug', 'published_at', 'created_at', 'updated_at']

    def get_category_name(self, obj):
        return obj.category.name

    def get_author_name(self, obj):
        return obj.author.get_full_name() if obj.author else 'KESME SACCO'
