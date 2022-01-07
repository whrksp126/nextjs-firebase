import { createContext, useContext, useEffect } from "react";
import {getAuth} from 'firebase/auth';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const auth = getAuth()
    console.log('auth는  ', auth)
    return auth.onIdTokenChanged(async(user)=>{
      // 로그인, 로그아웃 및 토큰 새로 고침 이벤트를 포함하여 로그인한
      // 사용자의 ID 토큰에 대한 변경 사항을 관찰하는 사람을 추가합니다.
      if(!user){
        console.log('no user')
        return;
      }
      const token = await user.getIdToken();
      // firebase 서비스에서 사용자를 식별하는데 사용되는 jwt(JSON Web Token)를 반환합니다.
      // 만료되지 않은 경우 현재 토큰을 반환합니다. 그러지 않으면 토큰을 새로 고치고 새 토큰을 반환합니다.
      console.log('token',token)
      console.log('user',user)
    })
  }, [])
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext)