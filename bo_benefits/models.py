from django.db import models

# Create your models here.

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