# Generated by Django 4.0 on 2021-12-28 03:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pizzamart', '0005_orders'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Orders',
            new_name='Order',
        ),
    ]
