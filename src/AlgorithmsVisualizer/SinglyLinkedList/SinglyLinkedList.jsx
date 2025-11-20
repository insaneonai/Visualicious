import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography, TextField } from '@mui/material';
import { motion } from 'framer-motion';

// Node component to represent each element in the linked list
const Node = ({ value, isHead, isTail, isHighlighted, isNew }) => (
  <motion.div
    initial={isNew ? (isHead ? { x: -100, opacity: 0 } : { x: 100, opacity: 0 }) : { opacity: 1 }}
    animate={{ x: 0, opacity: 1, scale: 1 }}
    exit={isHead ? { x: -100, opacity: 0 } : { x: 100, opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 20px',
      }}
    >
      <Typography
        sx={{
          fontSize: '12px',
          color: isHead ? 'green' : isTail ? 'red' : 'white',
          marginBottom: '5px',
        }}
      >
        {isHead ? 'Head' : isTail ? 'Tail' : ''}
      </Typography>
      <Box
        sx={{
          width: '60px',
          height: '60px',
          backgroundColor: isHighlighted ? '#4CAF50' : 'white',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid black',
          position: 'relative',
          transition: 'background-color 0.3s',
        }}
      >
        <Typography sx={{ color: 'black', fontSize: '20px' }}>{value}</Typography>
        {!isTail && (
          <Box
            sx={{
              position: 'absolute',
              right: '-40px',
              top: '50%',
              width: '40px',
              height: '2px',
              backgroundColor: 'white',
              '&::after': {
                content: '""',
                position: 'absolute',
                right: '0',
                top: '-4px',
                width: '8px',
                height: '8px',
                borderTop: '2px solid white',
                borderRight: '2px solid white',
                transform: 'rotate(45deg)',
              },
            }}
          />
        )}
      </Box>
    </Box>
  </motion.div>
);

const SinglyLinkedList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [position, setPosition] = useState('');
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [message, setMessage] = useState('');
  const [newNodeIndex, setNewNodeIndex] = useState(null);

  // Helper function to update message with animation
  const updateMessage = (text, duration = 2000) => {
    setMessage(text);
    setTimeout(() => setMessage(''), duration);
  };

  // Add node at the beginning of the list
  const addAtHead = () => {
    if (!inputValue) return;
    setList([parseInt(inputValue), ...list]);
    setNewNodeIndex(0);
    setTimeout(() => setNewNodeIndex(null), 300);
    setInputValue('');
    updateMessage('Node added at head!');
  };

  // Add node at the end of the list
  const addAtTail = () => {
    if (!inputValue) return;
    const newList = [...list, parseInt(inputValue)];
    setList(newList);
    setNewNodeIndex(newList.length - 1);
    setTimeout(() => setNewNodeIndex(null), 300);
    setInputValue('');
    updateMessage('Node added at tail!');
  };

  // Add node at a specific position
  const addAtPosition = () => {
    if (!inputValue || !position) return;
    const pos = parseInt(position);
    if (pos < 0 || pos > list.length) {
      updateMessage('Invalid position!', 3000);
      return;
    }
    const newList = [...list];
    newList.splice(pos, 0, parseInt(inputValue));
    setList(newList);
    setInputValue('');
    setPosition('');
    updateMessage(`Node added at position ${pos}!`);
  };

  // Delete node from the beginning
  const deleteFromHead = () => {
    if (list.length === 0) return;
    setList(list.slice(1));
    updateMessage('Node deleted from head!');
  };

  // Delete node from the end
  const deleteFromTail = () => {
    if (list.length === 0) return;
    setList(list.slice(0, -1));
    updateMessage('Node deleted from tail!');
  };

  // Delete node from a specific position
  const deleteAtPosition = () => {
    if (!position || list.length === 0) return;
    const pos = parseInt(position);
    if (pos < 0 || pos >= list.length) {
      updateMessage('Invalid position!', 3000);
      return;
    }
    const newList = [...list];
    newList.splice(pos, 1);
    setList(newList);
    setPosition('');
    updateMessage(`Node deleted from position ${pos}!`);
  };

  // Reverse the linked list with animation
  const reverseList = async () => {
    const reversedList = [...list].reverse();
    setList(reversedList);
    updateMessage('List reversed!');
  };

  // Search for a value in the list
  const searchValue = () => {
    if (!inputValue) return;
    const index = list.indexOf(parseInt(inputValue));
    if (index !== -1) {
      setHighlightedNode(index);
      updateMessage(`Value found at position ${index}!`, 3000);
      setTimeout(() => setHighlightedNode(null), 3000);
    } else {
      updateMessage('Value not found!', 3000);
    }
    setInputValue('');
  };

  return (
    <Box sx={{ padding: '20px', color: 'white' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', fontFamily: 'Pixelify Sans' }}>
        Linked List Visualization
      </Typography>

      {/* Input controls */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
        <TextField
          label="Value"
          variant="filled"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="number"
          sx={{ "& input": { color: "white" } }}
        />
        <TextField
          label="Position"
          variant="filled"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          type="number"
          sx={{ "& input": { color: "white" } }}
        />
      </Stack>

      {/* Operation buttons */}
      <Stack direction="row" spacing={2} sx={{ marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <Button variant="contained" onClick={addAtHead}>Add at Head</Button>
        <Button variant="contained" onClick={addAtTail}>Add at Tail</Button>
        <Button variant="contained" onClick={addAtPosition}>Add at Position</Button>
        <Button variant="contained" onClick={deleteFromHead}>Delete from Head</Button>
        <Button variant="contained" onClick={deleteFromTail}>Delete from Tail</Button>
        <Button variant="contained" onClick={deleteAtPosition}>Delete at Position</Button>
        <Button variant="contained" onClick={reverseList}>Reverse List</Button>
        <Button variant="contained" onClick={searchValue}>Search Value</Button>
      </Stack>

      {/* Message display */}
      {message && (
        <Typography
          sx={{
            marginBottom: '20px',
            color: 'lightgreen',
            fontFamily: 'Pixelify Sans',
          }}
        >
          {message}
        </Typography>
      )}

      {/* Linked List visualization */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          overflowX: 'auto',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          minHeight: '150px',
        }}
      >
        {list.length === 0 ? (
          <Typography sx={{ color: 'gray' }}>Empty list - Add some nodes!</Typography>
        ) : (
          list.map((value, index) => (
            <Node
              key={index}
              value={value}
              isHead={index === 0}
              isTail={index === list.length - 1}
              isHighlighted={index === highlightedNode}
              isNew={index === newNodeIndex}
            />
          ))
        )}
      </Box>

      
      <Box sx={{ marginTop: '40px' }}>
        <Typography variant="h5" sx={{ marginBottom: '15px', fontFamily: 'Pixelify Sans' }}>
          Time Complexities
        </Typography>
        <Typography>• Insertion at Head: O(1)</Typography>
        <Typography>• Insertion at Tail: O(1) with tail pointer</Typography>
        <Typography>• Insertion at Position: O(n)</Typography>
        <Typography>• Deletion from Head: O(1)</Typography>
        <Typography>• Deletion from Tail: O(n)</Typography>
        <Typography>• Search: O(n)</Typography>
        <Typography>• Reverse: O(n)</Typography>
      </Box>
    </Box>
  );
};

export default SinglyLinkedList;