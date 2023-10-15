import openai
import json
import re
from django.conf import settings

# Initialize OpenAI API
# settings.configure()
openai.api_key = settings.OPENAI_API_KEY

def get_gpt_response(user_name, user_major, user_interest):
    # Construct the prompt
    # Construct the prompt
    prompt_text = f"""For someone with a {user_major} background like {user_name}, provide a succinct overview on {user_interest}. 
    Focus on one main topic (branch 0), two primary subtopics, and two sub-branches for each primary subtopic. 
    The main topic should have an extended description. Description should try to relate concepts regarding {user_interest} to {user_major}.
    Main topic has two to three sentences. Branch 0 Name must be the same as {user_interest}.

    Stick to the format:

Branch 0: [Branch 0 Name] 
Branch 0 Description: [Extended Description of {user_interest}. Explanation draws connections to {user_major}]

Branch 1: [Branch 1 Name]
Branch 1 Description: [Brief Branch 1 Description]

Branch 2: [Branch 2 Name]
Branch 2 Description: [Brief Branch 2 Description]

Branch 1_1: [Branch 1_1 Name]
Branch 1_1 Description: [Brief Branch 1_1 Description]

Branch 1_2: [Branch 1_2 Name]
Branch 1_2 Description: [Brief Branch 1_2 Description]

Branch 2_1: [Branch 2_1 Name]
Branch 2_1 Description: [Brief Branch 2_1 Description]

Branch 2_2: [Branch 2_2 Name]
Branch 2_2 Description: [Brief Branch 2_2 Description]

"""

    # Send the API request
    try:
        response = openai.Completion.create(engine="gpt-3.5-turbo-instruct", prompt=prompt_text, max_tokens=1000)
        # Extract the response text
        response_text = response.choices[0].text.strip()
        return response_text

    except openai.error.OpenAIError as e:
        print(f"Error encountered: {e}")
        return None

def extract_branch(text, email, interests):
    # Split the input text into lines
    lines = text.split('\n')

    # Initialize an empty dictionary to store the data
    data_dict = {}

    data_dict["email"] = email

    data_dict["interests"] = interests

    for line in lines:
        # Use regular expressions to match lines with the format '[Branch Name]: [Brief Branch Description]'
        match = re.match(r'([^:]+):\s(.+)', line)

        if match:
            branch_name, branch_description = match.groups()
            data_dict[branch_name] = branch_description

    json_object = json.dumps(data_dict, indent = 4)

    return json_object

def get_question(user_interest):
    prompt_text = f"Generate a simple question about {user_interest} for someone with little expertise on the field."

    try:
        response = openai.Completion.create(engine="gpt-3.5-turbo-instruct", prompt=prompt_text, max_tokens=1000)
        # Extract the response text
        response_text = response.choices[0].text.strip()
        data_dict = {"question": response_text}
        return json.dumps(data_dict, indent = 4)

    except openai.error.OpenAIError as e:
        print(f"Error encountered: {e}")
        return None

def feedback_ans(stored_question, stored_answer, user_major):
    # Construct a prompt for feedback tailored to the user_major
    prompt_text = f"""For someone with a {user_major} background, provide feedback on the following response and create analogies and connections to {user_major}:\n\nResponse: {stored_answer}\n\nQuestion: {stored_question}
    If the answer to the question is not fully correct, point out inaccuracies and explain in a friendly manner. Limit feedback to 200 characters. Use full sentences."""

    try:
        response = openai.Completion.create(engine="gpt-3.5-turbo-instruct", prompt=prompt_text, max_tokens=1000)
        # Extract the response text
        response_text = response.choices[0].text.strip()
        data_dict = {"feedback": response_text}
        return json.dumps(data_dict, indent = 4)

    except openai.error.OpenAIError as e:
        print(f"Error encountered: {e}")
        return None
    
def explain_more(user_interest, user_major):
    prompt_text = f"""Explain the topic of '{user_interest}' comprehensively. 
    Create analogies and connections to {user_major} where possible to enhance learning experience. :

General Overview. Title field [General Overview:]
[Provide a general overview of the topic in 3 short sentences. ends sentence with a "\n"]

Relationship to your Background. Title field [Background Relationship:]
[Explain how the topic of '{user_interest}' relates to {user_major} in a concise format. ends sentence with a "\n"]

Additional Fields to be Explored. Title field [Further Directions:]
[List 3 bullet points of fields or subtopics related to '{user_interest}' that the user can explore.
Only include the bullet points, do not add their descriptions. ends sentence with a "\n"]

"""

    try:
        response = openai.Completion.create(engine="gpt-3.5-turbo-instruct", prompt=prompt_text, max_tokens=1000)
        # Extract the response text
        response_text = response.choices[0].text.strip()
        data_dict = {"explanation": response_text}
        return json.dumps(data_dict, indent = 4)

    except openai.error.OpenAIError as e:
        print(f"Error encountered: {e}")
        return None
    