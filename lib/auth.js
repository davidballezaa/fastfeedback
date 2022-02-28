import { app } from './firebase'

import { createUser } from './db'

import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import React, { createContext, useState, useEffect, useContext } from 'react'

const authContext = createContext()

export function AuthProvider({ children }) {
  const autho = useProvideAuth()
  return <authContext.Provider value={autho}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)

  console.log(user)

  const auth = getAuth()
  const provider = new GithubAuthProvider()

  const signinWithGithub = () => {
    return signInWithPopup(auth, provider).then(result => {
      // The signed-in user info.
      const user = formatUser(result.user)
      createUser(user.uid, user)
      setUser(user)
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

  return {
    user,
    signinWithGithub,
    signout
  }
}
