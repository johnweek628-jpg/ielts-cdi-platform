'use client'

export default function Sidebar() {
  return (
    <aside className="sidebar bg-black text-white p-4">
      <h2 className="text-lg font-bold mb-4">Menu</h2>

      <ul className="space-y-2">
        <li>Listening Tests</li>
        <li>Reading Tests</li>
        <li>Writing Tests</li>
        <li>Speaking Tests</li>
      </ul>
    </aside>
  )
}