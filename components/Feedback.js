import { Box, Divider, Heading, Text } from '@chakra-ui/react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

const Feedback = ({ author, text, createdAt }) => {
  return (
    <Box borderRadius={4} w="full">
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
      <Text color="gray.800">{text}</Text>
      <Divider
        borderColor="gray.200"
        backgroundColor="gray.200"
        mt={8}
        mb={8}
      />
    </Box>
  )
}

export default Feedback
