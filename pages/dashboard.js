import EmptyState from '../components/EmptyState'
import { useAuth } from '../lib/auth'

function Dashboard() {
  const authObj = useAuth()
  if (!authObj.user) {
    return 'Loading...'
  }

  return <EmptyState />
}

export default Dashboard
