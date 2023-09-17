import React, {useState, useEffect} from 'react';
import './dashboard.css';

function Dashboard(){
    const [userData, setUserData] = useState([]);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [totalOverTime, setTotalOverTime] = useState(0);

    const fetchUserData = () => {
        fetch(`http://localhost:3000/users/dashboard?user_id=1`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setUserData(data)
            calculateTotalWorkTime(data.data);
            calculateTotalOverWorkTime(data.data);
        })
    }
  
    useEffect(() => {
        fetchUserData()
    }, []);

    const calculateTotalWorkTime = (data) => {
        let total = 0;
        for(const dayData of data){
            total += calculateDayWorkTime(dayData);
        }
        setTotalWorkTime(total);
    }

    const calculateDayWorkTime = (dayData) => {
        const startTime = dayData.start_time;
        const startTimeArray = startTime.split(':');
        const startHours = startTimeArray[0] * 60 * 60;
        const startMinutes =  startTimeArray[1] * 60;
        const startSeconds = startTimeArray[2];
        const  getStartTime = (startHours + startMinutes + startSeconds);

        const endTime = dayData.end_time;
        const endTimeArray = endTime.split(':');
        const endHours = endTimeArray[0] * 60 * 60;
        const endTMinutes = endTimeArray[1] * 60;
        const endSeconds = endTimeArray[2];
        const getEndTime = (endHours + endTMinutes + endSeconds);
        console.log(getEndTime - getStartTime)
        return (getEndTime - getStartTime)/(60*60*100);
    }

    const calculateTotalOverWorkTime = (data) => {
        let totalOverTime = 0;
        for(const dayData of data){
            totalOverTime += calculateTotalOverTime(dayData);
        }
        setTotalOverTime(totalOverTime);
    }

    const calculateTotalOverTime = (overTimeData) => {
        const endOverTime = overTimeData.end_time;
        const endOverTimeArray = endOverTime.split(':');
        const endOverHours = endOverTimeArray[0] * 60 * 60;
        const endOverMinutes = endOverTimeArray[1] * 60;
        const endOverSeconds = endOverTimeArray[2];
        const getEndOverTime = (endOverHours + endOverMinutes + endOverSeconds);
        if(getEndOverTime > 6120000){
            return (getEndOverTime - 6120000)/(60*60*100);
        } else {
            return 0;
        }
    }
    return(
        <div className="dashboard">
            <div className="title">
                <h2>Hello,</h2>
                <h1>{userData.username}</h1>
            </div>

            <div className="timings">
                <div className="label1">
                <label className="hours">Total Working Hours</label>
                <p>{totalWorkTime}</p>
                {/* <button className="clickOne" onClick={handlClickOne}>click</button> */}
                </div>

                <div>    
                <label className="time">Overtime Hours</label>
                <p>{totalOverTime}</p>
                {/* <button className="clickTwo">click</button> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;