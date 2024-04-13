// import React, { useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Questions from '../data/feedbackQuestions.json'
// import { toast } from 'react-toastify';

// function Feedback() {
//     const [accessToken, setToken] = useState(sessionStorage.getItem('accessToken'));
//     const [role, setRole] = useState(sessionStorage.getItem('role'));
//     // Assume user is not an admin by default
//     const location = useLocation();

//     const navigate = useNavigate();
//     const projectId = sessionStorage.getItem('start_period');
//     const start_period = sessionStorage.getItem('end_period');
//     const end_period = sessionStorage.getItem('projectId_timesheet');


//     useEffect(() => {
//         if (!accessToken) {
//             navigate('/');
//         }

//         // console.log(decodedPID, decodedStart, decodedEnd)
//     }, [location.search]);

//     const [formData, setFormData] = useState({
//         q1: 1,
//         q2: 1,
//         q3: 1,
//         q4: 1,
//         q5: 1,
//         q6: 1,
//         comments: ''
//     });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(formData);
//         try {
//             const response = await fetch('http://localhost:4000/feedback/CreateFeedback', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${accessToken}`
//                 },
//                 body: JSON.stringify({
//                     projectId: projectId,
//                     start_period: start_period,
//                     end_period: end_period,
//                     feedback: formData
//                 })
//             });

//             const res = await response.json()
//             if (res.message != "Feedback data saved") {
//                 alert('Failed to save data');
//             }
//             else {
//                 toast.success("feedback given succussfully")
//                 // alert('feedback given succussfully')
//             }

//             navigate('/feedback');

//         } catch (error) {
//             console.error('Error submitting feedback:', error.message)
//         }

//         // try {
//         //     const response = await fetch('http://localhost:5000/api/FeedbackHistory', {
//         //         method: 'POST',
//         //         headers: {
//         //             'Content-Type': 'application/json',
//         //             Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
//         //         },
//         //         body: JSON.stringify({
//         //             projectId: projectId,
//         //             start_period: start_period,
//         //             end_period: end_period,
//         //             feedback_given: true
//         //         }),
//         //     });

//         // } catch (error) {
//         //     alert('Error updating feedback history:', error.message)
//         //     console.error('Error fetching timesheet data:', error);
//         // }

//     };

//     return (
//         <div>
       
//         <div className="grid grid-cols-5 mx-auto p-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg shadow-md">
//            <div className='4 col-span-1'></div>
//            <div className='col-span-3 bg-[rgba(255,255,255,0.1)]  p-4 rounded-lg backdrop-blur-xl shadow-xl'>
//             <h2 className="text-3xl font-bold mb-6 text-white">Feedback Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">  
//                     <label htmlFor="q1" className="block font-bold">{Questions[role].q1}</label>
//                     <input type="number" id="q1" name="q1" value={formData.q1} onChange={handleInputChange} min="1" max="5" className="form-input" required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="q2" className="block font-bold">{Questions[role].q2}</label>
//                     <input type="number" id="q2" name="q2" value={formData.q2} onChange={handleInputChange} min="1" max="5" className="form-input" required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="q3" className="block font-bold">{Questions[role].q3}</label>
//                     <input type="number" id="q3" name="q3" value={formData.q3} onChange={handleInputChange} min="1" max="5" className="form-input" required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="q4" className="block font-bold">{Questions[role].q4}</label>
//                     <input type="number" id="q4" name="q4" value={formData.q4} onChange={handleInputChange} min="1" max="5" className="form-input" required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="q5" className="block font-bold">{Questions[role].q5}</label>
//                     <input type="number" id="q5" name="q5" value={formData.q5} onChange={handleInputChange} min="1" max="5" className="form-input" required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="q6" className="block font-bold">{Questions.common.q6}</label>
//                     <input type="number" id="q6" name="q6" value={formData.q6} onChange={handleInputChange} min="1" max="5" className="form-input" required />
//                 </div>
//                 <div className="mb-4">
//                     <label htmlFor="comments" className="block font-bold">Comments:</label>
//                     <textarea id="comments" name="comments" value={formData.comments} onChange={handleInputChange} className="form-textarea" required />
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
//             </form>
//             </div> 
//         </div>
//         </div>

//     );
// }

// export default Feedback;
// // Intern Feedback Questions:

// // Communication Skills:

// // How would you rate your communication skills during this internship?
// //  Excellent
// //  Good
// //  Average
// //  Below Average
// //  Poor
// // Learning and Development:

