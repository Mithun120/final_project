import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Questions from '../data/feedbackQuestions.json'
import { toast } from 'react-toastify';

function Feedback() {
    const [accessToken, setToken] = useState(sessionStorage.getItem('accessToken'));
    const [role, setRole] = useState(sessionStorage.getItem('role'));
    // Assume user is not an admin by default
    const location = useLocation();

    const navigate = useNavigate();
    const projectId = sessionStorage.getItem('start_period');
    const start_period = sessionStorage.getItem('end_period');
    const end_period = sessionStorage.getItem('projectId_timesheet');


    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        }

        // console.log(decodedPID, decodedStart, decodedEnd)
    }, [location.search]);

    const [formData, setFormData] = useState({
        q1: 1,
        q2: 1,
        q3: 1,
        q4: 1,
        q5: 1,
        q6: 1,
        comments: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('http://localhost:4000/feedback/CreateFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    projectId: projectId,
                    start_period: start_period,
                    end_period: end_period,
                    feedback: formData
                })
            });

            const res = await response.json()
            if (res.message != "Feedback data saved") {
                alert('Failed to save data');
            }
            else {
                toast.success("feedback given succussfully")
                // alert('feedback given succussfully')
            }

            navigate('/feedback');

        } catch (error) {
            console.error('Error submitting feedback:', error.message)
        }

        try {
            const response = await fetch('http://localhost:5000/api/FeedbackHistory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                },
                body: JSON.stringify({
                    projectId: projectId,
                    start_period: start_period,
                    end_period: end_period,
                    feedback_given: true
                }),
            });

        } catch (error) {
            alert('Error updating feedback history:', error.message)
            console.error('Error fetching timesheet data:', error);
        }

    };

    return (
        <div>
       
        <div className="grid grid-cols-5 mx-auto p-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-md">
           <div className='4 col-span-1'></div>
           <div className='col-span-3 bg-[rgba(255,255,255,0.1)]  p-4 rounded-lg backdrop-blur-xl shadow-xl'>
            <h2 className="text-3xl font-bold mb-6 text-white">Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">  
                    <label htmlFor="q1" className="block font-bold">{Questions[role].q1}</label>
                    <input type="number" id="q1" name="q1" value={formData.q1} onChange={handleInputChange} min="1" max="5" className="form-input" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="q2" className="block font-bold">{Questions[role].q2}</label>
                    <input type="number" id="q2" name="q2" value={formData.q2} onChange={handleInputChange} min="1" max="5" className="form-input" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="q3" className="block font-bold">{Questions[role].q3}</label>
                    <input type="number" id="q3" name="q3" value={formData.q3} onChange={handleInputChange} min="1" max="5" className="form-input" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="q4" className="block font-bold">{Questions[role].q4}</label>
                    <input type="number" id="q4" name="q4" value={formData.q4} onChange={handleInputChange} min="1" max="5" className="form-input" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="q5" className="block font-bold">{Questions[role].q5}</label>
                    <input type="number" id="q5" name="q5" value={formData.q5} onChange={handleInputChange} min="1" max="5" className="form-input" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="q6" className="block font-bold">{Questions.common.q6}</label>
                    <input type="number" id="q6" name="q6" value={formData.q6} onChange={handleInputChange} min="1" max="5" className="form-input" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="comments" className="block font-bold">Comments:</label>
                    <textarea id="comments" name="comments" value={formData.comments} onChange={handleInputChange} className="form-textarea" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </form>
            </div> 
        </div>
        </div>

    );
}

export default Feedback;
// Intern Feedback Questions:

// Communication Skills:

// How would you rate your communication skills during this internship?
//  Excellent
//  Good
//  Average
//  Below Average
//  Poor
// Learning and Development:

// Did you feel that you received adequate training and guidance for your tasks?
//  Yes, definitely
//  Yes, to some extent
//  No, there were gaps in training
//  No, there was no training provided
// Work Environment:

// How would you describe the overall work environment and culture?
//  Supportive and positive
//  Neutral
//  Stressful or challenging
//  Negative or toxic
// Tasks and Responsibilities:

// Did you feel that your assigned tasks and responsibilities were meaningful and relevant to your learning?
//  Yes, very much so
//  Yes, to some extent
//  No, they were not relevant
//  No, I did not receive enough tasks
// Supervision and Feedback:

// How would you rate the feedback and guidance provided by your supervisor/mentor?
//  Very helpful and constructive
//  Somewhat helpful
//  Not helpful or unclear
//  No feedback was provided



// Software Engineer Feedback Questions:

// Technical Skills:

// How confident do you feel about your technical skills after working on the assigned projects?
//  Extremely confident
//  Confident
//  Somewhat confident
//  Not very confident
//  Not confident at all
// Project Management:

// Did you find the project management processes effective in ensuring project success?
//  Very effective
//  Moderately effective
//  Somewhat effective
//  Ineffective
//  No project management processes were followed
// Team Collaboration:

// How would you rate the collaboration and teamwork within your development team?
//  Excellent
//  Good
//  Average
//  Below Average
//  Poor
// Training and Support:

// Did you receive adequate training and support to fulfill your technical responsibilities?
//  Yes, definitely
//  Yes, to some extent
//  No, there were gaps in training
//  No, I did not receive enough support
// Career Growth Opportunities:

// Do you feel that this role provided opportunities for your career growth and skill development?
//  Strongly agree
//  Agree
//  Neutral
//  Disagree
//  Strongly disagree




// Consultant Feedback Questions:

// Client Interaction:

// How would you rate your ability to effectively interact with clients and understand their needs?
//  Excellent
//  Good
//  Average
//  Below Average
//  Poor
// Problem-Solving Skills:

// How often did you encounter challenging problems in your consulting projects?
//  Frequently
//  Occasionally
//  Rarely
//  Never
// Consulting Methodology:

// How well did the consulting methodology and strategies align with addressing client issues?
//  Very well
//  Moderately well
//  Somewhat well
//  Not well
//  No specific consulting methodology was followed
// Client Satisfaction:

// Based on client feedback, how satisfied were they with the consulting services provided?
//  Highly satisfied
//  Satisfied
//  Neutral
//  Dissatisfied
//  Highly dissatisfied
// Professional Growth:

// Did this consulting role contribute significantly to your professional growth and expertise?
//  Yes, significantly
//  Yes, to some extent
//  No, limited growth opportunities
//  No, it hindered my professional growth





// Tribe Master Feedback Questions:

// Leadership Skills:

// How would you rate your leadership and management skills in leading your tribe/team?
//  Exceptional
//  Effective
//  Average
//  Needs improvement
//  Poor
// Team Performance:

// How satisfied are you with the overall performance and productivity of your tribe/team?
//  Very satisfied
//  Satisfied
//  Neutral
//  Dissatisfied
//  Very dissatisfied
// Strategic Planning:

// Did your strategic planning contribute significantly to achieving the tribe/team's goals?
//  Yes, significantly
//  Yes, to some extent
//  No, limited impact
//  No, it hindered progress
// Feedback and Coaching:

// How effective were you in providing feedback and coaching to team members for their growth?
//  Highly effective
//  Moderately effective
//  Somewhat effective
//  Ineffective
//  No feedback or coaching provided
// Innovation and Adaptability:

// How innovative and adaptable was your tribe/team in responding to challenges and changes?
//  Very innovative and adaptable
//  Moderately innovative and adaptable
//  Somewhat innovative and adaptable
//  Not very innovative and adaptable
//  Not innovative or adaptable0222222.310..................
