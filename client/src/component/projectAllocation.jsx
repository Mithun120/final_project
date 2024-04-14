import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/addProjec.css"
import { toast } from 'react-toastify';
import projectAllocate from "../styles/allocation.png"
const ProjectAllocationForm = () => {
    const navigate = useNavigate();
    const [projectIds, setProjectIds] = useState([]);
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
      const response = await axios.post(
        'http://localhost:4000/allocate/projectallocation',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        }
      );
      console.log(response.data);
      toast.success('Project allocated successfully');
      
      // Reset the form after successful submission if needed
      setFormData({
        projectId: '',
        email: '',
        allocation_start: '',
        allocation_end: ''
      });
      navigate('/adminhome')
    } catch (error) {
      console.error('Error allocating project:', error.response.data);
      alert('Error allocating project. Please try again.');
    }
  };

  useEffect(() => {
    const fetchProjectIds = async () => {
      try {
        const response = await axios.get('http://localhost:4000/projectapi/project');
        setProjectIds(response.data.projectIds);
      } catch (error) {
        console.error('Error fetching project IDs:', error);
      }
    };

    fetchProjectIds();
  }, []);

  return (<div className="addproject" >

    <div  className='container'>
      <form onSubmit={handleSubmit}>
      <h2 className='head'>Project Allocation Form</h2>
      <div className="form-group">
        <label>
          Project ID:        </label>
          <select
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          >
            <option value="">Select Project ID</option>
            {projectIds.map((projectId, index) => (
              <option key={index} value={projectId}>
                {projectId}
              </option>
            ))}
          </select>
        <br /></div>
        <div className="form-group">
        <label>
          Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
                </div>
        <br /> <div className="form-group">

        <label>
          Allocation Start Date:        </label>

          <input
            type="date"
            name="allocation_start"
            value={formData.allocation_start}
            onChange={handleChange}
          /></div>
        <br /><div className="form-group">

        <label>
          Allocation End Date:
          </label>
          <input
            type="date"
            name="allocation_end"
            value={formData.allocation_end}
            onChange={handleChange}
          />
          </div>
        <br />
        <button type="submit" className='button-29'>Allocate Project</button>
      </form>
      <div className='rightPanel'>
              <img src={projectAllocate} className='login-img' alt='login-img'></img>
      </div>
      </div>
    </div>
  );
};

export default ProjectAllocationForm;
