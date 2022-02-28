import { getApps, initializeApp } from 'firebase/app'

import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import React, { createContext, useState, useEffect, useContext } from 'react'

const firebaseConfig = {
  apiKey: 'AIzaSyAhiENGlR5KVUQNipusxqOL3AgO6xXt8xE',
  authDomain: 'fast-feedback-demo-75fac.firebaseapp.com',
  projectId: 'fast-feedback-demo-75fac',
  storageBucket: 'fast-feedback-demo-75fac.appspot.com',
  messagingSenderId: '835704604833',
  appId: '1:835704604833:web:7a1b6f5b5c42686f0808e0'
}

if (getApps().length < 1) {
  initializeApp(firebaseConfig)
}

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
      const user = result.user
      setUser(formatUser(user))
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
