import React, {useState, useEffect} from 'react';
import './dashboard.css';

function Dashboard(){
    const [users, setUsers] = useState([]);

    const fetchUserData = () => {
        fetch(`http://localhost:3000/users/dashboard?user_id`)
        .then(resposne => {
            return Response.json()
        })
        .then(data => {
            setUsers(data)
        })
    }

    useEffect(() => {
        fetchUserData()
    }, []);

    return(
        <div className="dashboard">
            <div className="title">
                <h2>Hello,</h2>
                <h1>Username</h1>
            </div>

            <div class="timings">
                <div className="label1">
                <label className="hours">Total Working Hours</label>
                <button className="clickOne">click</button>
                </div>

                <div>    
                <label className="time">Overtime Hours</label>
                <button className="clickTwo">click</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;