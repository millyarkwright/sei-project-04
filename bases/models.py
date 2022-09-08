from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class BaseOil(models.Model):
  name = models.CharField(max_length=100)
  latin_name = models.CharField(max_length=100)
  description = models.TextField(max_length=500)
  the_base_oil = models.TextField(max_length= 400)
  safe_usage =  models.TextField(max_length=250, blank=True)
  
  def __str__(self):
    return f"{self.name}"