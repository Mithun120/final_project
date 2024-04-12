import pymongo
import pandas as pd

# MongoDB connection parameters
mongo_uri = "mongodb+srv://finalproject:finalproject@finalproject.xa5ol.mongodb.net/"
database_name = "test"
collection_name = "users"

# Connect to MongoDB
client = pymongo.MongoClient(mongo_uri)
db = client[database_name]
collection = db[collection_name]

# Query MongoDB collection and fetch data
cursor = collection.find({})
data = list(cursor)

# Create a DataFrame from the MongoDB data
df = pd.DataFrame(data)

# Save DataFrame to CSV file
csv_filename = "mongodb_data.csv"
df.to_csv(csv_filename, index=False)

print(f"Data downloaded from MongoDB and saved to {csv_filename}.")
