import { Button, Grid } from "@mui/material"
import GoogleIcon from '@mui/icons-material/Google';
import {auth, provider} from '../firebase'
import { signInWithPopup } from "firebase/auth";
const Login = ({ type,color }) => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
    // 팝업 창을 사용하여 로그인 하려면 signInWithPopup을 사용합나디.
  }
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{minHeight: '100vh'}}
    >
      <Button 
        variant="contained" 
        startIcon={<GoogleIcon/>}
        onClick={loginWithGoogle}
      >
        Sign in Google
      </Button>
    </Grid>
  )
}

export default Login
