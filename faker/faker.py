from faker import Faker
import pandas as pd

# Initialize Faker
fake = Faker()

# Generate fake data
users_data = {
    'id': [fake.uuid4().replace('-', '') for _ in range(10)],  # Generate unique IDs
    'firstname': [fake.first_name() for _ in range(10)],  # Generate fake first names
    'lastname': [fake.last_name() for _ in range(10)],  # Generate fake last names
    'email': [fake.unique.email() for _ in range(10)],  # Generate unique fake emails
    'username': [fake.unique.user_name() for _ in range(10)],  # Generate unique fake usernames
    'password': [fake.password() for _ in range(10)],  # Generate fake passwords
    'role': ['user' for _ in range(10)]  # Set role as 'user'
}

# Create a DataFrame from the data
df = pd.DataFrame(users_data)
print(df)

