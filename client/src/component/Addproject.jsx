import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import "../styles/addProjec.css"
import projectImg from "../styles/project.png"
function Addproject() {
  const [formData, setFormData] = useState({
    projectName: '',
    projectId: '',
    category: '',
    startDate: '',
    endDate: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/projectapi/project', {
        ...formData
      },  {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
      }});
  
      if (!response.status === 200) {
        throw new Error('Failed to add project');
      }
  
      const data = response.data;
      console.log(data); // Log response data
  
      // Reset form data after successful submission
      setFormData({
        projectName: '',
        projectId: '',
        category: '',
        startDate: '',
        endDate: ''
      });
  
      navigate('/adminhome'); // Redirect back to admin dashboard after submission
    } catch (error) {
      console.error('Error adding project:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (<div className="addproject">

    <div className="container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
      <h2>Add Project</h2>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>
          <input type="text" id="projectName" name="projectName" value={formData.projectName} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="projectId">Project ID:</label>
          <input type="text" id="projectId" name="projectId" value={formData.projectId} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="form-control" required>
            <option value="">Select Category</option>
            <option value="Client Project">Client Project</option>
            <option value="Sales Activity">Sales Activity</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleInputChange} className="form-control" required />
        </div>
        <button type="submit" className="button-29" style={{marginBottom:"5px"}}>Add Project</button>
      </form>
    
    <div className="rightPanel">
    <img src={projectImg} className='login-img' alt='login-img'></img>
  </div></div></div>
  );
}

export default Addproject;