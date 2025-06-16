'use client'
import { Plus, Trash2, Move } from 'lucide-react'

interface Field {
  key: string
  label: string
  type: string
}

interface Config {
  apiUrl: string
  method: string
  displayType: string
  itemsPerView: number
  fields: Field[]
}

export default function BlockBuilder({ config, setConfig }: { config: Config, setConfig: (config: Config) => void }) {
  const addField = () => {
    setConfig({
      ...config,
      fields: [...config.fields, { key: '', label: '', type: 'text' }]
    })
  }

  const updateField = (index: number, field: Partial<Field>) => {
    const newFields = [...config.fields]
    newFields[index] = { ...newFields[index], ...field }
    setConfig({ ...config, fields: newFields })
  }

  const removeField = (index: number) => {
    setConfig({
      ...config,
      fields: config.fields.filter((_, i) => i !== index)
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API URL</label>
          <input
            type="text"
            value={config.apiUrl}
            onChange={(e) => setConfig({ ...config, apiUrl: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://api.example.com/cars"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Method</label>
          <select
            value={config.method}
            onChange={(e) => setConfig({ ...config, method: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Display Type</label>
          <select
            value={config.displayType}
            onChange={(e) => setConfig({ ...config, displayType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="slider">Simple Slider</option>
            <option value="tabs">Tabs with Slider</option>
            <option value="megamenu">Mega Menu</option>
            <option value="list">Simple List</option>
            <option value="fullslider">Full Size Slider</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Items Per View</label>
          <input
            type="number"
            min="1"
            max="6"
            value={config.itemsPerView}
            onChange={(e) => setConfig({ ...config, itemsPerView: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Data Fields</h3>
          <button
            onClick={addField}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Field
          </button>
        </div>

        <div className="space-y-4">
          {config.fields.map((field, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 rounded-lg">
              <div>
                <input
                  type="text"
                  placeholder="Field Key (e.g., title)"
                  value={field.key}
                  onChange={(e) => updateField(index, { key: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Display Label"
                  value={field.label}
                  onChange={(e) => updateField(index, { label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <select
                  value={field.type}
                  onChange={(e) => updateField(index, { type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="text">Text</option>
                  <option value="number">Number</option>
                  <option value="currency">Currency</option>
                  <option value="image">Image</option>
                  <option value="date">Date</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => removeField(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}