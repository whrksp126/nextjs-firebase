import { Alert, Container, Snackbar } from '@mui/material'
import { useState } from 'react';
import TodoForm from '../components/TodoForm'

import TodoList from '../components/TodoList'
import { TodoContext } from './TodoContext';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlerMessage] = useState('');
  const [todo, setTodo] = useState({title:'', detail:''})
  const showAlert = (type, msg) => {
    setAlertType(type);
    setAlerMessage(msg);
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
 
    setOpen(false);
  };

  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
      <Container maxWidth="sm">
        <TodoForm />
        <Snackbar 
          anchorOrigin={{vertical:'bottom', horizontal:'center'}}
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
    </TodoContext.Provider>
  )
}
