from django.db import models

# Create your models here.

class Remedy(models.Model):

  remedy_choices = [
    ('Pampering & Beauty','Pampering & Beauty'),
    ('Digestive Problems','Digestive Problems'),
    ('Respiratory Complaints','Respiratory Complaints'),
    ('Circulatory Problems','Circulatory Problems'),
    ('Aches & pains','Aches & Pains'),
    ('Skin Care','Skin Care'),
    ('Mind & Wellbeing','Mind & Wellbeing'),
    ("Women's Health","Women's Health"),
    ('First Aid','First Aid'),
  ]
  name = models.CharField(
    max_length=30,
    choices=remedy_choices)

  def __str__(self):
    return f"{self.name}"