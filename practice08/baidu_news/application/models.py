# coding=utf-8
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

from DjangoUeditor.models import UEditorField
from django.core.urlresolvers import reverse


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=20, verbose_name=u'类型', unique=True)

    def __unicode__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('category', args=(self.id,))

    class Meta:
        verbose_name = u'分类'
        verbose_name_plural = u'分类'


class NewsList(models.Model):
    category_id = models.ForeignKey(Category, verbose_name=u'类型')
    news_title = models.CharField(max_length=50, verbose_name=u'标题')
    news_source = models.CharField(max_length=20, verbose_name=u'新闻来源')
    news_pic = models.ImageField(upload_to='img', null=True, blank=True, verbose_name=u'附图')
    news_content = UEditorField('正文', height=300, width=1000, default=u'', blank=True,
                                imagePath='img', filePath='files', toolbars='besttome')
    news_time = models.DateTimeField(verbose_name=u'添加时间', default=timezone.now)

    def __unicode__(self):
        return self.news_title

    def get_absolute_url(self):
        return reverse('newslist', args=(self.pk, ))

    class Meta:
        verbose_name = u'新闻'
        verbose_name_plural = u'新闻'
