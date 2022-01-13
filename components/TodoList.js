import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {useAuth} from "../Auth";
import Todo from "./Todo";

const TodoList = ({todosProps}) => {
  const [todos, setTodos] = useState([]);
  const {currentUser} = useAuth();
  useEffect(()=> {
      setTodos(JSON.parse(todosProps))
    },[])
  useEffect(()=>{
    const collectionRef = collection(db, 'todos');
    // 데이터 베이스에서 todos라는 콜렌션을 참조 하겠다.
    const q = query(collectionRef, where('email', "==", currentUser?.email), orderBy('timestamp','desc'));
    // 콜렉션에 대한 쿼리 만들기
    // orderBy를 이요하여 timestamp를 기준으로 정렬 하겠다. desc는 고정
    // where을 이용하여 현재 user의 email과 같은 collection만을 반환한다.
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

//---------------------------------------

// import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { db } from "../firebase";
// import {useAuth} from "../Auth";
// import Todo from "./Todo";

// const TodoList = ({todosProps}) => {
//   const [todos, setTodos] = useState([]);
//   const {currentUser} = useAuth();
//   useEffect(()=> {
//       setTodos(JSON.parse(todosProps))
//     },[])
//   useEffect(()=>{
//     const collectionRef = collection(db, 'todos');
//     // 데이터 베이스에서 todos라는 콜렌션을 참조 하겠다.
//     const q = query(collectionRef, where('email', "==", currentUser?.email), orderBy('timestamp','desc'));
//     // 콜렉션에 대한 쿼리 만들기
//     // orderBy를 이요하여 timestamp를 기준으로 정렬 하겠다. desc는 고정
//     // where을 이용하여 현재 user의 email과 같은 collection만을 반환한다.
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       // onSnapshot 쿼리 결과를 수신 대기할 수 있습니다. 쿼리 스냅샷이 만들어집니다. 
//       setTodos(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
//     });
//     return unsubscribe;
//   }, [])
//   return (
//     <div>
//       {todos.map(todo => <Todo key={todo.id} 
//         id={todo.id}
//         title={todo.title}
//         detail={todo.detail}
//         timestamp={todo.timestamp}
//       />)}
//     </div>
//   )
// }

// export default TodoList