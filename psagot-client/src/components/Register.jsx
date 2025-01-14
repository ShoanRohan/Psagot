import React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAction } from '../features/user/userAction';

const providers = [{ id: 'credentials', name: 'Email and Password' }];

export const Register = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleClickButton = () => {
    dispatch(addUserAction());
    alert('User added');
  };

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

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={CredentialsSignInPage}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
      />
      <button onClick={handleClickButton}>Add User</button>
    </AppProvider>
  );
};
