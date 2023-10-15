from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AdapTree
import json
from . import openai_integration



@csrf_exempt
def create(request):
    """{
    "email": "idk@verizon.com", 
    "name": "abi daddy",
    "major": "gender studies",
    "interests": "lebron's sperm"
    }"""
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
                    if data['interests'] not in record.interests:
                        record.interests.append(data['interests']) #= record.interests['interests'].append(data['interests'])
                    record.save()

                else:
                    instance = AdapTree(email=data['email'], name=data['name'], major=data['major'],
                                    interests=[data['interests']])
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

@csrf_exempt
def interests(request):
    """{
    "email": "idk@verizon.com",
    }"""
    if request.method == 'GET':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            # Check if the data contains a "value" key
            if 'email' in data:

                if AdapTree.objects.filter(email=data['email']).exists():
                    record = AdapTree.objects.get(email=data['email'])
                    data_dict = {"interests": record.interests}
                    json_obj = json.dumps(data_dict, indent = 4)
                    return JsonResponse(json_obj, safe=False) 
                else:
                    json_obj = json.dumps({}, indent = 4)
                    return JsonResponse(json_obj, safe=False)


            else:
                return JsonResponse({'error': 'Missing "value" in data.'}, status=400)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt  
def clicknode(request):
    """{
    "email": "idk@verizon.com", 
    "interest": "lebron's sperm"
    }"""
    if request.method == 'PUT':
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
                    if data['interest'] not in record.interests:
                        record.interests.append(data['interest']) #= record.interests['interests'].append(data['interests'])
                    record.save()

                    gptresponse = openai_integration.get_gpt_response(record.name, record.major, data['interest'])
                    json_obj = openai_integration.extract_branch(gptresponse, data['email'])

                    return JsonResponse(json_obj, safe=False)

            else:
                return JsonResponse({'error': 'Missing "value" in data.'}, status=400)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)