from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class AdapTree(models.Model):
    email = models.EmailField(primary_key=True)
    name = models.CharField()
    major = models.CharField()
    interests = ArrayField(models.TextField())

    def _str_(self):
        return self.email