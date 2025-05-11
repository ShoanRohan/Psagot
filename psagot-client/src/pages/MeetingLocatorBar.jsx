import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../features/user/userAction';


const MeetingLocatorBar = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.user.user || []);
    
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);
    

    return (
        <div>
            <label htmlFor="lecturer-select">בחר מרצה:</label>
            <select
                id="lecturer-select"
                onChange={(e) => e.target.value}
            >
                <option value=""></option>
                {users?.filter(user => user.userTypeId === 4)
                        .map((lecturer) => (
                            <option key={lecturer.id} value={lecturer.id}>
                                {lecturer.name}
                            </option>
                        ))
                      }
            </select>
        </div>
    );
}


export default MeetingLocatorBar;

