import { Alert, Avatar, Container, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
import { useState } from 'react';
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { TodoContext } from './TodoContext';

import Loading from '../components/Loading';
import Login from '../components/Login';

import { useAuth } from '../Auth';
import { Box } from '@mui/system'
import { auth, db } from '../firebase';
import { verifyIdToken } from '../firebaseAdmin';
import nookies from 'nookies';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

export default function Home({todosProps}) {
  const {currentUser} = useAuth();
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
  console.log('currentUser',currentUser)
  return (
    <TodoContext.Provider value={{showAlert, todo, setTodo}}>
      <Container maxWidth="sm">
        <Box sx={{ display:'flex', justifyContent: 'space-between'}} mt={3}>
          <Tooltip title="로그아웃"  placement="right-end" >
            <IconButton onClick={()=> auth.signOut()}> 
              <Avatar src={currentUser.photoURL} />
            </IconButton>
          </Tooltip>
          <Typography variant="h5">
            {currentUser.displayName}의 차량 관리 일기장
          </Typography>
        </Box>
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
        <TodoList todosProps={todosProps}/>
      </Container>
    </TodoContext.Provider>
  )
}

export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { email} = token;
    const collectionRef = collection(db, 'todos');
    const q = query(collectionRef, where('email', '==', email), orderBy('timestamp','desc'));
    const querySnapshot = await getDocs(q);
    let todos = [];
    querySnapshot.forEach((doc) => {
      todos.push({...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime()});
    })
    return {
      props: {
        todosProps: JSON.stringify(todos) || [],
      }
    };
  } catch (error) {
    return {props: {}}
  }
}

//----------------------------------------------

// import { Alert, Avatar, Container, IconButton, Snackbar, Tooltip, Typography } from '@mui/material'
// import { useState } from 'react';
// import TodoForm from '../components/TodoForm'
// import TodoList from '../components/TodoList'
// import { TodoContext } from './TodoContext';

// import Loading from '../components/Loading';
// import Login from '../components/Login';

// import { useAuth } from '../Auth';
// import { Box } from '@mui/system'
// import { auth, db } from '../firebase';
// import { verifyIdToken } from '../firebaseAdmin';
// import nookies from 'nookies';
// import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

// export default function Home({todosProps}) {
//   const {currentUser} = useAuth();
//   const [open, setOpen] = useState(false);
//   const [alertType, setAlertType] = useState('success');
//   const [alertMessage, setAlerMessage] = useState('');
//   const [todo, setTodo] = useState({title:'', detail:''})
//   const showAlert = (type, msg) => {
//     setAlertType(type);
//     setAlerMessage(msg);
//     setOpen(true);
//   }
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
 
//     setOpen(false);
//   };
//   return (
//     <TodoContext.Provider value={{showAlert, todo, setTodo}}>
//       <Container maxWidth="sm">
//         <Box sx={{ display:'flex', justifyContent: 'space-between'}} mt={3}>
//           <Tooltip title="로그아웃"  placement="right-end" >
//             <IconButton onClick={()=> auth.signOut()}> 
//               <Avatar src={currentUser.photoURL} />
//             </IconButton>
//           </Tooltip>
//           <Typography variant="h5">
//             {currentUser.displayName}의 차량 관리 일기장
//           </Typography>
//         </Box>
//         <TodoForm />
//         <Snackbar 
//           anchorOrigin={{vertical:'bottom', horizontal:'center'}}
//           open={open} 
//           autoHideDuration={6000} 
//           onClose={handleClose}
//         >
//           <Alert onClose={handleClose} severity={alertType} sx={{ width: '100%' }}>
//             {alertMessage}
//           </Alert>
//         </Snackbar>
//         <TodoList todosProps={todosProps}/>
//       </Container>
//     </TodoContext.Provider>
//   )
// }

// export async function getServerSideProps(context) {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);
//     const { email} = token;
//     const collectionRef = collection(db, 'todos');
//     const q = query(collectionRef, where('email', '==', email), orderBy('timestamp','desc'));
//     const querySnapshot = await getDocs(q);
//     let todos = [];
//     querySnapshot.forEach((doc) => {
//       todos.push({...doc.data(), id: doc.id, timestamp: doc.data().timestamp.toDate().getTime()});
//     })
//     return {
//       props: {
//         todosProps: JSON.stringify(todos) || [],
//       }
//     };
//   } catch (error) {
//     return {props: {}}
//   }
// }