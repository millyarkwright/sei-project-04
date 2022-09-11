from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.

# ! Base Oil Model
class BaseOil(models.Model):
  name = models.CharField(max_length=100)
  latin_name = models.CharField(max_length=100)
  description = models.TextField(max_length=500)
  the_base_oil = models.TextField(max_length= 400)
  safe_usage =  models.TextField(max_length=250, blank=True)
  image = models.CharField(max_length=100, default='tbc')
  
  def __str__(self):
    return f"{self.name}"

# ! Base Oil Benefits Model
class BoBenefit(models.Model):
  title = models.CharField(max_length=50)
  description = models.TextField(max_length=300)
  base_oil = models.ForeignKey(
    'bases.BaseOil',
    related_name= 'benefits',
    on_delete=models.DO_NOTHING
  )

  def __str__(self):
    return f"{self.base_oil} - {self.title}"