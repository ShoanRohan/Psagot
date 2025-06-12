import * as React from 'react';
import EyeIcon from '../assets/icons/eye_icon.svg';
import {
	Box,
	Button,
	Typography,
	TextField,
	Link,
	IconButton,
	InputAdornment,
	Snackbar,
	Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const signIn = async (email, password, setError, showSnackbar) => {
	try {
		const response = await api.post('/User/login', {
			email,
			password,
		});
		localStorage.removeItem('userId');

		if (response.status === 200) {
			localStorage.setItem(
				'userId',
				response.data.user?.id || response.data.user?.userId
			);
			return { success: true, user: response.data.user };
		}
	} catch (error) {
		if (error.response && error.response.status === 401) {
			const { errorCode, message } = error.response.data;

			if (errorCode === 'EMAIL_NOT_FOUND') {
				showSnackbar('המייל לא קיים במערכת. אנא הירשם.');
			} else if (errorCode === 'WRONG_PASSWORD') {
				showSnackbar('הסיסמה שגויה. נסה שוב.');
			} else {
				showSnackbar(message || 'שגיאה לא מזוהה');
			}
		} else {
			showSnackbar('שגיאה בלתי צפויה. נסה שוב מאוחר יותר.');
		}
		return { success: false };
	}
};

export default function Login() {
	const theme = useTheme();
	const navigate = useNavigate();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [formError, setFormError] = React.useState('');
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	// Snackbar states
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [snackbarMessage, setSnackbarMessage] = React.useState('');
	const [snackbarSeverity, setSnackbarSeverity] = React.useState('error');

	const showSnackbar = (message, severity = 'error') => {
		setSnackbarMessage(message);
		setSnackbarSeverity(severity);
		setSnackbarOpen(true);
	};

	const validateEmail = (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
		if (!value) return 'שדה חובה';
		if (!emailRegex.test(value)) return 'אימייל לא תקין';
		return '';
	};

	const validatePassword = (value) => {
		if (!value) return 'שדה חובה';
		if (value.length < 6) return 'סיסמה חייבת להיות לפחות 6 תווים';
		return '';
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormError('');
		setIsSubmitting(true);

		const emailValidation = validateEmail(email);
		const passwordValidation = validatePassword(password);

		setEmailError(emailValidation);
		setPasswordError(passwordValidation);

		if (emailValidation || passwordValidation) {
			setFormError('אנא תקן את השגיאות לפני התחברות.');
			setIsSubmitting(false);
			return;
		}

		const result = await signIn(email, password, setFormError, showSnackbar);
		if (result.success) {
			navigate('/home');
		} else {
			setIsSubmitting(false);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				width: '100%',
				direction: 'rtl',
				fontFamily: 'Rubik',
				marginTop: '-3vh',
			}}
		>
			<Typography
				variant="h1"
				sx={{
					mb: 2,
					fontWeight: 'bold',
					color: '#333',
					fontFamily: 'Rubik',
					fontSize: '25px',
				}}
			>
				כניסה למערכת
			</Typography>

			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 2,
					width: '100%',
					height: '100%',
					fontFamily: 'Rubik',
				}}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '53%', gap: 1 }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
						<TextField
							label="אימייל"
							name="email"
							variant="standard"
							fullWidth
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
								setEmailError(validateEmail(e.target.value));
							}}
							onBlur={() => setEmailError(validateEmail(email))}
							error={!!emailError}
							helperText={emailError}
							sx={{
								'& .MuiInputLabel-root': {
									textAlign: 'right',
									width: '100%',
									fontFamily: 'Rubik',
									fontSize: '16px',
								},
							}}
						/>

						<TextField
							label="סיסמה"
							name="password"
							type={showPassword ? 'text' : 'password'}
							variant="standard"
							fullWidth
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							onBlur={() => setPasswordError(validatePassword(password))}
							error={!!passwordError}
							helperText={passwordError}
							sx={{
								'& .MuiInputLabel-root': {
									textAlign: 'right',
									width: '100%',
									fontFamily: 'Rubik',
									fontSize: '16px',
								},
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="Toggle password visibility"
											onClick={() => setShowPassword((prev) => !prev)}
											edge="end"
										>
											<img
												src={EyeIcon}
												alt="Eye Icon"
												style={{ width: '20px', height: '20px' }}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</Box>

					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '4%', justifyContent: 'center' }}>
						<Link
							href="/forgot-password"
							sx={{
								fontSize: '12px',
								color: '#6F6F6F',
								cursor: 'pointer',
								textDecoration: 'none',
								fontFamily: 'Rubik',
							}}
						>
							שכחתי סיסמה
						</Link>
					</Box>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '99%', height: '27%', gap: 2 }}>
					<Button
						type="submit"
						variant="contained"
						disabled={isSubmitting || !email || !password || emailError || passwordError}
						sx={{
							backgroundColor: '#1976d2',
							color: '#fff',
							fontWeight: 'bold',
							borderRadius: '25px',
							py: 1,
							fontSize: '14px',
							width: '60%',
							height: '48%',
							fontSize: '12px',
							fontFamily: 'Rubik',
							'&:hover': {
								backgroundColor: '#112B83',
							},
						}}
					>
						{isSubmitting ? 'מתחבר...' : 'כניסה למערכת'}
					</Button>

					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '4%', justifyContent: 'center', alignItems: 'center' }}>
						<Button
							variant="text"
							sx={{
								color: '#6F6F6F',
								fontWeight: 'bold',
								cursor: 'pointer',
								fontFamily: 'Rubik',
								fontSize: '12px',
							}}
							onClick={() => (window.location.href = '/register')}
						>
							אין לך חשבון?{' '}
							<span
								style={{
									borderBottom: '1px solid #6F6F6F',
									display: 'inline-block',
									lineHeight: '1',
								}}
							>
								הירשם
							</span>
						</Button>
					</Box>
				</Box>
			</Box>

			{/* Snackbar component */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={() => setSnackbarOpen(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					onClose={() => setSnackbarOpen(false)}
					severity={snackbarSeverity}
					sx={{ width: '100%', direction: 'rtl' }}
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</Box>
	);
}
