import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import Feedback from '../../components/Feedback'
import { useAuth } from '../../lib/auth'
import { createFeedback, getAllFeedback, getAllSites } from '../../lib/db'

export async function getStaticProps(context) {
  const { siteId } = context.params
  const { feedback } = await getAllFeedback(siteId)
  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 5
  }
}

export async function getStaticPaths() {
  const { sites } = await getAllSites()
  const paths = sites.map(site => ({
    params: {
      siteId: site.siteId
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export default function SiteFeedback({ initialFeedback }) {
  const auth = useAuth()
  const router = useRouter()
  const [allFeedback, setAllFeedback] = useState(initialFeedback)

  const handleSubmit = event => {
    event.preventDefault()
    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      siteId: router.query.siteId,
      status: 'pending',
      text: event.target.feedback.value
    }

    setAllFeedback([newFeedback, ...allFeedback])
    createFeedback(newFeedback)
  }

  return (
    <Box display="flex" flexDirection="column" maxWidth="700px" margin="0 auto">
      <Box as="form" onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="feedback">Feedback</FormLabel>
          <Input id="feedback" name="feedback" type="text" />
        </FormControl>
        <Button type="submit" mt={2}>
          Add Comment
        </Button>
      </Box>
      {allFeedback.map(feedback => (
        <Feedback key={feedback.feedbackId} {...feedback} />
      ))}
    </Box>
  )
}
