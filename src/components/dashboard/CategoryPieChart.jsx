import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#1F7A5C', '#2E6F8E', '#A8E063', '#69BD8D', '#478BA0', '#0F3D2E', '#9DD6B4', '#255A73', '#C4EA7D']

export default function CategoryPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3} cornerRadius={6}>
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 8px 24px rgba(15,33,25,0.12)' }}
          formatter={(value, name) => [`${value} kg CO₂e`, name]}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, opacity: 0.7 }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
