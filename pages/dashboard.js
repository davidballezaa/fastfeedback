import EmptyState from '../components/EmptyState'
import AddSiteModal from '../components/AddSiteModal'
import { useAuth } from '../lib/auth'

function Dashboard() {
  const authObj = useAuth()
  if (!authObj.user) {
    return 'Loading...'
  }

  return <EmptyState />
}

export default Dashboard
