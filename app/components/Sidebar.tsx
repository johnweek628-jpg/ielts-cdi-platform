'use client'

type SidebarProps = {
  sidebarOpen: boolean
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  return (
    <aside className="sidebar bg-black text-white p-4">
      <h2 className="text-lg font-bold mb-4">
        {sidebarOpen ? "Menu" : "M"}
      </h2>

      <ul className="space-y-2">
        <li>{sidebarOpen ? "Listening Tests" : "L"}</li>
        <li>{sidebarOpen ? "Reading Tests" : "R"}</li>
        <li>{sidebarOpen ? "Writing Tests" : "W"}</li>
        <li>{sidebarOpen ? "Speaking Tests" : "S"}</li>
      </ul>
    </aside>
  )
}