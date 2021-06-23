import { createContext, ReactNode, useEffect, useState } from "react"
import { auth,firebase } from "../services/firebase"

type AuthContextType = {
  user: User | undefined;
  signinWithGoogle(): Promise<void>;
}

type User = {
  id: string;
  name: string
  avatar?: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, uid, photoURL} = user

        if(!displayName) {
          throw new Error(`Missing name from Google account`)
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL || `https://ui-avatars.com/api/?name=${displayName}&rounded=true`
        })
      }
    })

    return () => {unsubscribe()}
  }, [])

  async function signinWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const result = await auth.signInWithPopup(provider)
    if(result.user) {
      const {displayName, uid, photoURL} = result.user

      if(!displayName) {
        throw new Error(`Missing name from Google account`)
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL || `https://ui-avatars.com/api/?name=${displayName}&rounded=true`
      })
    }
  }
  return (
      <AuthContext.Provider value={{user, signinWithGoogle}} {...props} />

  )
}