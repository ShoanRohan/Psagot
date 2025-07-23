import React from 'react';
import Login from '../components/Login';
import { Box } from '@mui/material';
import loginImage from '../assets/imgs/login_image.png';
import logoPsagot from '../assets/imgs/logo_psagot.svg';
import { Outlet } from 'react-router-dom';


const LoginPage = () => {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100vw',
				height: '100vh',
				backgroundColor: '#96cfec',
				display: 'flex',
				overflow: 'hidden',
			}}
		>
			<Box
				sx={{
					width: '33%',
					height: '100%',
					backgroundColor: '#fff',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					borderBottomLeftRadius: '5%',
					borderTopLeftRadius: '5%',
					
				}}
			>
				<Box
					sx={{
						width: '80%',
						height: '40%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
						gap: 10,
						
					}}
				>
					<Box
						sx={{
							
							width: '84%',
							height: '24%',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: '-10vh',
						}}
					>
						<img
							src={logoPsagot}
							alt="Logo"
							style={{
								width: '80%',
								height: '132%',
								objectFit: 'contain',
							}}
						/>
					</Box>

					<Box>
						<Outlet />
						{/* <Login/> */}
					</Box>
				</Box>
			</Box>

			<Box
				sx={{
					width: '67%',
					height: '100%',
					backgroundImage: `url(${loginImage})`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			/>
		</Box>
	);
};

export default LoginPage;
