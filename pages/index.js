import Head from 'next/head'
import { Button, Code, Heading, Text } from '@chakra-ui/react'

import { useAuth } from '../lib/auth'

export default function Home() {
  const auth = useAuth()
  return (
    <>
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <main>
        <Heading as="h1" size="4xl">
          Fast Feedback
        </Heading>

        <Text>
          Current user: <Code>{auth.user ? auth.user.email : 'None'}</Code>
        </Text>

        <div>{auth?.user?.email}</div>
        {auth.user ? (
          <Button onClick={e => auth.signout()}>Sign Out</Button>
        ) : (
          <Button onClick={e => auth.signinWithGithub()}>Sign In</Button>
        )}
      </main>
    </>
  )
}
