import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodosApp() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Initial value set to null for selectedUser
  const [selectedStatus, setSelectedStatus] = useState(null); // Initial value set to null for selectedStatus
  const [filteredTodos, setFilteredTodos] = useState([]);

  // Fetch todos and users data from the API
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });

    // Fetch user data from the provided /users API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Automatically filter todos whenever selectedUser or selectedStatus changes
  useEffect(() => {
    let filtered = todos;

    if (selectedUser !== null) { // Filtering only if selectedUser is not null
      filtered = filtered.filter(todo => todo.userId.toString() === selectedUser);
    }

    if (selectedStatus !== null) { // Filtering only if selectedStatus is not null
      filtered = filtered.filter(todo => 
        selectedStatus === 'completed' ? todo.completed : !todo.completed
      );
    }

    setFilteredTodos(filtered);
  }, [selectedUser, selectedStatus, todos]); // Dependency array includes selectedUser, selectedStatus, and todos

  // Handle clearing of filters
  const handleClearFilters = () => {
    setSelectedUser(null);
    setSelectedStatus(null);
  };

  // Get user name by user ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div>
      <h2>Todos App</h2>
      <div style={{ marginBottom: '10px' }}>
        <select value={selectedUser || ''} onChange={(e) => setSelectedUser(e.target.value || null)}> 
          {/* If no value is selected, set to null */}
          <option value="">All Users</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <select value={selectedStatus || ''} onChange={(e) => setSelectedStatus(e.target.value || null)} style={{ marginLeft: '10px' }}> 
          {/* If no value is selected, set to null */}
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="notCompleted">Not Completed</option>
        </select>

        <button onClick={handleClearFilters} style={{ marginLeft: '10px' }}>Clear Filters</button> {/* Clear button */}
      </div>
      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
      }}>
        <thead>
          <tr style={{ backgroundColor: '#aeaeae' }}>
            <th style={headerCellStyle}>ID</th>
            <th style={headerCellStyle}>User ID</th>
            <th style={headerCellStyle}>User Name</th> {/* New column for User Name */}
            <th style={headerCellStyle}>Title</th>
            <th style={headerCellStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {(filteredTodos.length > 0 ? filteredTodos : todos).map(todo => (
            <tr key={todo.id} style={{ backgroundColor: todo.completed ? '#55ef55' : '#e55555' }}>
              {/* Conditional styling for row background color */}
              <td style={cellStyle}>{todo.id}</td>
              <td style={cellStyle}>{todo.userId}</td>
              <td style={cellStyle}>{getUserName(todo.userId)}</td> {/* Display user name */}
              <td style={cellStyle}>{todo.title}</td>
              <td style={cellStyle}>{todo.completed ? 'Completed' : 'Not Completed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styling for header cells
const headerCellStyle = {
  width: '75px',
  height: '25px',
  border: '1px solid #151515',
  textAlign: 'left',
};

// Styling for body cells
const cellStyle = {
  width: '75px',
  height: '25px',
  border: '1px solid #151515',
  textAlign: 'left',
};

export default TodosApp;
