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

export async function getAllFeedback(siteId) {
  try {
    const q = query(
      collection(database, 'feedback'),
      where('siteId', '==', siteId)
    )
    let feedback = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc => {
      feedback.push({
        feedbackId: doc.id,
        ...doc.data()
      })
    })
    feedback.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
    )
    return { feedback }
  } catch (error) {
    return { error }
  }
}

export async function getAllSites() {
  try {
    let sites = []
    const querySnapshot = await getDocs(collection(database, 'sites'))
    querySnapshot.forEach(doc => {
      sites.push({
        siteId: doc.id,
        ...doc.data()
      })
    })
    return { sites }
  } catch (error) {
    return { error }
  }
}

export async function getUserSites(userId) {
  const q = query(
    collection(database, 'sites'),
    where('authorId', '==', userId)
  )
  let sites = []
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc => {
    sites.push({
      siteId: doc.id,
      ...doc.data()
    })
  })
  sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
  )
  return sites
}
