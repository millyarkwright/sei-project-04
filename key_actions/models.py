from django.db import models

# Create your models here.

class Key_action(models.Model):

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