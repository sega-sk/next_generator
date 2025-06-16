'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Config {
  apiUrl: string
  method: string
  displayType: string
  itemsPerView: number
  fields: Array<{ key: string; label: string; type: string }>
}

const mockData = [
  { id: 1, title: '2024 BMW M3', price: 75000, make: 'BMW', year: 2024, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', category: 'Luxury' },
  { id: 2, title: '2023 Audi A4', price: 45000, make: 'Audi', year: 2023, image: 'https://images.unsplash.com/photo-1549927681-6531af2d31d4?w=400', category: 'Luxury' },
  { id: 3, title: '2024 Tesla Model S', price: 95000, make: 'Tesla', year: 2024, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400', category: 'Electric' },
  { id: 4, title: '2023 Mercedes C-Class', price: 55000, make: 'Mercedes', year: 2023, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400', category: 'Luxury' },
  { id: 5, title: '2024 Ford Mustang', price: 35000, make: 'Ford', year: 2024, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400', category: 'Sports' }
]

export default function Preview({ config }: { config: Config }) {
  const [activeTab, setActiveTab] = useState('Luxury')
  
  const formatValue = (value: any, type: string) => {
    switch (type) {
      case 'currency':
        return `$${value?.toLocaleString()}`
      case 'number':
        return value?.toString()
      case 'image':
        return value
      default:
        return value?.toString()
    }
  }

  const renderCard = (item: any) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {config.fields.find(f => f.type === 'image') && (
        <img 
          src={item.image || 'https://via.placeholder.com/400x250'} 
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        {config.fields.filter(f => f.type !== 'image').map(field => (
          <div key={field.key} className="mb-2">
            {field.type === 'currency' ? (
              <div className="text-2xl font-bold text-primary">
                {formatValue(item[field.key], field.type)}
              </div>
            ) : field.key === 'title' ? (
              <h3 className="text-lg font-semibold text-gray-900">{item[field.key]}</h3>
            ) : (
              <p className="text-gray-600">
                <span className="font-medium">{field.label}:</span> {formatValue(item[field.key], field.type)}
              </p>
            )}
          </div>
        ))}
        <button className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  )

  const renderSlider = () => (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: Math.min(2, config.itemsPerView) },
        768: { slidesPerView: Math.min(3, config.itemsPerView) },
        1024: { slidesPerView: config.itemsPerView }
      }}
      className="w-full"
    >
      {mockData.map(item => (
        <SwiperSlide key={item.id}>
          {renderCard(item)}
        </SwiperSlide>
      ))}
    </Swiper>
  )

  const renderTabs = () => {
    const categories = [...new Set(mockData.map(item => item.category))]
    return (
      <div>
        <div className="flex space-x-4 mb-6 border-b">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`py-2 px-4 font-medium border-b-2 ${
                activeTab === category
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: Math.min(2, config.itemsPerView) },
            768: { slidesPerView: Math.min(3, config.itemsPerView) },
            1024: { slidesPerView: config.itemsPerView }
          }}
          className="w-full"
        >
          {mockData.filter(item => item.category === activeTab).map(item => (
            <SwiperSlide key={item.id}>
              {renderCard(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    )
  }

  const renderMegaMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockData.slice(0, 6).map(item => (
        <div key={item.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
          <div>
            <h4 className="font-semibold text-gray-900">{item.title}</h4>
            <p className="text-primary font-bold">${item.price.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  )

  const renderList = () => (
    <div className="space-y-4">
      {mockData.map(item => (
        <div key={item.id} className="flex items-center space-x-6 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            <div className="flex space-x-4 text-gray-600 mt-1">
              <span>{item.make}</span>
              <span>{item.year}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">${item.price.toLocaleString()}</div>
            <button className="mt-2 bg-primary text-white px-4 py-1 rounded hover:bg-blue-700">
              Details
            </button>
          </div>
        </div>
      ))}
    </div>
  )

  const renderFullSlider = () => (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-96"
    >
      {mockData.map(item => (
        <SwiperSlide key={item.id}>
          <div className="relative w-full h-full">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">{item.title}</h2>
                <p className="text-2xl mb-4">${item.price.toLocaleString()}</p>
                <button className="bg-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Preview - {config.displayType}</h3>
        <p className="text-gray-600">API: {config.apiUrl} ({config.method})</p>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        {config.displayType === 'slider' && renderSlider()}
        {config.displayType === 'tabs' && renderTabs()}
        {config.displayType === 'megamenu' && renderMegaMenu()}
        {config.displayType === 'list' && renderList()}
        {config.displayType === 'fullslider' && renderFullSlider()}
      </div>
    </div>
  )
}