// // Did you feel that you received adequate training and guidance for your tasks?
// //  Yes, definitely
// //  Yes, to some extent
// //  No, there were gaps in training
// //  No, there was no training provided
// // Work Environment:

// // How would you describe the overall work environment and culture?
// //  Supportive and positive
// //  Neutral
// //  Stressful or challenging
// //  Negative or toxic
// // Tasks and Responsibilities:

// // Did you feel that your assigned tasks and responsibilities were meaningful and relevant to your learning?
// //  Yes, very much so
// //  Yes, to some extent
// //  No, they were not relevant
// //  No, I did not receive enough tasks
// // Supervision and Feedback:

// // How would you rate the feedback and guidance provided by your supervisor/mentor?
// //  Very helpful and constructive
// //  Somewhat helpful
// //  Not helpful or unclear
// //  No feedback was provided



// // Software Engineer Feedback Questions:

// // Technical Skills:

// // How confident do you feel about your technical skills after working on the assigned projects?
// //  Extremely confident
// //  Confident
// //  Somewhat confident
// //  Not very confident
// //  Not confident at all
// // Project Management:

// // Did you find the project management processes effective in ensuring project success?
// //  Very effective
// //  Moderately effective
// //  Somewhat effective
// //  Ineffective
// //  No project management processes were followed
// // Team Collaboration:

// // How would you rate the collaboration and teamwork within your development team?
// //  Excellent
// //  Good
// //  Average
// //  Below Average
// //  Poor
// // Training and Support:

// // Did you receive adequate training and support to fulfill your technical responsibilities?
// //  Yes, definitely
// //  Yes, to some extent
// //  No, there were gaps in training
// //  No, I did not receive enough support
// // Career Growth Opportunities:

// // Do you feel that this role provided opportunities for your career growth and skill development?
// //  Strongly agree
// //  Agree
// //  Neutral
// //  Disagree
// //  Strongly disagree




// // Consultant Feedback Questions:

// // Client Interaction:

// // How would you rate your ability to effectively interact with clients and understand their needs?
// //  Excellent
// //  Good
// //  Average
// //  Below Average
// //  Poor
// // Problem-Solving Skills:

// // How often did you encounter challenging problems in your consulting projects?
// //  Frequently
// //  Occasionally
// //  Rarely
// //  Never
// // Consulting Methodology:

// // How well did the consulting methodology and strategies align with addressing client issues?
// //  Very well
// //  Moderately well
// //  Somewhat well
// //  Not well
// //  No specific consulting methodology was followed
// // Client Satisfaction:

// // Based on client feedback, how satisfied were they with the consulting services provided?
// //  Highly satisfied
// //  Satisfied
// //  Neutral
// //  Dissatisfied
// //  Highly dissatisfied
// // Professional Growth:

// // Did this consulting role contribute significantly to your professional growth and expertise?
// //  Yes, significantly
// //  Yes, to some extent
// //  No, limited growth opportunities
// //  No, it hindered my professional growth





// // Tribe Master Feedback Questions:

// // Leadership Skills:

// // How would you rate your leadership and management skills in leading your tribe/team?
// //  Exceptional
// //  Effective
// //  Average
// //  Needs improvement
// //  Poor
// // Team Performance:

// // How satisfied are you with the overall performance and productivity of your tribe/team?
// //  Very satisfied
// //  Satisfied
// //  Neutral
// //  Dissatisfied
// //  Very dissatisfied
// // Strategic Planning:

// // Did your strategic planning contribute significantly to achieving the tribe/team's goals?
// //  Yes, significantly
// //  Yes, to some extent
// //  No, limited impact
// //  No, it hindered progress
// // Feedback and Coaching:

// // How effective were you in providing feedback and coaching to team members for their growth?
// //  Highly effective
// //  Moderately effective
// //  Somewhat effective
// //  Ineffective
// //  No feedback or coaching provided
// // Innovation and Adaptability:

// // How innovative and adaptable was your tribe/team in responding to challenges and changes?
// //  Very innovative and adaptable
// //  Moderately innovative and adaptable
// //  Somewhat innovative and adaptable
// //  Not very innovative and adaptable
// //  Not innovative or adaptable0222222.310..................













import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Questions from '../data/feedbackQuestions.json';

