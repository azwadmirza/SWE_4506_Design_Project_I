from django.shortcuts import render
from django.http import HttpResponse

def signup(request):
    return HttpResponse("Sign Up")

def login(request):
    return HttpResponse("Login")