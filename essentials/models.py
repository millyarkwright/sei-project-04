from django.db import models
from django.contrib.postgres.fields import ArrayField
# from django.contrib.postgres.fields import HStoreField
# from django.contrib.postgres.operations import HStoreExtension

# Create your models here.

class Essential(models.Model):
  name = models.CharField(max_length=100)
  latin_name = models.CharField(max_length=100)
  key_action = models.ForeignKey(
    'essentials.KeyAction',
    related_name='essential_oils',
    on_delete=models.DO_NOTHING
  )
  method_of_extraction = models.CharField(max_length=250)
  description_short = models.TextField(max_length=250)
  description_long = models.TextField(max_length=800)
  the_essential_oil = models.TextField(max_length=400)
  the_plant = models.TextField(max_length=500)
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

  blends_well_with = models.ManyToManyField(
    'self',
    blank=True,
  )

  def __str__(self):
    return f"{self.name}"


# ! Key Actions

class KeyAction(models.Model):

  key_action_choices = [
    ('Balancing','Balancing'),
    ('Cleansing','Cleansing'),
    ('Energising','Energising'),
    ('Relaxing','Relaxing'),
    ('Uplifting','Uplifting'),
  ]
  name = models.CharField(
    max_length=10,
    choices=key_action_choices)

  def __str__(self):
    return f"{self.name}"
    

# ! Essential Oil Uses

class EoUse(models.Model):
  title = models.CharField(max_length=50)
  description = models.TextField(max_length=300)
  essential_oil = models.ForeignKey(
    'essentials.Essential',
    related_name= 'uses',
    on_delete=models.DO_NOTHING
  )

  def __str__(self):
    return f"{self.essential_oil} - {self.title}"


# ! Essential Oil Benefits

class EoBenefit(models.Model):
  title = models.CharField(max_length=50)
  description = models.TextField(max_length=300)
  essential_oil = models.ForeignKey(
    'essentials.Essential',
    related_name = 'benefits',
    on_delete=models.DO_NOTHING
  )

  def __str__(self):
    return f"{self.essential_oil} - {self.title}" 

# ! Essential Oil Key Actions

