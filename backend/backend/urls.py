"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from adaptree import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create/', views.create, name='create'),
    path('interests/', views.getinterests, name='interests'),
    path('clicknode/', views.clicknode, name='clicknode'),
    path('returnhome/', views.returnhome, name='returnhome'),
    path('getquestion/', views.getquestion, name='getquestion'),
    path('feedbackans/', views.feedbackans, name='feedbackans'),
    path('explainmore/', views.explainmore, name='explainmore')
]
