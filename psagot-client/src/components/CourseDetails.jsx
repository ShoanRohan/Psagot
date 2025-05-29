import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	Box,
	TextField,
	Typography,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';

const CourseDetails = () => {
	const { id } = useParams(); // קבלת CourseId מה URL
	const course = useSelector(state => state.course && state.course.course
  ? state.course.course.find(c => c.CourseId === id)
  : null
);


	if (!course) return <Typography>טעינת פרטי הקורס...</Typography>;

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 25 }, (_, i) => currentYear - 20 + i);

	return (
		<Paper
			elevation={0}
			sx={{
				backgroundColor: 'white',
				borderRadius: '10px',
				p: 2,
				width: '95%',
				height: '350px',
				mx: 'auto',
			}}
		>
			<Box sx={{ width: '100%', height: 'auto' }}>
				<Box sx={{ maxWidth: '500px', ml: 'auto' }}>
					<Typography
						variant="subtitle1"
						sx={{ fontWeight: 'bold', mb: 1, fontSize: '18px' }}
					>
						פרטים טכניים
					</Typography>

					<Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
						<TextField
							fullWidth
							label="קוד קורס"
							variant="standard"
							value={course.courseCode}
							InputProps={{ readOnly: true }}
						/>
						<TextField
							fullWidth
							label="שם קורס"
							variant="standard"
							value={course.courseName}
							InputProps={{ readOnly: true }}
						/>
						<TextField
							fullWidth
							label="שם רכזת"
							variant="standard"
							value={course.coordinator}
							InputProps={{ readOnly: true }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
						<FormControl
							fullWidth
							variant="standard"
							sx={{ direction: 'rtl' }}
						>
							<InputLabel>שנה</InputLabel>
							<Select
								value={course.year}
								readOnly
							>
								{years.map((year) => (
									<MenuItem
										key={year}
										value={year}
									>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							fullWidth
							label="תאריך התחלה"
							variant="standard"
							value={course.startDate}
							InputProps={{ readOnly: true }}
						/>
						<TextField
							fullWidth
							label="תאריך סיום"
							variant="standard"
							value={course.endDate}
							InputProps={{ readOnly: true }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
						<TextField
							fullWidth
							label="מספר תלמידים"
							variant="standard"
							value={course.students}
							InputProps={{ readOnly: true }}
						/>
						<TextField
							fullWidth
							label="מספר מפגשים"
							variant="standard"
							value={course.meetings}
							InputProps={{ readOnly: true }}
						/>
					</Box>

					<Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
						<TextField
							fullWidth
							multiline
							minRows={2}
							label="הערות"
							variant="standard"
							value={course.notes || ''}
							InputProps={{ readOnly: true }}
						/>
					</Box>

					<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
						<FormControl
							fullWidth
							variant="standard"
						>
							<InputLabel>סטטוס</InputLabel>
							<Select
								value={course.isActive ? 'פעיל' : 'לא פעיל'}
								readOnly
							>
								<MenuItem value="פעיל">פעיל</MenuItem>
								<MenuItem value="לא פעיל">לא פעיל</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
};

export default CourseDetails;
