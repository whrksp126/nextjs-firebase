import React, {useState} from 'react'
import { Button, Grid, TextField } from "@mui/material"
import { useRouter } from "next/router";
import { useAuth } from '../../Auth'

const SingupPage = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassworrdError] = useState(false);


  const {signUp} = useAuth()
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    setNameError(false)
    setEmailError(false)
    setPassworrdError(false)
    setError('');
    if(name === '') {setNameError(true)}
    if(email === ''){setEmailError(true)}
    if(password === ''){setPassworrdError(true)}
    if(name && email && password ){console.log('name은', name, 'Email은', email, 'Password는', password)}
    if(email !== "" && password !== ""&& name !== ""){
      console.log('다 입력했음')
      try {
        await signUp(email, password);
        router.push('/');
        console.log('회원가입 완료')
      } catch (err) {
        setError(err.message);
      }
    }
  }

  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{minHeight: '100vh'}}>
      <h1>회원 가입</h1>

      {/* Email, passward input */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          id="name"
          type="string" 
          label="이름" 
          variant="outlined" 
          fullWidth
          required
          onChange={(e)=>setName(e.target.value)}
          error={nameError}
        />
        <TextField 
          id="email"
          type="email" 
          label="이메일" 
          variant="outlined" 
          fullWidth
          required
          onChange={(e)=>setEmail(e.target.value)}
          error={emailError}
        />
        <TextField 
          id="password"
          type="password" 
          label="비밀번호" 
          variant="outlined" 
          fullWidth
          required
          onChange={(e)=>setPassword(e.target.value)}
          error={passwordError}
        />        

      <Button
        type="submit"
        variant="contained" 
        >
        가입 하기
      </Button>
      </form>
      이미 가입한 계정이 있으시다구요?!
      <Button
        variant="contained" 
        onClick={()=>props.setSignUp(false)}
        >
        로그인 하러 가기
      </Button>

      </Grid>
    </>
  )
}

export default SingupPage
