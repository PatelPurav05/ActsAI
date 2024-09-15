import numpy as np
from sentence_transformers import SentenceTransformer
import chromadb
import pandas as pd

def get_therapists(query: list[str]):
    df = pd.read_csv('api/therapists_list/cambridge_therapists.csv')
    print(df)
    
    model = SentenceTransformer('all-MiniLM-L6-v2')
    names = df['Name']
    keywords = df['Keywords']
    phone = df['Phone Number']
    loc = df['Location']
    site = df['Website']

    keyword_embeddings = {}
    for n in range(len(names)):
        keyword_embeddings[names[n]] = model.encode(keywords[n]).tolist()

    # setup vector database

    client = chromadb.Client()

    collection_name = "therapists-db"

    try:
        client.delete_collection(name=collection_name)
        print(f"COLLECTION {collection_name} DELETED")
    except:
        print(f"COLLECTION {collection_name} DIDNT EXIST YET")

    collection = client.create_collection(
        name=collection_name,
        metadata={"hnsw:space": "cosine"}
    )

    # fill vector database
    for i in range(len(names)):
        print(f"Add stuff for topic {names[i]}")
        collection.add(
            embeddings=[keyword_embeddings[names[i]]], 
            documents=[names[i]],  
            metadatas=[{"names": names[i], "phone": phone[i], "location": loc[i], "website": site[i], "keywords": keywords[i]}],
            ids=[str(i)]  
        )

    results = collection.query(
        query_texts=query,
        n_results=2,
    )

    return results