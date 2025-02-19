import React, { useState } from "react";
import { Container, Typography, Button } from "@mui/material";

// Import individual components
import Counter from './Counter'; // Counter component
import UserDataForm from './UserDataForm'; // User Data Form component
import RichTextEditor from './RichTextEditor'; // Rich Text Editor component
import Dashboard from './Dashboard'; // Dashboard component

type Section = "counter" | "richTextEditor" | "userDataForm" | "dashboard" | null;

const HomePage: React.FC = () => {
  // State to manage expanded section
  const [expandedSection, setExpandedSection] = useState<Section>(null);

  // Function to toggle expand/collapse
  const toggleSection = (section: Section): void => {
    setExpandedSection((prev) => (prev === section ? null : section)); // Toggle the expanded section
  };

  return (
    <Container>
        <Typography variant="h2" gutterBottom>
            React Project Assignment
        </Typography>

        {/* Show all sections when none is expanded */}
        {expandedSection === null && (
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '16px',
            }}
            >
            {/* Counter Section */}
            <div style={{ backgroundColor: 'lightblue', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="white">Counter</Typography>
                <Button onClick={() => toggleSection("counter")}>Expand</Button>
            </div>

            {/* Rich Text Editor Section */}
            <div style={{ backgroundColor: 'lightyellow', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="black">Rich Text Editor</Typography>
                <Button onClick={() => toggleSection("richTextEditor")}>Expand</Button>
            </div>

            {/* User Data Form Section */}
            <div style={{ backgroundColor: 'lightgreen', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="black">User Data Form</Typography>
                <Button onClick={() => toggleSection("userDataForm")}>Expand</Button>
            </div>

            {/* Dashboard Section */}
            <div style={{ backgroundColor: 'lightcoral', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="white">Dashboard</Typography>
                <Button onClick={() => toggleSection("dashboard")}>Expand</Button>
            </div>
            </div>
        )}

        {/* Show only the expanded section when one is selected */}
        {expandedSection !== null && (
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr',
                gap: '16px',
            }}
            >
            {/* Counter Section */}
            {expandedSection === "counter" && (
                <div style={{ backgroundColor: 'lightblue', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="white">Counter</Typography>
                <Counter />
                <Button onClick={() => toggleSection("counter")}>Collapse</Button>
                </div>
            )}

            {/* Rich Text Editor Section */}
            {expandedSection === "richTextEditor" && (
            <div style={{ backgroundColor: 'lightyellow', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="black">Rich Text Editor</Typography>
                {/* Make sure the RichTextEditor is styled correctly */}
                <div style={{ border: '1px solid black', padding: '10px', maxHeight:'400px', overflowY: 'auto' }}>
                <RichTextEditor />
                </div>
                <Button onClick={() => toggleSection("richTextEditor")}>Collapse</Button>
            </div>
            )}

            {/* User Data Form Section */}
            {expandedSection === "userDataForm" && (
                <div style={{ backgroundColor: 'lightgreen', padding: '16px', borderRadius: '8px' }}>
                <Typography variant="h6" color="black">User Data Form</Typography>
                <UserDataForm />
                <Button onClick={() => toggleSection("userDataForm")}>Collapse</Button>
                </div>
            )}

            {/* Dashboard Section */}
            {expandedSection === "dashboard" && (
                <div style={{ backgroundColor: 'lightcoral', padding: '16px', maxHeight:'400px', borderRadius: '8px' }}>
                <Typography variant="h6" color="white">Dashboard</Typography>
                <Dashboard />
                <Button onClick={() => toggleSection("dashboard")}>Collapse</Button>
                </div>
            )}
            </div>
        )}
    </Container>
  );
};

export default HomePage;
