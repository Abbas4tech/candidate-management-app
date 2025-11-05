import { useState } from 'react'
import './App.css'
import { Sidebar } from './components/Sidebar'

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="min-h-screen bg-[#f7f8f7]">
      {/* Page Title */}
      <h1 className="text-[34.59px] font-normal text-[#15372c] px-6 pt-4 pb-3 leading-[46.67px]">All Candidates</h1>

      <div className="flex">
        {/* Sidebar - Pre-built component with search, toggle, dropdown */}
        <Sidebar searchValue={searchValue} onSearchChange={setSearchValue} />

        {/* Main Content */}
        <main className="flex-1 px-6">
          {/* TODO: Add action buttons here (Generate Report, + Add Candidate, Bulk Actions) */}
          {/* TODO: Add candidate list here */}
          {/* TODO: Add pagination here */}
        </main>
      </div>
    </div>
  )
}

export default App
