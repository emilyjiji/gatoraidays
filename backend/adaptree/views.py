from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AdapTree
import json



@csrf_exempt
def create(request):
    if request.method == 'POST':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            # Check if the data contains a "value" key
            if 'email' in data:
                value = data['email']

                # Create an instance of MyModel
                instance = AdapTree(email=value, name="John Doe", major="Computer Science",
                                    interests=["Machine Learning", "Web Development", "Data Science"])
                instance.save()

                return JsonResponse({'result': value})

            else:
                return JsonResponse({'error': 'Missing "value" in data.'}, status=400)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
