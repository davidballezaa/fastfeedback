import { database } from '../../lib/db'
import { collection, getDocs } from 'firebase/firestore'

export default async function handler(req, res) {
  let sites = []
  const querySnapshot = await getDocs(collection(database, 'sites'))
  querySnapshot.forEach(doc => {
    sites.push({
      siteId: doc.id,
      ...doc.data()
    })
  })
  res.status(200).json({ sites })
}
