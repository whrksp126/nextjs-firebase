import { Button, Grid, TextField } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from "react";
import { useRouter } from "next/router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

import { useAuth } from '../../Auth'

const LoginPage = (props) => {  

  const router = useRouter();
  // const loginWithGoogle = () => {
  //   signInWithPopup(auth, provider)
  //   // 팝업 창을 사용하여 로그인 하려면 signInWithPopup을 사용합나디.
  // }
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPassworrdError] = useState(false);

  const [error, setError] = useState("");
  const { logIn } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false)
    setPassworrdError(false)
    if(email === ''){setEmailError(true)}
    if(password === ''){setPassworrdError(true)}
    if(email && password){console.log('Email은', email, 'Password는', password)}
    setError('')
    try {
      await logIn(email, password);
      console.log('로그인 완료');
      router.push('/');
    } catch(err) {
      setError(err.message);
    }
  }
  return (
    <>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{minHeight: '100vh'}}>

      {/* Email, passward input */}
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
          startIcon={<LoginIcon/>}
          fullWidth
        >
          로그인
        </Button>
      </form>

        <Button 
          variant="contained" 
          startIcon={<GoogleIcon/>}
          onClick={loginWithGoogle}
        >
          구글 로그인
        </Button>
        계정이 없으신가요? 회원 가입을 진행하세요.
        <Button 
          variant="contained" 
          onClick={()=>props.setSignUp(true)}
        >
          회원 가입
        </Button>
      </Grid>
    </>
  )
}

export default LoginPage
