from django.urls import  path

from .views import AllPizzas, PlaceOrder, OrderDetails

urlpatterns = [
    path('pizza/', AllPizzas.as_view()),
    path('order/', PlaceOrder.as_view()),
    path('order/<slug:id>/', OrderDetails.as_view())
]
