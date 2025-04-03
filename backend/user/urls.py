from django.urls import path
from .views import login, register,user_me

urlpatterns = [
    path('me', user_me, name='user_me'),
    path('login', login, name='login'),
    path('register', register, name='register')
    # path('logout', logout_view, name='logout'),
]