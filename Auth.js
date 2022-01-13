import { createContext, useContext, useEffect, useState } from "react";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import Loading from "./components/Loading";
import Login from "./components/Login";
import nookies from 'nookies'
import {auth} from './firebase'

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
  useEffect(() => {
    const auth = getAuth()
    console.log('auth는  ', auth)
    return auth.onIdTokenChanged(async(user)=>{
      // 로그인, 로그아웃 및 토큰 새로 고침 이벤트를 포함하여 로그인한
      // 사용자의 ID 토큰에 대한 변경 사항을 관찰하는 사람을 추가합니다.
      if(!user){
        console.log('사용자 없음')
        setCurrentUser(null);
        setLoading(false)
        // nookies.set(undefined, '', token, {});
        console.log(token)
        return;
      }
      const token = await user.getIdToken();
      // firebase 서비스에서 사용자를 식별하는데 사용되는 jwt(JSON Web Token)를 반환합니다.
      // 만료되지 않은 경우 현재 토큰을 반환합니다. 그러지 않으면 토큰을 새로 고치고 새 토큰을 반환합니다.
      setCurrentUser(user);
      setLoading(false);
      nookies.set(undefined,'token',token,{})
      console.log('토큰',token)
      console.log('사용자',user)
    })
  }, [])

  if(loading) {
    return <Loading type="bubbles" color="yellowgreen" />;
  }

  if(!currentUser) {
    return (
      <AuthContext.Provider value={{currentUser,signUp, logIn}}>
        <Login />
      </AuthContext.Provider>
      )
  } else {
    return (
      <AuthContext.Provider value={{currentUser}}>
        {children}
      </AuthContext.Provider>
    )
  }


}

export const useAuth = () => useContext(AuthContext)

//-------------------------------------------------------

// import { createContext, useContext, useEffect, useState } from "react";
// import {getAuth} from 'firebase/auth';
// import Loading from "./components/Loading";
// import Login from "./components/Login";
// import nookies from 'nookies'

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {

//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const auth = getAuth()
//     console.log('auth는  ', auth)
//     return auth.onIdTokenChanged(async(user)=>{
//       // 로그인, 로그아웃 및 토큰 새로 고침 이벤트를 포함하여 로그인한
//       // 사용자의 ID 토큰에 대한 변경 사항을 관찰하는 사람을 추가합니다.
//       if(!user){
//         console.log('사용자 없음')
//         setCurrentUser(null);
//         setLoading(false)
//         // nookies.set(undefined, '', token, {});
//         console.log(token)
//         return;
//       }
//       const token = await user.getIdToken();
//       // firebase 서비스에서 사용자를 식별하는데 사용되는 jwt(JSON Web Token)를 반환합니다.
//       // 만료되지 않은 경우 현재 토큰을 반환합니다. 그러지 않으면 토큰을 새로 고치고 새 토큰을 반환합니다.
//       setCurrentUser(user);
//       setLoading(false);
//       nookies.set(undefined,'token',token,{})
//       console.log('토큰',token)
//       console.log('사용자',user)
//     })
//   }, [])
//   if(loading) {
//     return <Loading type="bubbles" color="yellowgreen" />;
//   }
//   if(!currentUser) {
//     return <Login />
//   } else {
//     return (
//       <AuthContext.Provider value={{currentUser}}>
//         {children}
//       </AuthContext.Provider>
//     )
//   }
// }

// export const useAuth = () => useContext(AuthContext)
