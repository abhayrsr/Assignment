import React, {useState, useEffect} from 'react';
import './dashboard.css';

function Dashboard(){
    const [userData, setUserData] = useState([]);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const fetchUserData = () => {
        fetch(`http://localhost:3000/users/dashboard?user_id=1`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setUserData(data)
            calculateTotalWorkTime(data.data);
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
        const startTime = new Date(dayData.start_time);
        const endTime = new Date(dayData.end_time);
        return (endTime - startTime)/60*60*1000;
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
                {/* <button className="clickTwo">click</button> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;