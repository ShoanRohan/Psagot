import React from 'react'
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

    const CredentialsSignInPage = async (provider, formData) => {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
          alert(
            `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
          );
          resolve();
        }, 300);
      });
      return promise;
    };
    
export const Register =()  => {
      const theme = useTheme();
      return (
        <AppProvider theme={theme}>
          <SignInPage
            signIn={CredentialsSignInPage}
            providers={providers}
            slotProps={{ emailField: { autoFocus: false } }}          
          />
        </AppProvider>
      ); 
}



