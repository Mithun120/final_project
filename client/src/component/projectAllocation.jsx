import React, { useState } from 'react';
import axios from 'axios';
const ProjectAllocationForm = () => {
  const [formData, setFormData] = useState({
    projectId: '',
    email: '',
    allocation_start: '',
    allocation_end: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("hi",sessionStorage.getItem("accessToken"))
      const response = await axios.post('http://localhost:4000/allocate/projectallocation', formData, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem("accessToken")}`
      }});
      console.log(response.data);
      alert('Project allocated successfully');
      // Reset the form after successful submission if needed
      setFormData({
        projectId: '',
        email: '',
        allocation_start: '',
        allocation_end: ''
      });
    } catch (error) {
      console.error('Error allocating project:', error.response.data);
      alert('Error allocating project. Please try again.');
    }
  };

  return (
    <div>
      <h2>Project Allocation Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project ID:
          <input type="text" name="projectId" value={formData.projectId} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Allocation Start Date:
          <input type="date" name="allocation_start" value={formData.allocation_start} onChange={handleChange} />
        </label>
        <br />
        <label>
          Allocation End Date:
          <input type="date" name="allocation_end" value={formData.allocation_end} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Allocate Project</button>
      </form>
    </div>
  );
};

export default ProjectAllocationForm;
