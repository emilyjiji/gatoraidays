from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import AdapTree
import json
from . import openai_integration



@csrf_exempt
def create(request):
    """
    REQUEST:
    {
    "email": "idk@verizon.com", 
    "name": "abi daddy",
    "major": "gender studies",
    "interests": "lebron's sperm"
    }
    RESPONSE
    {
    is long :o
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

                interest_list = None

                if AdapTree.objects.filter(email=data['email']).exists():
                    record = AdapTree.objects.get(email=data['email'])
                    record.name = data['name']
                    record.major = data['major']
                    if data['interests'] not in record.interests:
                        record.interests.append(data['interests']) #= record.interests['interests'].append(data['interests'])
                    record.save()
                    interest_list = record.interests
                    


                else:
                    instance = AdapTree(email=data['email'], name=data['name'], major=data['major'],
                                    interests=[data['interests']])
                    interest_list = [data['interests']]
                    instance.save()

                gptresponse = openai_integration.get_gpt_response(data['name'], data['major'], data['interests'])
                json_obj = openai_integration.extract_branch(gptresponse, data['email'], interest_list)




                return JsonResponse(json_obj, safe=False)

            else:
                return JsonResponse({'error': 'Missing "value" in data.'}, status=400)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def getinterests(request):
    """
    REQUEST
    {
    "email": "idk@verizon.com"
    }
    RESPONSE
    {
    "interests" = [interst1, intestse2, ...]
    }
    """
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
    """
    REQUEST
    {
    "email": "idk@verizon.com", 
    "interest": "lebron's sperm"
    }
    RESPONSE
    {
    returns the same stuff as create
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
    
@csrf_exempt
def returnhome(request):
    """
    REQUEST
    {
    "email": "idk@verizon.com"
    }
    RESPONSE
    {
    "name": "lebrone",
    "major": "pepsi",
    "email": "lebrone@raymone.cum"
    }"""
    if request.method == 'POST':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            # Check if the data contains a "value" key
            if 'email' in data:

                if AdapTree.objects.filter(email=data['email']).exists():
                    record = AdapTree.objects.get(email=data['email'])
                    data_dict = {"name": record.name, "major": record.major, "email": record.email}
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
def getquestion(request):
    """
    REQUEST
    {
    "interest": "lebron"
    }
    RESPONSE
    {
    "question" : "what is aaaaaaaahhhh?"
    }
    """
    if request.method == 'POST':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            json_obj = openai_integration.get_question(data['interest'])
            return JsonResponse(json_obj, safe=False)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
    
@csrf_exempt
def feedbackans(request):
    """
    REQUEST
    {
    "question": "who is lebron?",
    "answer": "lebron is not the goat",
    "major": "gender studies"
    }
    RESPONSE
    {
    "feedback": "that's a good answer!"
    }
    """
    if request.method == 'POST':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            json_obj = openai_integration.feedback_ans(data['question'], data['answer'], data['major'])
            return JsonResponse(json_obj, safe=False)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)
    
@csrf_exempt
def explainmore(request):
    """
    REQUEST
    {
    "interest": "bronny james",
    "major": "gender studies"
    }
    RESPONSE
    {
    "explanation": "1. blah 2. blah..."
    }
    """
    if request.method == 'POST':
        try:
            # Parse JSON data sent from the client
            data = json.loads(request.body)

            json_obj = openai_integration.explain_more(data['interest'], data['major'])
            return JsonResponse(json_obj, safe=False)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=405)