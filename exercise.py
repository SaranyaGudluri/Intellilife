# -*- coding: utf-8 -*-
"""exercise.py"""

import pandas as pd
import numpy as np
import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS for cross-origin support
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "*"}}) 
data = pd.read_csv('exercise_dataset.csv')  # Ensure the file is present

# Encode categorical variables
le_gender = LabelEncoder()
data['Gender'] = le_gender.fit_transform(data['Gender'])
le_weather = LabelEncoder()
data['Weather Conditions'] = le_weather.fit_transform(data['Weather Conditions'])
le_exercise = LabelEncoder()
data['Exercise'] = le_exercise.fit_transform(data['Exercise'])

X_exercise = data[['Age', 'Gender', 'BMI', 'Dream Weight', 'Actual Weight', 'Heart Rate', 'Weather Conditions', 'Exercise Intensity']]
y_exercise = data['Exercise']

X_train_ex, X_test_ex, y_train_ex, y_test_ex = train_test_split(X_exercise, y_exercise, test_size=0.2, random_state=42)
clf = RandomForestClassifier(random_state=42)
clf.fit(X_train_ex, y_train_ex)

joblib.dump(clf, 'exercise_model.pkl')

y_pred_ex = clf.predict(X_test_ex)
X_duration = X_test_ex.copy()
X_duration['Predicted Exercise'] = y_pred_ex
y_duration = data.loc[X_test_ex.index, 'Duration']

X_train_dur, X_test_dur, y_train_dur, y_test_dur = train_test_split(X_duration, y_duration, test_size=0.2, random_state=42)
reg_dur = RandomForestRegressor(random_state=42)
reg_dur.fit(X_train_dur, y_train_dur)

joblib.dump(reg_dur, 'duration_model.pkl')

# Predict and Prepare Features for Next Model
y_pred_dur = reg_dur.predict(X_test_dur)
X_calories = X_test_dur.copy()
X_calories['Predicted Duration'] = y_pred_dur
y_calories = data.loc[X_test_dur.index, 'Calories Burn']

# Train Calories Burn Prediction Model
X_train_cal, X_test_cal, y_train_cal, y_test_cal = train_test_split(X_calories, y_calories, test_size=0.2, random_state=42)
reg_cal = RandomForestRegressor(random_state=42)
reg_cal.fit(X_train_cal, y_train_cal)

# Save Model
joblib.dump(reg_cal, 'calories_model.pkl')

# Load models once to optimize API calls
clf = joblib.load('exercise_model.pkl')
reg_dur = joblib.load('duration_model.pkl')
reg_cal = joblib.load('calories_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get request data
        data = request.get_json()

        # Ensure all required keys are present
        required_fields = ['Age', 'Gender', 'BMI', 'Dream Weight', 'Actual Weight', 'Heart Rate', 'Weather Conditions', 'Exercise Intensity']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing input fields'}), 400

        input_data = pd.DataFrame([data])

        # Encode categorical variables in input
        input_data['Gender'] = le_gender.transform([input_data['Gender'][0]])[0]
        input_data['Weather Conditions'] = le_weather.transform([input_data['Weather Conditions'][0]])[0]

        # Predict Exercise Type
        exercise_pred = clf.predict(input_data)[0]
        exercise_pred_decoded = le_exercise.inverse_transform([exercise_pred])[0]

        # Add Encoded Predicted Exercise Type for Duration Prediction
        input_data['Predicted Exercise'] = exercise_pred
        duration_pred = reg_dur.predict(input_data)[0]

        # Add Predicted Duration to Input for Calories Burn Prediction
        input_data['Predicted Duration'] = duration_pred
        calories_pred = reg_cal.predict(input_data)[0]

        return jsonify({
            'Exercise': exercise_pred_decoded,
            'Duration (minutes)': round(duration_pred, 2),
            'Calories Burned (kcal)': round(calories_pred, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)