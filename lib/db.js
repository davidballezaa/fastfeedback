import { app } from './firebase'
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc
} from 'firebase/firestore'

export const database = getFirestore()

export async function createUser(uid, data) {
  await setDoc(
    doc(database, 'users', uid),
    {
      uid: uid,
      ...data
    },
    { merge: true }
  )
}

export async function createSite(data) {
  await addDoc(collection(database, 'sites'), data)
}
