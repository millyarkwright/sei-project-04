from django.contrib import admin
from .models import Recipe, OtherIngredient, OtherIngredientAmount

from django import forms
from django_admin_hstore_widget.forms import HStoreFormField

# Register your models here.

admin.site.register(Recipe)
admin.site.register(OtherIngredient)

class OtherIngredientAmountAdminForm(forms.ModelForm):
  amount = HStoreFormField()

  class Meta:
      model = OtherIngredientAmount
      exclude = ()

@admin.register(OtherIngredientAmount)
class OtherIngredientAmountAdmin(admin.ModelAdmin):
  form = OtherIngredientAmountAdminForm


