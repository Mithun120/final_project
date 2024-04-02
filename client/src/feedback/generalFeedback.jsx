import React, { useState, useEffect } from 'react';
import Axios from 'axios';
 
function GeneralFeedbackForm() {
  const [feedback, setFeedback] = useState({
    userName: '', // Now fetched automatically
    satisfaction: '',
    communication: '',
    goals: '',
    deliverables: '',
    timeliness: '',
    challenges: '',
    projectManagement: '',
    support: '',
    improvements: ''
  });
 
  useEffect(() => {
    // Fetch user's name based on email stored in session storage
    const email = sessionStorage.getItem('responseEmail');
    if (email) {
      Axios.get(`http://localhost:5000/api/users/userdetails/${email}`)
        .then(response => {
          const userName = response.data.firstName; // Assuming the first name is returned by the backend
          setFeedback(prevFeedback => ({
            ...prevFeedback,
            userName: userName
          }));
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
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
      const response = await Axios.post('http://localhost:4000/feedback/general', feedback);
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
        {/* Other form fields */}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
}
 
export default GeneralFeedbackForm;