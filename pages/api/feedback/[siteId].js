import { getAllFeedback } from '../../../lib/db'

export default async (req, res) => {
  const { siteId } = req.query
  const { feedback, error } = await getAllFeedback(siteId)
  if (error) {
    res.status(500).json({ error })
  }
  res.status(200).json({ feedback })
}
