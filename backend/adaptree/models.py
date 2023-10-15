from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

class AdapTree(models.Model):
    email = models.EmailField(primary_key=True)
    name = models.TextField()
    major = models.TextField()
    interests = ArrayField(models.TextField())


    def _str_(self):
        return self.email