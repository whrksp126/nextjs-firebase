import { Button, Grid } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import {auth, provider} from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import TextField from '@mui/material/TextField';
import LoginIcon from '@mui/icons-material/Login';
import React, {useState, createContext} from "react";
import LoginPage from '../pages/login/LoginPage'
import SingupPage from "../pages/login/SingupPage";


const Login = () => {

  const [signUp, setSignUp] = useState(false)

  return (
    signUp === false ? (
      <LoginPage signUp={signUp} setSignUp={setSignUp} />
    ) : (
      <SingupPage signUp={signUp} setSignUp={setSignUp}/>
    )
  )
}

export default Login

//---------------------------------------------------------

// import { Button, Container, Grid } from "@mui/material"
// import GoogleIcon from '@mui/icons-material/Google';
// import {auth, provider} from '../firebase'
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useRouter } from "next/router";
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

// const Login = ({ type,color }) => {
//   const router = useRouter();
//   // const loginWithGoogle = () => {
//   //   signInWithPopup(auth, provider)
//   //   // 팝업 창을 사용하여 로그인 하려면 signInWithPopup을 사용합나디.
//   // }
  
//   const loginWithGoogle = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // ...
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // ...
//       });
//   }


//   return (
//     <>
//       <Grid
//         container
//         spacing={0}
//         direction="column"
//         alignItems="center"
//         justifyContent="center"
//         style={{minHeight: '100vh'}}
//       >
//         <Button 
//           variant="contained" 
//           startIcon={<GoogleIcon/>}
//           onClick={loginWithGoogle}
//         >
//           구글 로그인
//         </Button>
//       </Grid>
//     </>
//   )
// }

// export default Login
