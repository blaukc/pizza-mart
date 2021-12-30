from django.db import models
import uuid

# Create your models here.
class Pizza(models.Model):
    id = models.AutoField(primary_key=True)
    pizza_name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    description = models.TextField()
    image = models.ImageField(upload_to='images/')
    category = models.CharField(max_length=200)
    inStock = models.BooleanField()
    allergyTags = models.TextField()
    createdAt = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Pizza"

    def __str__(self):
        return self.pizza_name

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    orders = models.TextField()
    address = models.CharField(max_length=200)
    postal_code = models.CharField(max_length=200)
    contact_number = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    preparing = models.BooleanField(default=False)
    delivering = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
