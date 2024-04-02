import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
function InternFeedbackForm() {
  const [feedback, setFeedback] = useState({
    userName: '', // Now fetched automatically
    guidance: '',
    tasks: '',
    communication: '',
    support: '',
    contribution: '',
    feedbackProcess: '',
    application: '',
    learningExperience: '',
    improvements: ''
  });
 
  useEffect(() => {
    // Fetch user's name based on email stored in session storage
    const fetchUserData = async () => {
      try {
        // Retrieve email from session storage
        const email = sessionStorage.getItem('responseEmail');
 
        const response = await axios.get(`http://localhost:4000/api/users/userdetails/${email}`);
        const userData = response.data;
        setFeedback(prevState => ({
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
    setFeedback({
      ...feedback,
      [name]: value
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/feedback/intern', feedback);
      console.log(response.data);
      // Handle success if needed
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error if needed
      alert('Failed to submit feedback. Please try again later.');
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
            value={feedback.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="guidance">How satisfied are you with the guidance and mentorship provided?</label>
          <select id="guidance" name="guidance" value={feedback.guidance} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="tasks">How well-defined were your tasks and responsibilities?</label>
          <select id="tasks" name="tasks" value={feedback.tasks} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="communication">How effective was the communication within the team?</label>
          <select id="communication" name="communication" value={feedback.communication} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="support">How supportive was the team in helping you accomplish your tasks?</label>
          <select id="support" name="support" value={feedback.support} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contribution">How would you rate your overall contribution to the project?</label>
          <select id="contribution" name="contribution" value={feedback.contribution} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="application">How well were you able to apply your knowledge and skills?</label>
          <select id="application" name="application" value={feedback.application} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="learningExperience">How would you rate your overall learning experience?</label>
          <select id="learningExperience" name="learningExperience" value={feedback.learningExperience} onChange={handleChange}>
            <option value="">Select Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="improvements">What do you think to be improved in the future?</label>
          <textarea id="improvements" name="improvements" value={feedback.improvements} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
 
export default InternFeedbackForm;
 