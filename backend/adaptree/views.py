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

            # Check if the necessary fields are present in the data
            if all(field in data for field in ['email', 'name', 'major', 'interest']):
                instance = AdapTree(email=data['email'], name=data['name'], major=data['major'],
                                    interests=[data['interest']])  # note: you might want to modify the model to handle multiple interests
                instance.save()

                return JsonResponse({'result': 'Data saved successfully.'})

            else:
                return JsonResponse({'error': 'Missing required fields in data.'}, status=400)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)


# function to be used as an endpoint
from .openai_integration import get_gpt_response, extract_branch

@csrf_exempt
def openai_response(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            if all(key in data for key in ['name', 'major', 'interest']):
                response = get_gpt_response(data['name'], data['major'], data['interest'])
                
                if response:
                    return JsonResponse({'result': response})
                else:
                    return JsonResponse({'error': 'Failed to get response from OpenAI'}, status=500)

            else:
                return JsonResponse({'error': 'Missing required fields in data.'}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
