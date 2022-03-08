import { Flex, Button, Heading, Text } from '@chakra-ui/react'

const FreePlanEmptyState = () => {
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="8px"
      p={8}
      justify="center"
      align="center"
      direction="column"
    >
      <Heading size="md">Get feedback on your site instantly.</Heading>
      <Text>Start today, then grow with us 🌱</Text>
      <Button>Upgrade to starter</Button>
    </Flex>
  )
}

export default FreePlanEmptyState
