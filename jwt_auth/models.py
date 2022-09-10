from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
  email = models.CharField(max_length=150, unique=True)
  username = models.CharField(max_length=20, unique=True)
  profile_image = models.CharField(max_length=500)


class BookmarkedRecipe(models.Model):
  bookmarked_by = models.ForeignKey(
    'jwt_auth.User',
    related_name='bookmarked_recipes',
    on_delete=models.CASCADE
  )
  bookmarked_recipe = models.ForeignKey(
    'recipes.Recipe',
    related_name = 'bookmarked_recipes_list',
    on_delete=models.CASCADE
  )


class TestedRecipe(models.Model):
  
  tested_by = models.ForeignKey(
    'jwt_auth.User',
    related_name='tested_recipes',
    on_delete=models.CASCADE
  )
  
  tested_recipe = models.ForeignKey(
  'recipes.Recipe',
  related_name = 'tested_recipes_list',
  on_delete=models.CASCADE
  )