import { Box, Heading, Text } from '@chakra-ui/react'
import AddSiteModal from './AddSiteModal'
import DashboardShell from './DashboardShell'

const EmptyState = () => {
  return (
    <DashboardShell>
      <Box width="100%" backgroundColor="white" borderRadius="8px" p={8}>
        <Heading size="md">You have not added any sites.</Heading>
        <Text>Welcome, let&apos;s get started</Text>
        <AddSiteModal />
      </Box>
    </DashboardShell>
  )
}

export default EmptyState
