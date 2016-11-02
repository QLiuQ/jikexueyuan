from django.contrib import admin
from models import *


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)


class NewsListAdmin(admin.ModelAdmin):
    list_display = ('category_id', 'news_title', 'news_source', 'news_time')
    search_fields = ('category_id__name', 'news_title', 'news_source')
    list_filter = ('category_id__name',)
    list_per_page = 20


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(NewsList, NewsListAdmin)
