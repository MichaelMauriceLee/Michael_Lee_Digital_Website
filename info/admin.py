from django.contrib import admin
from .models import Project

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'image_url', 'github_url')


admin.site.register(Project, ProductAdmin)
