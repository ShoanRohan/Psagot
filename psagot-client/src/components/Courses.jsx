import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Courses = () => {
  const courses = [
    {
      CourseId: 1,
      Name: 'Mathematics 101',
      Year: 2023,
      Color: 'Red',
      StartDate: new Date('2023-01-01'),
      EndDate: new Date('2023-06-01'),
      NumberOfMeetings: 20,
      NumberOfStudents: 100,
      Notes: 'Introduction to Math'
    },
    {
      CourseId: 2,
      Name: 'Science 101',
      Year: 2023,
      Color: 'Blue',
      StartDate: new Date('2023-02-01'),
      EndDate: new Date('2023-06-01'),
      NumberOfMeetings: 25,
      NumberOfStudents: 120,
      Notes: 'Basic Science Course'
    },
  ];

  const handleEdit = (courseId) => {
    console.log('Editing course with ID:', courseId);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="course table">
        <TableHead>
          <TableRow>
            <TableCell>Course ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Meetings</TableCell>
            <TableCell>Students</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.CourseId}>
              <TableCell>{course.CourseId}</TableCell>
              <TableCell>{course.Name}</TableCell>
              <TableCell>{course.Year}</TableCell>
              <TableCell>{course.Color}</TableCell>
              <TableCell>{course.StartDate.toLocaleDateString()}</TableCell>
              <TableCell>{course.EndDate ? course.EndDate.toLocaleDateString() : '-'}</TableCell>
              <TableCell>{course.NumberOfMeetings ?? '-'}</TableCell>
              <TableCell>{course.NumberOfStudents ?? '-'}</TableCell>
              <TableCell>{course.Notes ?? '-'}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(course.CourseId)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Courses;
