import { Button, TextField } from "@mui/material"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useContext, useEffect, useRef, useState } from "react"
import { db } from "../firebase"
import { TodoContext } from "../pages/TodoContext"

const TodoForm = () => {
  const inputAreaRef = useRef();
  const {showAlert, todo, setTodo} = useContext(TodoContext)

  const onSubmit = async () => {
    const collectionRef = collection(db, 'todos')
    const docRef = await addDoc(collectionRef, {...todo, timestamp:serverTimestamp()})
    // addDoc를 이용하여 firebase CloudStore에서 자동으로 ID를 생성함
    // 생성된 ID로 새 문서를 추가한다.
    // ...todo는 입력 받은 값이고 그 값과
    // 서버의 값으로 타임스탬프 필드 업데이트 합니다.
    setTodo({title: '', detail: ''})
    showAlert('success',`Todo with id ${docRef.title} is added successfully`)
  }

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if(!inputAreaRef.current.contains(e.target)){
        // inputAreaRef는 useRef를 실행한 값으로 current: value로 저장된다.
        // e.target은 addEventListener을 이용하여 받은 영역 값으로 
        // 클릭한 부분의 태그 값을 가르킨다.
        // inputAreaRef.current 는 ref={inputAreaRef}가 설정되어 있는 영역을 뜻 한다.    
        console.log('외부 입력 영역');
        // contains 메소드는 주어진 인자가 node의 자손인지, 아닌지에 대한 boolean 값을 리턴한다.
        // e.target이 inputAreaRef의 자손인지를 확이하여 true, false 값을 반환한다.
        setTodo({ title: '', detail: '' })
      } else {
        console.log('내부 입력 영역')
      }
    }
      document.addEventListener('mousedown', checkIfClickedOutside)
      // addEventListener를 이용하여 document에서 mouseDown이벤트가 일어날 때 그 값을
      // checkIfClickedOutside에 담아준다.
      return () => {
        document.removeEventListener('mousedown', checkIfClickedOutside)
        // removeEventListener를 이용하여 addEventListener로 등록했던 이벤트 리스너를 제거합니다.
      }
  }, [])

  return (
    <div ref={inputAreaRef}>
      {/* <pre>{JSON.stringify(todo.title)}</pre> */}
      {/* <pre>{JSON.stringify(todo, null,'\t')}</pre> */}
      <TextField 
        fullWidth 
        label="title" 
        margin="normal" 
        value={todo.title} 
        onChange={
          e => setTodo({...todo, title: e.target.value})
        } 
      />
      <TextField 
        fullWidth 
        label="detail" 
        multiline 
        maxRows={4} 
        value={todo.detail} 
        onChange={
          e => setTodo({...todo, detail: e.target.value})
        } 
      />
      <Button onClick={onSubmit} variant="contained" sx={{mt:3}}>Add a new todo</Button>
    </div>
  )
}

export default TodoForm
