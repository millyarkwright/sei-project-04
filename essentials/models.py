from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.postgres.fields import HStoreField
# from django.contrib.postgres.operations import HStoreExtension

# Create your models here.

class Essential(models.Model):
  name = models.CharField(max_length=100)
  latin_name = models.CharField(max_length=100)
  key_actions = models.ForeignKey(
    'key_actions.Key_action',
    related_name='essential_oils',
    on_delete=models.DO_NOTHING
  )
  method_of_extraction = models.CharField(max_length=250)
  description_short = models.TextField(max_length=250)
  description_long = models.TextField(max_length=800)
  the_essential_oil = models.TextField(max_length=400)
  the_plant = models.TextField(max_length=400)
  safe_usage = models.TextField(max_length=250)
  image = models.CharField(max_length=100)

  applications = models.ManyToManyField(
    'applications.Application',
    related_name = 'essential_oils',
    blank=True
  )

  remedies = models.ManyToManyField(
    'remedies.Remedy',
    related_name = 'essential_oils',
    blank=True
  )

  def __str__(self):
    return f"{self.name}"

