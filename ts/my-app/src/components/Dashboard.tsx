import React from 'react';
import { Container, Typography } from "@mui/material";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from 'react-chartjs-2';

interface UserData {
  name?: string;
  address?: string;
  email?: string;
  phone?: string;
}

const Dashboard: React.FC = () => {
  // Retrieving user data from local storage and defaulting to an empty array if not present
  const userData: UserData[] = JSON.parse(localStorage.getItem('userData') || '[]');
  
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

  // Mapping over all users and preparing data for the chart
  const labels: string[] = ['Name', 'Address', 'Email', 'Phone']; // Chart labels
  const datasets = userData.map((user, index) => ({
    label: `User ${index + 1}`, // Unique label for each user
    data: [
      user.name?.length || 0,
      user.address?.length || 0,
      user.email?.length || 0,
      user.phone?.length || 0
    ],
    fill: false,
    backgroundColor: `rgba(${75 + (index * 20)}, 192, 192, 1)`,  // Different colors for each user
    borderColor: `rgba(${75 + (index * 20)}, 192, 192, 1)`,
  }));

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return (
    <Container>
      <Typography variant="h6" style={{ color: 'blue' }}>
        Please note that we used only the length of the values to compare
      </Typography>
      <Line 
        data={data} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
        style={{
          maxHeight: '280px',  // Set the max height
          height: '100%',      // Ensure it scales properly within the container
        }}
      />
    </Container>
  );
};

export default Dashboard;
