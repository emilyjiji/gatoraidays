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
    Focus on one main topic, two primary subtopics, and two sub-branches for each primary subtopic. 
    The main topic should have an extended description. Description should try to relate concepts regarding {user_interest} to {user_major}.
    Main topic has two to three sentences. 

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

def extract_branch(text, email):
    # Split the input text into lines
    lines = text.split('\n')

    # Initialize an empty dictionary to store the data
    data_dict = {}

    data_dict["email"] = email

    for line in lines:
        # Use regular expressions to match lines with the format '[Branch Name]: [Brief Branch Description]'
        match = re.match(r'([^:]+):\s(.+)', line)

        if match:
            branch_name, branch_description = match.groups()
            data_dict[branch_name] = branch_description

    json_object = json.dumps(data_dict, indent = 4)

    return json_object

def get_question(interest):
    pass

def feedback_ans(question, answer, major):
    pass