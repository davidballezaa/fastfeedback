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

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.uid, userWithoutToken)
      setUser(user)
      return user
    } else {
      setUser(null)
      return false
    }
  }

  const signinWithGithub = () => {
    return signInWithPopup(auth, provider).then(result => {
      handleUser(result.user)
    })
  }

  const signout = () => {
    return signOut(auth).then(() => {
      handleUser(false)
    })
  }

  const formatUser = user => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0].providerId,
      photoUrl: user.photoURL,
      token: user.stsTokenManager.accessToken
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      handleUser(currentUser)
    })

    return unsubscribe()
  }, [])

  return {
    user,
    signinWithGithub,
    signout
  }
}
