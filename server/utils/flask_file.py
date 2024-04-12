from flask import Flask, request, jsonify
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.naive_bayes import GaussianNB

from sklearn.model_selection import train_test_split
import pandas as pd

app = Flask(__name__)

# Load and preprocess the dataset
df = pd.read_csv('total_worked_hours.csv')
removeColumns=['NAME', 'EMAIL', 'USERTYPE',  'PROJECTID',
       'PROJECT_START_PERIOD', 'PROJECT_END_PERIOD', 
       'ALLOCATION_START', 'ALLOCATION_END', 'START_PERIOD', 'END_PERIOD',
       'COMMENTS', 'FEEDBACK_START_PERIOD', 'FEEDBACK_END_PERIOD', 'Q1', 'Q2', 'Q3',
       'Q4', 'Q5', 'Q6', 'FEEDBACK_COMMENTS','PROJECT_NAME']
df1=df.copy()
df1=df1.drop(columns=removeColumns)

# Create a LabelEncoder object
label_encoder = LabelEncoder()
df1['ROLE'] = df1['ROLE'].str.lower()


# Assume df is your DataFrame with the columns ROLE and CATEGORY
df1['ROLE_ENCODED'] = label_encoder.fit_transform(df1['ROLE'])
df1['ACTIVITY_ENCODED'] = label_encoder.fit_transform(df1['ACTIVITY'])

df1=df1.drop(columns=['ROLE','ACTIVITY'])
df1.drop_duplicates(keep='first', inplace=True)
df1.dropna(inplace=True)

# Assuming 'CATEGORY' is the column you want to label encode
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(df1['CATEGORY'])

# Assign the encoded target variable to y
y = y_encoded

# Drop the 'CATEGORY' column from X
X = df1.drop(columns=['CATEGORY','MON','TUE','WED','THUR','FRI','SAT','SUN'])


# Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)


# Initialize the DecisionTreeClassifier
dt_classifier = GaussianNB()
# Train the model
dt_classifier.fit(X_train, y_train)


@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    json_data = request.get_json()
    if not json_data:
        return jsonify({'error': 'No JSON data provided'}), 400

    # Create a DataFrame from JSON data
    df_input = pd.DataFrame([json_data])

    # Make predictions
    predicted_values = dt_classifier.predict(df_input)

    # Convert predictions to original labels
    predicted_labels = predicted_values
    # Return the predicted value as JSON
    return jsonify({'predicted_value': predicted_labels.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
