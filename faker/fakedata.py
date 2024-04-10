from pymongo import MongoClient
from faker import Faker
from datetime import datetime, timedelta
import random

# Connect to MongoDB
client = MongoClient('mongodb+srv://finalproject:finalproject@finalproject.xa5ol.mongodb.net/')
db = client['test']  # Replace 'your_database_name' with your actual database name

# Initialize Faker for fake data generation
fake = Faker()

# Generate fake data for users
def generate_users(num_users):
    users_data = []
    for _ in range(num_users):
        user = {
            'name': fake.name(),
            'email': fake.email(),
            'userType': 'user',
            'role': random.choice(['intern', 'software engineer', 'consultant', 'tribe master']),
            'password': fake.password(),
            'changedPassword': False,
            'otp': random.randint(1000, 9999)
        }
        users_data.append(user)
    return users_data

# Generate fake data for projects
def generate_projects(num_projects):
    projects_data = []
    for _ in range(num_projects):
        project = {
            'projectName': fake.company(),
            'projectId': fake.uuid4(),
            'category': random.choice(['Web Development', 'Mobile App', 'Data Science', 'AI/ML']),
            'startDate': (datetime.now() - timedelta(days=random.randint(30, 90))).strftime('%Y-%m-%d'),
            'endDate': (datetime.now() + timedelta(days=random.randint(60, 120))).strftime('%Y-%m-%d')
        }
        projects_data.append(project)
    return projects_data

# Generate fake data for project allocation
def generate_project_allocation(users_data, projects_data):
    allocation_data = []
    for user in users_data:
        allocation = {
            'email': user['email'],
            'projectId': random.choice(projects_data)['projectId'],
            'allocation_start': (datetime.now() - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d'),
            'allocation_end': (datetime.now() + timedelta(days=random.randint(60, 90))).strftime('%Y-%m-%d'),
            'created_at': datetime.now()
        }
        allocation_data.append(allocation)
    return allocation_data

# Generate fake data for timesheets
def generate_timesheets(users_data, projects_data):
    timesheets_data = []
    for user in users_data:
        timesheet = {
            'UID': fake.uuid4(),
            'email': user['email'],
            'projectId': random.choice(projects_data)['projectId'],
            'activity': random.choice(['Coding', 'Testing', 'Meetings', 'Documentation']),
            'comments': fake.text(),
            'start_period': (datetime.now() - timedelta(days=random.randint(0, 7))).strftime('%Y-%m-%d'),
            'end_period': (datetime.now() + timedelta(days=random.randint(1, 7))).strftime('%Y-%m-%d'),
            'mon': random.randint(0, 8),
            'tue': random.randint(0, 8),
            'wed': random.randint(0, 8),
            'thur': random.randint(0, 8),
            'fri': random.randint(0, 8),
            'sat': random.randint(0, 8),
            'sun': random.randint(0, 8),
            'created_at': datetime.now(),
            'visible': True,
            'flag': False
        }
        timesheets_data.append(timesheet)
    return timesheets_data

# Generate fake data for feedbacks
def generate_feedbacks(users_data):
    feedbacks_data = []
    for user in users_data:
        feedback = {
            'email': user['email'],
            'role': user['role'],
            'q1': random.randint(1, 5),
            'q2': random.randint(1, 5),
            'q3': random.randint(1, 5),
            'q4': random.randint(1, 5),
            'q5': random.randint(1, 5),
            'q6': random.randint(1, 5),
            'comments': fake.text(),
            'start_period': (datetime.now() - timedelta(days=random.randint(0, 30))).strftime('%Y-%m-%d'),
            'end_period': (datetime.now() + timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d'),
            'flag': False,
            'created_at': datetime.now()
        }
        feedbacks_data.append(feedback)
    return feedbacks_data

# Generate fake data
num_users = 1000
num_projects = 500

users_data = generate_users(num_users)
projects_data = generate_projects(num_projects)
allocation_data = generate_project_allocation(users_data, projects_data)
timesheets_data = generate_timesheets(users_data, projects_data)
feedbacks_data = generate_feedbacks(users_data)

# Insert data into MongoDB
db['users'].insert_many(users_data)
db['projects'].insert_many(projects_data)
db['projectallocation'].insert_many(allocation_data)
db['timesheets'].insert_many(timesheets_data)
db['feedbacks'].insert_many(feedbacks_data)
