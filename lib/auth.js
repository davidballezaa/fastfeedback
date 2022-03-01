import { app } from './firebase'

import { createUser } from './db'

import {
  getAuth,
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import React, { createContext, useState, useEffect, useContext } from 'react'

const authContext = createContext()

export function AuthProvider({ children }) {
  const authObj = useProvideAuth()
  return <authContext.Provider value={authObj}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const auth = getAuth()
  const provider = new GithubAuthProvider()

  const signinWithGithub = () => {
    return signInWithPopup(auth, provider).then(result => {
      // The signed-in user info.
      const newUser = formatUser(result.user)
      createUser(newUser.uid, newUser)
      setUser(newUser)
      return user
    })
  }

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(false)
    })
  }

  const formatUser = user => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(formatUser(currentUser))
    })

    return unsubscribe()
  }, [])

  return {
    user,
    signinWithGithub,
    signout
  }
}
