import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { Box, Button, Typography, TextField, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/rubik';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';

const theme = createTheme({
	typography: {
		fontFamily: 'Rubik, Arial, sans-serif',
	},
});

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

export default function CredentialsSignInPage() {
	const theme = useTheme();

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [emailError, setEmailError] = React.useState('');
	const [passwordError, setPasswordError] = React.useState('');
	const [formError, setFormError] = React.useState('');
	const [isSubmitting, setIsSubmitting] = React.useState(false);

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
		<AppProvider theme={theme}>
			{/* BOX חיצוני שמכיל את כל הקומפוננטה */}
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'flex-start',
					alignItems: 'center',
					height: '79%', // שים לב שזה height ולא minHeight
					width: '100%',
					direction: 'rtl',
					fontFamily: 'Rubik',
					marginTop: '-10vh', // דוחף את הטופס למעלה
				}}
			>
				<Typography
					variant="h1"
					sx={{
						mb: 2,
						fontWeight: 'bold',
						color: '#333',
						fontFamily: 'Rubik',
						fontSize: '20px',
					}}
				>
					כניסה למערכת
				</Typography>

				{/* BOX שני שמכיל את שדות הטופס */}
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						gap: 2,
						height: '77%',
						width: '100%',
						//fontFamily: 'Rubik',
					}}
				>
					<TextField
						label="אימייל"
						name="email"
						variant="standard"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						onBlur={() => setEmailError(validateEmail(email))}
						error={!!emailError}
						helperText={emailError}
						InputLabelProps={{
							style: {
								textAlign: 'right',
								width: '100%',
								fontFamily: 'Rubik',
								fontSize: '14px',
							},
						}}
						sx={{ fontFamily: 'Rubik' }}
					/>

					<TextField
						label="סיסמה"
						name="password"
						type="password"
						variant="standard"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						onBlur={() => setPasswordError(validatePassword(password))}
						error={!!passwordError}
						helperText={passwordError}
						InputLabelProps={{
							style: {
								textAlign: 'right',
								width: '100%',
								fontFamily: 'Rubik',
								fontSize: '14px',
							},
						}}
						sx={{ fontFamily: 'Rubik' }}
					/>

					
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
					

					{formError && (
						<Typography
							sx={{
								color: 'red',
								textAlign: 'center',
								fontSize: '14px',
								fontFamily: 'Rubik',
							}}
						>
							{formError}
						</Typography>
					)}

					{/* BOX שלישי שמכיל את הכפתור והלינק להרשמה */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							height: '9%',
							width: '100%',
							alignItems: 'center',
							gap: 1,
						}}
					>
						<Button
							type="submit"
							variant="contained"
							disabled={
								isSubmitting ||
								!email ||
								!password ||
								emailError ||
								passwordError
							}
							sx={{
								backgroundColor: '#1976d2',
								color: '#fff',
								fontWeight: 'bold',
								borderRadius: '25px',
								py: 1,
								fontSize: '14px',
								width: '60%',
								mx: 'auto',
								fontFamily: 'Rubik',
								'&:hover': {
									backgroundColor: '#1565c0',
								},
							}}
						>
							{isSubmitting ? 'מתחבר...' : 'כניסה'}
						</Button>

						<Button
							variant="text"
							sx={{
								mt: 1,
								color: '#6F6F6F',
								textDecoration: 'underline',
								fontWeight: 'bold',
								cursor: 'pointer',
								fontFamily: 'Rubik',
							}}
							onClick={() => (window.location.href = '/register')}
						>
							אין לך חשבון? תרשם
						</Button>
					</Box>
				</Box>
			</Box>
		</AppProvider>
	);
}
