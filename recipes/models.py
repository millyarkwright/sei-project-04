from django.db import models
from django.contrib.postgres.fields import HStoreField

# Create your models here.


class Recipe(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=800)
    makes = models.TextField(max_length=100, blank=True)
    step_one = models.TextField(max_length=500)
    step_two = models.TextField(max_length=500, blank=True)
    step_three = models.TextField(max_length=500, blank=True)
    safe_usage = models.TextField(max_length=250, blank=True)
    public = models.BooleanField(default=True)

    applications = models.ManyToManyField(
      'applications.Application',
      related_name = 'recipes',
      blank=True
    )

    remedies = models.ManyToManyField(
      'remedies.Remedy',
      related_name = 'recipes',
      blank=True
    )

    def __str__(self):
        return f"{self.name}"


class OtherIngredient(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self):
      return f"{self.name}"


class OtherIngredientAmount(models.Model):
    amount = HStoreField(blank=True, null=True)
    other_ingredient = models.ForeignKey(
        'recipes.OtherIngredient',
        related_name='amount',
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(
        'recipes.Recipe',
        related_name='other_ingredient_amount',
        on_delete=models.CASCADE
    )

class EssentialOilAmount(models.Model):
    amount = HStoreField(blank=True, null=True)
    essential_oil = models.ForeignKey(
        'essentials.Essential',
        related_name='amount',
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(
        'recipes.Recipe',
        related_name='essential_oil_amount',
        on_delete=models.CASCADE
    )

class BaseOilAmount(models.Model):
    amount = HStoreField(blank=True, null=True)
    base_oil = models.ForeignKey(
        'bases.BaseOil',
        related_name='amount',
        on_delete=models.CASCADE
    )
    recipe = models.ForeignKey(
        'recipes.Recipe',
        related_name='base_oil_amount',
        on_delete=models.CASCADE
    )
