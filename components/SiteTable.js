import { Box, Link } from '@chakra-ui/react'
import { Table, Tr, Td, Th } from './Table'

const SiteTable = ({ sites }) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date added</Th>
        </Tr>
      </thead>
      <tbody>
        {sites.map(site => (
          <Box as="tr" key={site.url}>
            <Td>{site.name}</Td>
            <Td>{site.url}</Td>
            <Td>
              <Link>View Feedback</Link>
            </Td>
            <Td>{site.createdAt}</Td>
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

export default SiteTable
