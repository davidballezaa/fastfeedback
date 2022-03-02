import { Box, Skeleton } from '@chakra-ui/react'
import { Table, Tr, Th, Td } from './Table'

const SkeletonRow = ({ width }) => {
  return (
    <Box as="tr">
      <Td>
        <Skeleton height="10px" width={width} my={4}></Skeleton>
      </Td>
      <Td>
        <Skeleton height="10px" width={width} my={4}></Skeleton>
      </Td>
      <Td>
        <Skeleton height="10px" width={width} my={4}></Skeleton>
      </Td>
      <Td>
        <Skeleton height="10px" width={width} my={4}></Skeleton>
      </Td>
    </Box>
  )
}

const SiteTableSkeleton = () => {
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
        <SkeletonRow width="75px" />
        <SkeletonRow width="125px" />
        <SkeletonRow width="50px" />
        <SkeletonRow width="100px" />
        <SkeletonRow width="75px" />
      </tbody>
    </Table>
  )
}

export default SiteTableSkeleton
