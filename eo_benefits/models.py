from django.db import models

# Create your models here.

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