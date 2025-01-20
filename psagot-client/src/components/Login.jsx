import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import api from '../utils/api';


const providers =[{ id: 'credentials', name: 'Email and Password' }];


const signIn = async (provider, formData) => {

    try {
        const response = await api.post('/auth/login', {
          email: formData.get('email'),
          password: formData.get('password'),
        });
    
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          return { success: true };
        } else {
          return { success: false, error: 'Login failed. Please check your credentials.' };
        }
      } catch (error) {
        return { success: false, error: 'An error occurred. Please try again.' };
      }
    };
 /* const promise = new Promise((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
      );
      resolve();
    }, 300);
  });
  return promise;
};*/

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
    </AppProvider>
  );
}
