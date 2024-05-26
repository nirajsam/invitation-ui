import React, { useEffect, useState } from 'react';
import './InviteResponseDetail.css'; // Import CSS file for styling
import axios from 'axios';

const InviteResponseDetails = () => {
    const [tableData, setTableData] = useState([])
    const [loading, setloading] = useState(true)
    
    const fetchGuestDetails = async() => {
        try {
            // API call to submit form details
            const res = await axios.get('http://localhost:5001/api/getGuests');
            console.log("guest",res.data)
            setTableData(res.data)
        } catch (error) {
            console.error('Error getting guests list:', error);
        }
    }  
    useEffect(()=>{
        fetchGuestDetails()
        
        setloading(false)
    },[])
    console.log(tableData)
    if(loading){
        return <p>loading...</p>
    }
    return (
        <div className="table-container">
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Accept / Decline</th>
                <th>Availability Dates</th>
                <th>Number of Members</th>
                <th>family type</th>
                <th>attended member count</th>
            </tr>
            </thead>
            <tbody>
                {tableData.map(data=>{
                    return(<tr>
                        <td>{data.name}</td>
                        <td>{data.address}</td>
                        <td>
                        {data.acceptOrDecline}
                        </td>
                        <td>{`${data.availabilityDates}`}</td>
                        <td>{data.memberCount}</td>
                        <td>{data.familyType}</td>
                        <td>{data.attendedMemberCount || 'not arrived'}</td>
                    </tr>)
                })}
            
            {/* Add more rows as needed */}
            </tbody>
        </table>
        </div>
    );
};

export default InviteResponseDetails;