function Feedback() {
    const [accessToken, setToken] = useState(sessionStorage.getItem('accessToken'));
    const [role, setRole] = useState(sessionStorage.getItem('role'));
    const location = useLocation();
    const navigate = useNavigate();
    const projectId = sessionStorage.getItem('projectId_timesheet');
    const start_period = sessionStorage.getItem('start_period');
    const end_period = sessionStorage.getItem('end_period');
    // const [filledState,setFilledState]=useState(false)
    useEffect(() => {
        if (!accessToken) {
            navigate('/');
        }
    }, [accessToken, navigate, location.search]);
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const mondayDate = new Date(currentDate); // Clone the current date
    mondayDate.setDate(currentDate.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)); // If it's Sunday, subtract 6 days; otherwise, subtract current day of the week - 1
    const startDate = mondayDate.toISOString().split("T")[0];
    console.log("StartDate: ", startDate);
 
    // Calculate end date (Sunday) of the current week
    const sundayDate = new Date(mondayDate); // Clone the Monday date
    sundayDate.setDate(mondayDate.getDate() + 6); // Add 6 days to get Sunday
    const endDate = sundayDate.toISOString().split("T")[0];
    console.log("EndDate: ", endDate);
    const [formData, setFormData] = useState({
        q1: 1,
        q2: 1,
        q3: 1,
        q4: 1,
        q5: 1,
        q6: 1,
        comments: ''
    });

    const handleStarRatingChange = (name, value) => {
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

            const res = await response.json();
            if (res.message == "Feedback data saved") {
                toast.success("Feedback given successfully");
                navigate('/userhome')
            }else if(res.message=="Feedback already submitted for this week."){
                toast.info("Feedback already submitted for this week.")
                navigate('/userhome')

            } 
            


        } catch (error) {
            console.error('Error submitting feedback:', error.message);
        }
    };


    const terminalLoaderStyle = {
        border: '0.1em solid #333',
        backgroundColor: '#1a1a1a',
        color: '#0f0',
        fontFamily: 'Courier New, Courier, monospace',
        fontSize: '1em',
        padding: '1.5em 1em',
        width: '12em',
        margin: '100px auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
      };
    
      const terminalHeaderStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        height: '1.5em',
        backgroundColor: '#333',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        padding: '0 0.4em',
        boxSizing: 'border-box',
      };
    
      const terminalTitleStyle = {
        float: 'left',
        lineHeight: '1.5em',
        color: '#eee',
      };
    
      const terminalControlsStyle = {
        float: 'right',
      };
    
      const controlStyle = {
        display: 'inline-block',
        width: '0.6em',
        height: '0.6em',
        marginLeft: '0.4em',
        borderRadius: '50%',
      };
    
      const textStyle = {
        display: 'inline-block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRight: '0.2em solid green', /* Cursor */
        animation: 'typeAndDelete 4s steps(11) infinite, blinkCursor 0.5s step-end infinite alternate',
        marginTop: '1.5em',
      };

     return (
    
    <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f0f0f0',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '600px',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                background: 'linear-gradient(to bottom right, #8A2BE2, #4169E1)',
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: 'bold',
                        color: '#fff',
                    }}>Feedback Form</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {Object.keys(Questions[role]).map((questionKey) => (
                        <div key={questionKey} style={{ marginBottom: '20px' }}>
                            <label htmlFor={questionKey} style={{
                                display: 'block',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                marginBottom: '10px',
                                color: '#fff',
                            }}>{Questions[role][questionKey]}</label>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {[...Array(5)].map((star, index) => {
                                    const ratingValue = index + 1;
                                    return (
                                        <FaStar
                                            key={index}
                                            style={{
                                                color: ratingValue <= formData[questionKey] ? '#FFD700' : '#ccc',
                                                cursor: 'pointer',
                                                transition: 'color 0.3s ease',
                                            }}
                                            size={25}
                                            onClick={() => handleStarRatingChange(questionKey, ratingValue)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="comments" style={{
                            display: 'block',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            marginBottom: '10px',
                            color: '#fff',
                        }}>Comments:</label>
                        <textarea id="comments" name="comments" value={formData.comments} onChange={(e) => setFormData({ ...formData, comments: e.target.value })} style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box',
                            resize: 'vertical',
                        }} required />
                    </div>
                    
                    <button type="submit" style={{ display: 'block', margin: '0 auto' }} className="button-62">Submit</button>

                </form>
            </div>
        </div>     </>
    );
}

export default Feedback;

