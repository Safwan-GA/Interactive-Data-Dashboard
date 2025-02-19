import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  useEffect(() => {
    const savedData = localStorage.getItem('editorData');
    if (savedData) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(savedData))));
    }
  }, []);

  const handleEditorChange = (state: EditorState): void => {
    setEditorState(state);
    const rawContentState = convertToRaw(state.getCurrentContent());
    localStorage.setItem('editorData', JSON.stringify(rawContentState));
  };

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        {/* The editor toolbar will stay fixed at the top */}
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
            inline: { options: ['bold', 'italic', 'underline'] },
          }}
          toolbarStyle={{
            position: 'sticky',   // Makes the toolbar sticky
            top: 0,               // Keeps the toolbar at the top
            zIndex: 10,           // Ensures toolbar stays above content
            backgroundColor: 'white', // Optional: Add a background color for the toolbar
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a shadow for better visibility
          }}
          editorStyle={{
            backgroundColor: 'white',  // Set the background color of the textarea to white
            minHeight: '200px',        // Optional: set a minimum height for the editor
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Optional: add some shadow for visual appeal
          }}
        />
      </div>
    </Container>
  );
};

export default RichTextEditor;
