from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AdapTree
import json
from . import openai_integration



@csrf_exempt
def create(request):
    if request.method == 'POST':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            # Check if the data contains a "value" key
            if 'email' in data:

                # try:
                #     record = AdapTree.objects.get(email=data['email'])  # Replace 'id' with the actual field you're using for identification
                # except AdapTree.DoesNotExist:
                #     instance = AdapTree(email=data['email'], name=data['name'], major=data['major'],
                #                     interests=data['interests'])
                #     instance.save()

                if AdapTree.objects.filter(email=data['email']).exists():
                    record = AdapTree.objects.get(email=data['email'])
                    record.name = data['name']
                    record.major = data['major']
                    record.interests.append(data['interests'][0]) #= record.interests['interests'].append(data['interests'])
                    record.save()

                else:
                    instance = AdapTree(email=data['email'], name=data['name'], major=data['major'],
                                    interests=[data['interests'][0]])
                    instance.save()

                gptresponse = openai_integration.get_gpt_response(data['name'], data['major'], data['interests'])
                json_obj = openai_integration.extract_branch(gptresponse, data['email'])




                return JsonResponse(json_obj, safe=False)

            else:
                return JsonResponse({'error': 'Missing "value" in data.'}, status=400)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)