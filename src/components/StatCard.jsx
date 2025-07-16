export default function StatCard({stat,id}) {
    return (<div className="stat-card">
        <div className="stat-number">{stat.val}</div>
        <div className="stat-label">{stat.name}</div>
    </div>)
}