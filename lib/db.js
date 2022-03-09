import { app } from './firebase'
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import compareDesc from 'date-fns/compareDesc'
import parseISO from 'date-fns/parseISO'

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

export async function createFeedback(data) {
  await addDoc(collection(database, 'feedback'), data)
}
