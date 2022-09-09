from django.contrib import admin
from .models import Recipe, OtherIngredient, OtherIngredientAmount, EssentialOilAmount, BaseOilAmount

# from django import forms
# from django_admin_hstore_widget.forms import HStoreFormField

# Register your models here.

admin.site.register(Recipe)
admin.site.register(OtherIngredient)
admin.site.register(OtherIngredientAmount)
admin.site.register(EssentialOilAmount)
admin.site.register(BaseOilAmount)

# #  ! Other Ingredients
# class OtherIngredientAmountAdminForm(forms.ModelForm):
#   amount = HStoreFormField()

#   class Meta:
#       model = OtherIngredientAmount
#       exclude = ()

# @admin.register(OtherIngredientAmount)
# class OtherIngredientAmountAdmin(admin.ModelAdmin):
#   form = OtherIngredientAmountAdminForm

# # ! Essential Oils
# class EssentialOilAmountAdminForm(forms.ModelForm):
#   amount = HStoreFormField()

#   class Meta:
#       model = EssentialOilAmount
#       exclude = ()

# @admin.register(EssentialOilAmount)
# class EssentialOilAmountAdmin(admin.ModelAdmin):
#   form = EssentialOilAmountAdminForm

# # ! Base Oils
# class BaseOilAmountAdminForm(forms.ModelForm):
#   amount = HStoreFormField()

#   class Meta:
#       model = BaseOilAmount
#       exclude = ()

# @admin.register(BaseOilAmount)
# class BaseAmountAdmin(admin.ModelAdmin):
#   form = BaseOilAmountAdminForm