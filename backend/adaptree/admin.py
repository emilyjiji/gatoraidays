from django.contrib import admin
from .models import AdapTree

class adaptreeAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'major', 'interests')

# Register your models here.

admin.site.register(AdapTree, adaptreeAdmin)