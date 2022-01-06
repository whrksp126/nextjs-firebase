import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Todo from "./Todo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(()=>{
    const collectionRef = collection(db, 'todos');
    // 데이터 베이스에서 todos라는 콜렌션을 참조 하겠다.
    const q = query(collectionRef, orderBy('timestamp','desc'));
    // 콜렉션에 대한 쿼리 만들기
    // orderBy를 이요하여 timestamp를 기준으로 정렬 하겠다. desc는 고정
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // onSnapshot 쿼리 결과를 수신 대기할 수 있습니다. 쿼리 스냅샷이 만들어집니다. 
      setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
    });
    return unsubscribe;
  }, [])
  return (
    <div>
      {todos.map(todo => <Todo key={todo.id} 
        id={todo.id}
        title={todo.title}
        detail={todo.detail}
        timestamp={todo.timestamp}
      />)}
    </div>
  )
}

export default TodoList
