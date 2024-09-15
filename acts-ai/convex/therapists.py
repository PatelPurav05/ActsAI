import csv
from convex import ConvexClient
from huggingface_hub import InferenceClient
import os
from dotenv import load_dotenv
client = InferenceClient(token="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")

# Load environment variables
load_dotenv()

# Initialize Convex client
convex = ConvexClient("https://combative-firefly-935.convex.cloud")

# Initialize Hugging Face client for Jina embeddings
hf_client = InferenceClient("jinaai/jina-embeddings-v2-base-en")

def get_embedding(text):
    while True:
        try:
            embedding = client.feature_extraction(text)
            return embedding
        except HfHubHTTPError as e:
            if e.response.status_code == 429:
                print("Rate limit reached. Waiting 60 seconds...")
                time.sleep(60)
            else:
                raise Error



def insert_therapist(name, phone, location, website, keywords):
    # Generate embedding for keywords
    embedding = get_embedding(keywords)
    
    # Insert into Convex database
    convex.mutation("insertTherapist", {
        "name": name,
        "phone": phone,
        "location": location,
        "website": website,
        "keywords": keywords,
        "embedding": embedding.tolist()  # Convert numpy array to list
    })

# Read CSV and insert data
csv_path = 'api/therapists_list/cambridge_therapists.csv'
with open(csv_path, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        insert_therapist(
            row['Name'],
            row['Phone Number'],
            row['Location'],
            row['Website'],
            row['Keywords']
        )
        print(f"Inserted therapist: {row['Name']}")

print("All therapists inserted successfully!")