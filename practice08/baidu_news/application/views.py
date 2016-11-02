from django.shortcuts import render, redirect
from models import Category, NewsList


# Create your views here.
def index(request, pk=1):
    navs = Category.objects.all()
    navs_count = navs.count()

    news_list = NewsList.objects.filter(category_id=pk)
    return render(request, 'index.html', locals())


def index_redirect(request):
    return redirect('nav/1/', parament=True)


def news(request, pk):
    news_list = NewsList.objects.get(pk=pk)
    news_category = Category.objects.get(id=news_list.category_id_id)
    return render(request, 'news.html', locals())
