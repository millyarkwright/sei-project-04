# Generated by Django 4.1.1 on 2022-09-08 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Remedy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Pampering & Beauty', 'Pampering & Beauty'), ('Digestive Problems', 'Digestive Problems'), ('Respiratory Complaints', 'Respiratory Complaints'), ('Circulatory Problems', 'Circulatory Problems'), ('Aches & pains', 'Aches & Pains'), ('Skin Care', 'Skin Care'), ('Mind & Wellbeing', 'Mind & Wellbeing'), ("Women's Health", "Women's Health"), ('First Aid', 'First Aid')], max_length=30)),
            ],
        ),
    ]
