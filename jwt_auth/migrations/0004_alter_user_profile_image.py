# Generated by Django 4.1.1 on 2022-09-12 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jwt_auth', '0003_alter_bookmarkedrecipe_bookmarked_by_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile_image',
            field=models.CharField(blank=True, max_length=500),
        ),
    ]
