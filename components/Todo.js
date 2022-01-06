import { IconButton, ListItem, ListItemText } from "@mui/material"
import moment from "moment"
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { TodoContext } from "../pages/TodoContext";

const Todo = ({id, timestamp, title, detail}) => {

  const {showAlert, setTodo} = useContext(TodoContext)

  const deleteTodo = async (id, e) => {
      e.stopPropagation();
      const docRef = doc(db, 'todos', id);
      await deleteDoc(docRef)
      showAlert('error',`Todo with id ${id} deleted successfully`)
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
          <IconButton>
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
