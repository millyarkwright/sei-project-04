from django.db import models

# Create your models here.

class Application(models.Model):

  application_choices = [
    ('Bath Oil','Bath Oil'),
    ('Massage Oil','Massage Oil'),
    ('Steam Inhalation','Steam Inalation'),
    ('Diffuser','Diffuser'),
    ('Fragrance','Fragrance'),
    ('Shower','Shower'),
    ('Foot Bath','Foot Bath'),
    ('Compress','Compress'),
    ('Mouthwash','Mouthwash'),
    ('Ointment','Ointment'),

  ]
  name = models.CharField(
    max_length=30,
    choices=application_choices)

  def __str__(self):
    return f"{self.name}"