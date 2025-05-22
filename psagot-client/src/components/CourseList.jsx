// CourseList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../features/course/courseActions';
import { CircularProgress, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, status } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  // סינון הקורסים הפעילים בלבד
  const activeCourses = courses.filter(course => course.statusId === 1);

  if (status === 'loading') return <CircularProgress />;
  if (activeCourses.length === 0) return <Typography>לא נמצאו קורסים פעילים</Typography>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>קוד קורס</TableCell>
          <TableCell>שם קורס</TableCell>
          <TableCell>רכזת</TableCell>
          <TableCell>שנה</TableCell>
          <TableCell>סטטוס</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {activeCourses.map((course) => (
          <TableRow key={course.id}>
            <TableCell>{course.code}</TableCell>
            <TableCell>{course.name}</TableCell>
            <TableCell>{course.coordinator}</TableCell>
            <TableCell>{course.year}</TableCell>
            <TableCell>{course.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CourseList;
