import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material"
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { TodoContext } from "../pages/TodoContext";
import {useRouter} from 'next/router';

const Todo = ({id, timestamp, title, detail}) => {

  const {showAlert, setTodo} = useContext(TodoContext)
  const router = useRouter();

  const deleteTodo = async (id, e) => {
      e.stopPropagation();
      // stopPropagation은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.
      const docRef = doc(db, 'todos', id);
      await deleteDoc(docRef)
      showAlert('error',`할 일 "${title}" 가 삭제되었습니다.`)
  }

  const seeMore = (id, e) => {
    e.stopPropagation();      
    // stopPropagation은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.
    router.push(`/todos/${id}`)
  }

  return (
    <ListItem onClick={()=> setTodo({id, title, detail, timestamp})}
      sx={{mt:3, boxShadow: 3}}
      style={{backgroundColor: '#FAFAFA'}}
      secondaryAction={
        <>
          <Tooltip title="삭제" >
            <IconButton onClick={e => deleteTodo(id,e)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="상세">
            <IconButton onClick={e =>seeMore(id, e)}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <ListItemText 
        primary={title}
        secondary={moment(timestamp).format('YY년 MM월 DD일, A h시 m분')}
      />
    </ListItem>
  )
}

export default Todo

//-------------------------------------------------

// import { IconButton, ListItem, ListItemText, Tooltip } from "@mui/material"
// import moment from "moment"
// import DeleteIcon from '@mui/icons-material/Delete';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { db } from "../firebase";
// import { deleteDoc, doc } from "firebase/firestore";
// import { useContext } from "react";
// import { TodoContext } from "../pages/TodoContext";
// import {useRouter} from 'next/router';

// const Todo = ({id, timestamp, title, detail}) => {

//   const {showAlert, setTodo} = useContext(TodoContext)
//   const router = useRouter();

//   const deleteTodo = async (id, e) => {
//       e.stopPropagation();
//       // stopPropagation은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.
//       const docRef = doc(db, 'todos', id);
//       await deleteDoc(docRef)
//       showAlert('error',`할 일 "${title}" 가 삭제되었습니다.`)
//   }

//   const seeMore = (id, e) => {
//     e.stopPropagation();      
//     // stopPropagation은 부모태그로의 이벤트 전파를 stop 중지하라는 의미입니다.
//     router.push(`/todos/${id}`)
//   }

//   return (
//     <ListItem onClick={()=> setTodo({id, title, detail, timestamp})}
//       sx={{mt:3, boxShadow: 3}}
//       style={{backgroundColor: '#FAFAFA'}}
//       secondaryAction={
//         <>
//           <Tooltip title="삭제" >
//             <IconButton onClick={e => deleteTodo(id,e)}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="상세">
//             <IconButton onClick={e =>seeMore(id, e)}>
//               <MoreVertIcon />
//             </IconButton>
//           </Tooltip>
//         </>
//       }
//     >
//       <ListItemText 
//         primary={title}
//         secondary={moment(timestamp).format('YY년 MM월 DD일, A h시 m분')}
//       />
//     </ListItem>
//   )
// }

// export default Todo
