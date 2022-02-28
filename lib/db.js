import { app } from './firebase'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const database = getFirestore()

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
