import React from 'react';
import { Box, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import {useEffect,useState}from "react";
import { fetchAllCourses } from '../features/course/courseActions';

const MeetingLocatorBar = () => {
  const[courses,setCourses]=useState([]);
  const[selsectedCourse,setSelectedCourse]=useState("");

  useEffect(()=>{
    const fetchCourses= async () =>{
        try{
            const response=await fetchAllCourses ();
            const data=await response.json();
            setCourses(data);
        }catch(error){
            console.error("error fetching courses:", error);
        }
        };
        fetchCourses();
    },[]);
    
    return(
        <div>
            <label htmlfor="course-select">בחר קורס:</label>
            <select
            id="course-select"
            value={selsectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            >
<option value=""> בחר קורס</option>
{courses.map((course)=>(
    <option key={course.id}value={course.id}>
        {course.name}
                            </option>
))}
            </select>
        </div>
    );
};

export default MeetingLocatorBar;
