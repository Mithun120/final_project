import React, { useState, useEffect } from 'react';
import axios from 'axios';
   
function TribeMasterFeedback() {
  const [answers, setAnswers] = useState({
    userName: '',
    leadership: '',
    communication: '',
    decisionMaking: '',
    teamManagement: '',
    problemSolving: '',
    collaboration: '',
    overallPerformance: ''
  });
 
  useEffect(() => {
    // Fetch user data from the backend upon component mount
    const fetchUserData = async () => {
      try {
        // Retrieve email from session storage
        const email = sessionStorage.getItem('responseEmail');
 
        const response = await axios.get(`http://localhost:5000/api/users/userdetails/${email}`);
        const userData = response.data;
        setAnswers(prevState => ({
          ...prevState,
          userName: userData.firstName
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
 
    fetchUserData();
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnswers({
      ...answers,
      [name]: value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/feedback/tribemaster', answers);
      if (response.status === 201) {
        console.log('Feedback submitted successfully');
        // Reset the form
        setAnswers({
          userName: '',
          leadership: '',
          communication: '',
          decisionMaking: '',
          teamManagement: '',
          problemSolving: '',
          collaboration: '',
          overallPerformance: ''
        });
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
 
  return (
    <div className="feedback-form-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={answers.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="leadership">Rate your leadership skills:</label>
          <select id="leadership" name="leadership" value={answers.leadership} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="communication">Rate your communication skills:</label>
          <select id="communication" name="communication" value={answers.communication} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="decisionMaking">Rate your decision-making skills:</label>
          <select id="decisionMaking" name="decisionMaking" value={answers.decisionMaking} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="teamManagement">Rate your team management skills:</label>
          <select id="teamManagement" name="teamManagement" value={answers.teamManagement} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="problemSolving">Rate your problem-solving skills:</label>
          <select id="problemSolving" name="problemSolving" value={answers.problemSolving} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="collaboration">Rate your collaboration skills:</label>
          <select id="collaboration" name="collaboration" value={answers.collaboration} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="overallPerformance">Overall, how would you rate your performance as a tribe master?</label>
          <select id="overallPerformance" name="overallPerformance" value={answers.overallPerformance} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
}
 
export default TribeMasterFeedback;