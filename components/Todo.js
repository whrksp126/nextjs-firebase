import { IconButton, ListItem, ListItemText } from "@mui/material"
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
      showAlert('error',`Todo with id ${id} deleted successfully`)
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
          <IconButton onClick={e => deleteTodo(id,e)}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={e =>seeMore(id, e)}>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText 
        primary={title}
        secondary={moment(timestamp).format('MMMM do, yyyy')}
      />
    </ListItem>
  )
}

export default Todo
