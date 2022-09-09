from django.contrib import admin
from .models import Essential, EoUse, EoBenefit, KeyAction

# from django import forms
# from django_admin_hstore_widget.forms import HStoreFormField

# Register your models here.
admin.site.register(Essential)
admin.site.register(EoUse)
admin.site.register(EoBenefit)
admin.site.register(KeyAction)

# class EssentialAdminForm(forms.ModelForm):
#   benefits_test = HStoreFormField()
#   benefits_test2 = HStoreFormField()

#   class Meta:
#       model = Essential
#       exclude = ()

# @admin.register(Essential)
# class EssentialAdmin(admin.ModelAdmin):
#   form = EssentialAdminForm
