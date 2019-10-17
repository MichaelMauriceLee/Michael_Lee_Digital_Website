from django.db import models


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.FloatField()
    image_url = models.CharField(max_length=2083)
    github_url = models.CharField(max_length=2083)
