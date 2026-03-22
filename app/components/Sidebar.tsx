'use client'

type SidebarProps = {
  sidebarOpen: boolean
}

export default function Sidebar({ sidebarOpen }: SidebarProps) {
  return (
    <aside
      className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64
        bg-black text-white p-4 z-40
        transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <h2 className="text-lg font-bold mb-4">
        {sidebarOpen ? "Menu" : "M"}
      </h2>

      <ul className="space-y-2">
        <li>Listening Tests</li>
        <li>Reading Tests</li>
        <li>Writing Tests</li>
        <li>Speaking Tests</li>
      </ul>
    </aside>
  )
}