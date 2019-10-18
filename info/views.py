from django.shortcuts import render



def index(request):
    return render(request, 'home.html')


def about(request):
    return render(request, 'about.html')


def projects(request):
    return render(request, 'projects.html')


def contact(request):
    return render(request, 'contact.html')
