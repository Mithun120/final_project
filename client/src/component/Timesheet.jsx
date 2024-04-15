import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/timesheet.css"
import { GoChevronDown, GoChevronUp, GoArrowRight } from "react-icons/go";
import { toast } from "react-toastify";

// import { Logout } from './Logout';
function TimeSheetParent() {
    const [down, setDown] = useState(false);

    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-07'));

    console.log("starte", startDate);
    console.log("ende", endDate);

    const handleNextWeek = () => {
        // Increment the start date by 7 days to get the start date of the next week
        const nextStartDate = new Date(startDate);
        nextStartDate.setDate(nextStartDate.getDate() + 7);
        setStartDate(nextStartDate.toISOString());

        const nextEndDate = new Date(endDate);
        nextEndDate.setDate(nextEndDate.getDate() + 7);
        setEndDate(nextEndDate.toISOString());
    };

    const handlePreviousWeek = () => {
        // Increment the start date by 7 days to get the start date of the next week
        const prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        setStartDate(prevStartDate.toISOString());

        const prevEndDate = new Date(endDate);
        prevEndDate.setDate(prevEndDate.getDate() - 7);
        setEndDate(prevEndDate.toISOString());
    };

    const getWeekDates = () => {
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            dates.push(date.toDateString()); // You can format the date as needed
        }
        return dates;
    };

    const weekdaysval = getWeekDates();
    // console.log(weekdaysval)

    
    function TimeSheet(range) {
        const [Timesheetdata, setTimesheetdata] = useState({});
        const [Assignedprojects, SetAssignedprojects] = useState([]);
        const [TotalHours, SetTotalHours] = useState(0);
        const firstID = Object.keys(Timesheetdata)[0];
        const navigate = useNavigate();
        const [flag,setFlag]=useState(false)
        const [ID, setID] = useState(0);
        const[checkFlag,setCheckFlag]=useState(false)
        const [projects, setProjects] = useState([]);

        console.log("printing " ,projects)
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:4000/timesheet/getTimesheetData', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify({ startPeriod: range.startPeriod, endPeriod: range.endPeriod }),
                    });
    
                    const data = await response.json();
                    setTimesheetdata(data.payload)
                    const [temp] = Object.keys(data.payload);
                    // const payloadArray = data.payload[temp];
                    // if(data.payload[temp].flag === true) navigate("/feedback")

                    
                    console.log("********",temp)
                    setCheckFlag( data.payload[temp].flag);
                    // console.log(payloadArray.flag) 
                    // console.log(checkFlag)
                    
                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            };
    
            const fetchUserProject = async () => {
                try {
                    // const email = sessionStorage.getItem("email");
                    // console.log(email)
                    const response = await fetch('http://localhost:4000/timesheet/getUserProject', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                        }
                    });
            
                    const data = await response.json();
                    //  console.log(data.payload);

                    SetAssignedprojects(data.payload);
                    // console.log(SetAssignedprojects)
                } catch (error) {
                    console.error('Error fetching timesheet data:', error);
                }
            };
            // const fetchAllData = async () => {
            //     try {
            //         const response = await fetch('http://localhost:4000/allocate/sendContent', {
            //             method: 'GET',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
            //             }
            //         });
            //        const res  =  await response.json()
            //         console.log(res)
                   
            //       setProjects(res[0]);
            //       console.log('Fetched data:', projects); 
                  
            //       setError('');
            //     } catch (error) {
            //       setProjects([]);
            //     }
            //   };
            // fetchAllData()
            fetchUserProject();
            fetchData();
        }, []);
    
        const handleSubmit = async (e) => {
            try {
                const [id] = Object.keys(Timesheetdata);
                const payload = Timesheetdata;
                payload[id].flag = true;

                const response = await fetch('http://localhost:4000/timesheet/CreateUpdateTimesheets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    },
        
                    body: JSON.stringify(payload),
                });

                const start_period = Timesheetdata[id].start_period;
                const end_period = Timesheetdata[id].end_period;
                const projectId = Timesheetdata[id].projectId;
                sessionStorage.setItem("start_period",start_period)
                sessionStorage.setItem("end_period",end_period)
                sessionStorage.setItem("projectId_timesheet",projectId)
                navigate("/feedback")
                // const data = await response.json();
                // console.log(response);
                // setTimesheetdata(data.payload)
            } catch (error) {
                toast.error("Error fetching timesheet data")
                // console.error('Error fetching timesheet data:', error);
            }
        }
        const handleSave = async (e) => {
            console.log(Timesheetdata);
            try {
                const response = await fetch('http://localhost:4000/timesheet/CreateUpdateTimesheets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`
                    },
                    body: JSON.stringify(Timesheetdata),
                });
                navigate('/userhome')
                // const [id] = Object.keys(Timesheetdata);
                // const start_period = Timesheetdata[id].start_period;
                // const end_period = Timesheetdata[id].end_period;
                // const projectId = Timesheetdata[id].projectId;
                // sessionStorage.setItem("start_period",start_period)
                // sessionStorage.setItem("end_period",end_period)
                // sessionStorage.setItem("projectId_timesheet",projectId)
                
                // const data = await response.json();
                // console.log(response);
                // setTimesheetdata(data.payload)
            } catch (error) {
                console.error('Error fetching timesheet data:', error);
            }
        }
    
        function TimeSheetLoop(setID) {
            const [seed, setSeed] = useState(0);
            var totalMon = 0;
            var totalTue = 0;
            var totalWed = 0;
            var totalThur = 0;
            var totalFri = 0;
            var totalSat = 0;
            var totalSun = 0;
    
            for (const key in Timesheetdata) {
                if (Timesheetdata[key]['visible']) {
                totalMon += Number(Timesheetdata[key]['mon']);
                totalTue += Number(Timesheetdata[key]['tue']);
                totalWed += Number(Timesheetdata[key]['wed']);
                totalThur += Number(Timesheetdata[key]['thur']);
                totalFri += Number(Timesheetdata[key]['fri']);
                totalSat += Number(Timesheetdata[key]['sat']);
                    totalSun += Number(Timesheetdata[key]['sun']);}
            };
            let GrandTotal = totalMon + totalTue + totalWed + totalThur + totalFri + totalSat + totalSun;
            SetTotalHours(GrandTotal);
            return (
                <>
               
               
                    {Object.entries(Timesheetdata).map((t, k) => {
                        if (t[1].visible) {
                            return (
                                <Showtimesheet
                                    id={t[0]}
                                    data={t}
                                    seedSetter={setSeed}
                                    startPeriod={range.startPeriod}
                                    endPeriod={range.endPeriod}
                                    key={k}
                                ></Showtimesheet>
                            );
                        } else {
                            return null; // Render nothing if 'visible' is false
                        }
                    })}
    
                    <tr>
                        <td>Total Hours</td>
                        <td></td>
                        <td></td>
                        {[totalMon, totalTue, totalWed, totalThur, totalFri, totalSat, totalSun].map((total, index) => (
                            <td key={index}>
                                <p className={total > 8 ? 'text-danger' : ''}>{total}</p>
                            </td>
                        ))}
                        <td>{GrandTotal}</td>
                    </tr>
                </>
            )
        };
    
        function Showtimesheet({ id, data, seedSetter, startPeriod, endPeriod }) {
            const ChangeField = (e, field) => {
                e.preventDefault();
                const currId = e.target.id;
                const currVal = e.target.value;
                Timesheetdata[currId][field] = currVal;
                seedSetter(Math.random());
            };
    
            const CreateNewEntry = (e) => {
                e.preventDefault();
                const characters = '0123456789';
                let randomString = '';
                for (let i = 0; i < 6; i++) {
                    const randomIndex = Math.floor(Math.random() * characters.length);
                    randomString += characters[randomIndex];
                }
    
                const ids = randomString;
                setID(ids);
    
                Timesheetdata[ids] = {
                    UID: ids,
                    email: sessionStorage.getItem("email"),
                    projectId: "",
                    activity: "",
                    comments: "",
                    start_period: startPeriod,
                    end_period: endPeriod,
                    mon: 0,
                    tue: 0,
                    wed: 0,
                    thur: 0,
                    fri: 0,
                    sat: 0, 
                    sun: 0,
                    visible: true,
                    created_at: new Date()
                };
                seedSetter(Math.random());
            };
    
            const DeleteEntry = (e) => {
                
                e.preventDefault();
                const currId = e.target.id;
                Timesheetdata[currId].visible = false;
                seedSetter(Math.random());
            };
    
            const total = Number(data[1].mon) + Number(data[1].tue) + Number(data[1].wed) + Number(data[1].thur) + Number(data[1].fri) + Number(data[1].sat) + Number(data[1].sun);
            return (
                <tr>
                    <td>
                        <select
                            value={data[1].activity}
                            id={id}
                            onChange={(e) => ChangeField(e, 'activity')}
                            className="form-select"
                        >
                            <option value="">Select Project Type</option>
                            <option value="client_project">Client Project</option>
                            <option value="sales_activity">Sales activity</option>
                            <option value="bau">BAU activity</option>
                        </select>
                    </td>
                    <td>
                        <select
                            value={data[1].projectId}
                            id={id}
                            onChange={(e) => ChangeField(e, 'projectId')}
                            className="form-select"
                        >
                            <option value="">Select Project</option>
                            {Assignedprojects.map((Assignedproject, index) => (
                                <option value={Assignedproject.projectId} key={index}>{Assignedproject.projectId    }</option>
                            ))}
                        </select>
                        
                        
                    </td>
                   
                    <td><textarea value={data[1].comments} id={id} onChange={(e) => ChangeField(e, 'comments')} rows="2" cols="30" className="form-control" /></td>
                    {['mon', 'tue', 'wed', 'thur', 'fri', 'sat', 'sun'].map((day, index) => (
                        <td key={index}>
                            <input
                                type="number"
                                min="0"
                                max="8"
                                value={data[1][day]}
                                id={id}
                                onChange={(e) => ChangeField(e, day)}
                                className="form-control"
                            />
                        </td>
                    ))}
                    <td><p>{total}</p></td>
                    <td><button onClick={CreateNewEntry} style={{padding:"7px"}} className="button-24">+</button>
                    {id !== firstID && <button id={id} onClick={DeleteEntry}  style={{marginLeft:"4px",padding:"7px"}}  className="button-24">-</button>}</td>
                </tr>
            );
        }
    
        return (
            <div>
            <div className='main'>
                <h3 style={{color:"darkblue",marginTop:"-3px",marginBottom:"15px"}}>Total Time: {TotalHours}</h3>
                {/* <p className='subHeading'>Allocation Extension</p> */}
                <div className="MainBands">
        <p style={{ flexGrow: 1,marginLeft:"10px"}}>Assigned Projects</p>
        {!down && <GoChevronDown onClick={() => setDown(true)} className="dropdown"/>}
        {down && <GoChevronUp onClick={() => setDown(false)} className="dropdown" />}
      </div>

      {down && <GoChevronDown onClick={() => setDown(false)} /> &&(
          <thead>
            <tr className="TableHead">  
              <th>Project ID</th>
              <tbody>
              <ul>
            {Assignedprojects.map((project) => {
                return <p>{project.projectId}</p>
            })}
          </ul>
          
                  </tbody>
                  <th>Project Name</th>
              <tbody>
              <ul>
            {Assignedprojects.map((project) => {
                return <p>{project.projectName}</p>
            })}
          </ul>
          
                  </tbody>
              
            </tr>
          </thead>
         
      )}
                <div className="MainBands " style={{marginTop:"4px"}}> 
                <p style={{marginLeft:"8px"}}>TimeSheet</p></div>
                <div className="table-container">
                <table className="table table-borderless" style={{marginTop:"4px"}} >
                    <thead>
                        <tr>
                            <th>Project Type</th>
                            <th>Project Name</th>
                            <th>Task Name</th>
                            {[...Array(7)].map((_, index) => {
                                const day = new Date(range.startPeriod);
                                day.setDate(day.getDate() + index);
                                const options = { weekday: 'short', month: 'short', day: 'numeric' };
                                return <th key={index}>{day.toLocaleDateString('en-US', options)}</th>;
                            })}
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TimeSheetLoop setID={setID} />
                    </tbody>
                </table>
                </div>
            </div>
                <div style={{textAlign:"end"}}>
                     <button onClick={handleSave} className='button-29' style={{marginTop:"1%"}} label="Submit">Save</button>
                    <button onClick={handleSubmit} className='button-29' label="Submit">Submit</button>
                    {/* <Logout setIsLoggedIn ={ setIsLoggedIn } className='button-62'/> */}

                </div>
            </div>
        );
    }
    
    

    return (
        <div className="time-sheet-container">
            <h1 style={{textAlign:"left",fontSize:"40px",color:"darkblue"}} >TimeSheet</h1>
            <div className="time-sheet-row" style={{marginBottom:"0px"}}>
                <div className="col-md-6">
                    <div style={{textAlign:"right",marginTop:"-10px"}} className="date-navigation">
                        <button onClick={handlePreviousWeek} className="button-24">&lt;</button>
                        <span>{weekdaysval[0]} - {weekdaysval[6]}</span>
                        <button onClick={handleNextWeek} className="button-24">&gt;</button>
                    </div>
                </div>
                {/* <div className="col-md-6 text-right">
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div> */}
            </div>
            <div className="row">
                <div className="col-md-12">
                    <TimeSheet startPeriod={startDate} endPeriod={endDate} />
                </div>
            </div>
        </div>
    );
}

export default TimeSheetParent;