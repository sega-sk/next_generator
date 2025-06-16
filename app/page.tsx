'use client'
import { useState } from 'react'
import { Car, Settings, Code, Eye, Download } from 'lucide-react'
import BlockBuilder from '../components/BlockBuilder'
import Preview from '../components/Preview'
import CodeGenerator from '../components/CodeGenerator'

export default function Home() {
  const [config, setConfig] = useState({
    apiUrl: 'https://api.example.com/cars',
    method: 'GET',
    displayType: 'slider',
    itemsPerView: 3,
    fields: [
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'price', label: 'Price', type: 'currency' },
      { key: 'make', label: 'Make', type: 'text' },
      { key: 'year', label: 'Year', type: 'number' },
      { key: 'image', label: 'Image', type: 'image' }
    ]
  })

  const [activeTab, setActiveTab] = useState('builder')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Automotive Block Builder</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'builder', label: 'Builder', icon: Settings },
                { id: 'preview', label: 'Preview', icon: Eye },
                { id: 'code', label: 'Generate Code', icon: Code }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    activeTab === id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'builder' && <BlockBuilder config={config} setConfig={setConfig} />}
            {activeTab === 'preview' && <Preview config={config} />}
            {activeTab === 'code' && <CodeGenerator config={config} />}
          </div>
        </div>
      </div>
    </div>
  )
}