"""baidu_news URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf.urls.static import static
from django.contrib import admin
from DjangoUeditor import views as django_ueditor_views
import settings
from application import views

urlpatterns = [
    url(r'^$', views.index_redirect),
    url(r'nav/(?P<pk>\d+)/$', views.index, name='category'),
    url(r'news/(?P<pk>\d+)/$', views.news, name='newslist'),
    url(r'^admin/', admin.site.urls),
    url(r'^ueditor/', django_ueditor_views.get_ueditor_controller),
    # url(r'^static/(?P.*)$', 'django.views.static.serve',)

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
