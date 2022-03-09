import EmptyState from '../components/EmptyState'
import DashboardShell from '../components/DashboardShell'
import SiteTableSkeleton from '../components/SiteTableSkeleton'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import SiteTable from '../components/SiteTable'

function Dashboard() {
  const { data } = useSWR('/api/sites', fetcher)

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  )
}

export default Dashboard
