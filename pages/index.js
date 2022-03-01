import Head from 'next/head'
import { Flex, Button } from '@chakra-ui/react'

import { useAuth } from '../lib/auth'
import { LogoIcon } from '../styles/theme'

export default function Home() {
  const authObj = useAuth()

  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <LogoIcon color="black" w={16} h={16} />
      {authObj.user ? (
        <Button as="a" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <Button mt={4} size="sm" onClick={e => authObj.signinWithGitHub()}>
          Sign In
        </Button>
      )}
    </Flex>
  )
}
