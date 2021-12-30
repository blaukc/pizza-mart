from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status
import json
import re

from django.contrib.auth.models import User
from .models import Pizza, Order

from .serializer import PizzaSerializer, OrderSerializer

# Create your views here.
class AllPizzas(APIView):
    def get(self, request, format=None):
        pizza = list(Pizza.objects.all())
        serializer = PizzaSerializer(pizza, many=True)
        return Response(serializer.data)

class PlaceOrder(APIView):
    def checkOrder(self, data):
        if data["address"] == '':
            return False
        if not re.match("^\d{6}$", data["postal_code"]):
            return False
        if not re.match("^[89]\d{7}$|^[89]\d{3} \d{4}$", data["contact_number"]):
            return False
        if not re.match("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$", data["email"].upper()):
            print(data["email"])
            return False

        return True


    def post(self, request, format=None):
        data = request.data

        if (not self.checkOrder(data)):
            return Response('Invalid Address/Postal Code/Contact Number/Email', status=status.HTTP_400_BAD_REQUEST)

        data["orders"] = json.dumps(data["orders"])
        serializer = OrderSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderDetails(APIView):
    def get(self, request, id, format=None):
        try:
            order = Order.objects.get(id=id)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
        serializer = OrderSerializer(order)
        data = serializer.data
        data["orders"] = json.loads(data["orders"])
        return Response(data)
