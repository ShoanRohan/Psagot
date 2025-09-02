import * as React from 'react';
import {
	Box,
	Button,
	Typography,
	TextField,
	Link,
	IconButton,
	InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EyeIcon from '../assets/icons/eye_icon.svg';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';

const signIn = async (formData, setError) => {
	try {
		const response = await api.post('/auth/login', {
			email: formData.get('email'),
			password: formData.get('password'),
		});

		if (response.data.token) {
			localStorage.setItem('token', response.data.token);
			return { success: true };
		} else {
			setError('התחברות נכשלה, אנא בדוק את הפרטים.');
			return { success: false };
		}
	} catch (error) {
		setError('אירעה שגיאה, נסה שוב מאוחר יותר.');
		return { success: false };
	}
};

export default function LoginTest() {
	const theme = useTheme();
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [formError, setFormError] = React.useState('');
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const validateEmail = (value) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
			setIsSubmitting(false);
			return;
		}

		const formData = new FormData();
		formData.append('email', email);
		formData.append('password', password);

		const result = await signIn(formData, setFormError);
		if (!result.success) {
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

			<Box component="form" onSubmit={handleSubmit} sx={{ gap: 2, width: '100%' }}>
				<TextField
					label="שם משתמש"
					name="email"
					variant="standard"
					fullWidth
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					onBlur={() => setEmailError(validateEmail(email))}
					error={!!emailError}
					helperText={emailError}
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

				<Link href="/forgot-password" sx={{ fontSize: '12px', color: '#6F6F6F' }}>
					שכחתי סיסמה
				</Link>

				<Button
					type="submit"
					variant="contained"
					disabled={isSubmitting || !email || !password || emailError || passwordError}
					sx={{ mt: 2 }}
				>
					{isSubmitting ? 'מתחבר...' : 'כניסה למערכת'}
				</Button>
			</Box>
		</Box>
	);
}
