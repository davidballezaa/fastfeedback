import { Flex, Heading, Text } from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'

const EmptyState = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={16}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="md">You have not added any sites.</Heading>
      <Text>Welcome, let&apos;s get started</Text>
      <AddSiteModal>Add Site</AddSiteModal>
    </Flex>
  )
}

export default EmptyState
