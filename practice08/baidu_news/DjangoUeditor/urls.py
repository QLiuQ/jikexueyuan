# coding:utf-8
from views import get_ueditor_controller
from django.conf.urls import url

urlpatterns = [
    url(r'^controller/$', get_ueditor_controller),
]
