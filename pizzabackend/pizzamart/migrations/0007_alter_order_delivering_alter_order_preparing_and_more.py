# Generated by Django 4.0 on 2021-12-28 03:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pizzamart', '0006_rename_orders_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='delivering',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='preparing',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='order',
            name='received',
            field=models.BooleanField(default=False),
        ),
    ]
