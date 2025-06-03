import React from 'react';
import {
	Box,
	TextField,
	MenuItem,
	Typography,
	Select,
	FormControl,
	InputLabel,
	Checkbox,
	FormControlLabel,
	Paper,
} from '@mui/material';

const CourseDetails = () => {
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

					{/* קבוצה 1 */}
					<Box sx={{ display: 'flex', mb: 1, gap: 1 }}>
						<TextField
							fullWidth
							label="קוד קורס"
							variant="standard"
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
							InputLabelProps={{
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
						/>
						<TextField
							fullWidth
							label="שם קורס"
							variant="standard"
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
							InputLabelProps={{
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
						/>
						<TextField
							fullWidth
							label="שם רכזת"
							variant="standard"
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
							InputLabelProps={{
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
						/>
					</Box>

					{/* קבוצה 2 */}
					<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
						<FormControl
							fullWidth
							variant="standard"
							sx={{ direction: 'rtl' }}
						>
							<InputLabel sx={{ right: 0, left: 'unset', fontSize: '14px' }}>
								שנה
							</InputLabel>
							<Select
								defaultValue=""
								inputProps={{ dir: 'rtl', style: { fontSize: '14px' } }}
								sx={{
									textAlign: 'right',
									'& .MuiSelect-icon': {
										left: 7,
										right: 'unset',
									},
								}}
							>
								{years.map((year) => (
									<MenuItem key={year} value={year} sx={{ fontSize: '13px' }}>
										{year}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<TextField
							fullWidth
							label="תאריך התחלה"
							variant="standard"
							type="date"
							InputLabelProps={{
								shrink: true,
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
						/>

						<TextField
							fullWidth
							label="תאריך סיום"
							variant="standard"
							type="date"
							InputLabelProps={{
								shrink: true,
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
						/>
					</Box>

					{/* קבוצה 3 */}
					<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
						<TextField
							fullWidth
							label="מספר תלמידים"
							variant="standard"
							sx={{ width: '30%' }}
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
							InputLabelProps={{
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
						/>
						<TextField
							fullWidth
							label="מספר מפגשים"
							variant="standard"
							sx={{ width: '30%' }}
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
							InputLabelProps={{
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
						/>
					</Box>

					{/* קבוצה 4 */}
					<Box sx={{ mb: 1, display: 'flex', gap: 1 }}>
						<TextField
							fullWidth
							multiline
							minRows={2}
							label="הערות"
							variant="standard"
							sx={{ width: '60%' }}
							inputProps={{
								dir: 'rtl',
								style: { textAlign: 'right', fontSize: '14px' },
							}}
							InputLabelProps={{
								sx: { right: 0, left: 'unset', fontSize: '14px' },
							}}
						/>
					</Box>

					{/* קבוצה 5 */}
					<Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
						<FormControl
							fullWidth
							variant="standard"
							sx={{ direction: 'rtl', width: '30%' }}
						>
							<InputLabel
								sx={{
									display: 'flex',
									right: 0,
									left: 'unset',
									fontSize: '14px',
									width: '150px',
									height: '45px',
								}}
							>
								סטטוס
							</InputLabel>
							<Select
								defaultValue=""
								inputProps={{ dir: 'rtl', style: { fontSize: '14px' } }}
								sx={{
									textAlign: 'right',
									'& .MuiSelect-icon': {
										left: 7,
										right: 'unset',
									},
								}}
							>
								<MenuItem value="active">פעיל</MenuItem>
								<MenuItem value="inactive">לא פעיל</MenuItem>
							</Select>
						</FormControl>

						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 1,
								width: '30%',
							}}
						>
							<Typography sx={{ fontSize: '14px' }}>צבע לטבלה</Typography>
							<input
								type="color"
								defaultValue="#000000"
								style={{
									border: 'none',
									width: '30px',
									height: '30px',
									cursor: 'pointer',
									background: 'none',
								}}
							/>
						</Box>
					</Box>
				</Box>
			</Box>
		</Paper>
	);
};

export default CourseDetails;
