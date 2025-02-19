import React, { useState, useEffect } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

interface UserData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const UserDataForm: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: ''
  });
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setUnsavedChanges(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `user-${Math.random().toString(36).substr(2, 9)}`;
    const dataToSave: UserData = { ...userData, id };
  
    // Get existing data from localStorage
    let existingData: UserData[] = JSON.parse(localStorage.getItem('userData') || '[]');
    if (!Array.isArray(existingData)) {
        existingData = [];
      }
  
    // Check if the email already exists in the existing data
    const emailExists = existingData.some((user) => user.email === userData.email);
  
    if (emailExists) {
      // Show confirmation popup if email already exists
      const update = window.confirm('The email address is already taken. Do you want to update the user data?');
  
      if (update) {
        // If the user confirms, find the existing user by email and update their data
        const updatedData = existingData.map((user) =>
          user.email === userData.email ? { ...user, ...dataToSave } : user
        );
        localStorage.setItem('userData', JSON.stringify(updatedData));
  
        // Reset the form data
        setUserData({
          id: '',
          name: '',
          address: '',
          email: '',
          phone: ''
        });
  
        // Reset unsaved changes
        setUnsavedChanges(false);
      } else {
        // If the user clicks "No", don't save the new data, just clear the form
        setUserData({
          id: '',
          name: '',
          address: '',
          email: '',
          phone: ''
        });
  
        setUnsavedChanges(false);
      }
    } else {
      // If the email doesn't exist, simply append the new data
      existingData.push(dataToSave);
      localStorage.setItem('userData', JSON.stringify(existingData));
  
      // Reset the form data
      setUserData({
        id: '',
        name: '',
        address: '',
        email: '',
        phone: ''
      });
  
      // Reset unsaved changes
      setUnsavedChanges(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>User Data Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Name" name="name" value={userData.name} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Address" name="address" value={userData.address} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Email" name="email" value={userData.email} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Phone" name="phone" value={userData.phone} onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary">Save</Button>
      </form>
    </Container>
  );
};

export default UserDataForm;
