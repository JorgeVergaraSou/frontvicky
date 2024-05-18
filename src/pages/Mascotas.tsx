import React from 'react'
import { Card } from '../components/components'

interface Pet {
  id: number
  name: string
  dateLost: string
  description: string
  imageUrl: string
  tags: [breed: string, age: string]
}

const mascotasData: Pet[] = [
  {
    id: 1,
    name: 'Luna',
    dateLost: '',
    description: '',
    imageUrl: 'https://example.com/luna.jpg',
    tags: ['Golden Retriever', '3 años']
  },
  {
    id: 2,
    name: 'Max',
    dateLost: '',
    description: '',
    imageUrl: 'https://example.com/max.jpg',
    tags: ['German Shepherd', '5 años']
  }
  // Agrega más mascotas si lo deseas
]

export const Mascotas: React.FC = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Mascotas</h1>
        <div className='mascotas-container flex flex-wrap gap-4 p-justify-center'>
          {mascotasData.map(pet => (
            <Card
              imageUrl={pet.imageUrl}
              petName={pet.name}
              dateLost={pet.dateLost}
              petDescription={pet.description}
              petTags={pet.tags}
            />
            // <div
            //   key={pet.id}
            //   className='mascota-card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5'
            // >
            //   <img src={pet.imageUrl} alt={pet.name} />
            //   <h2>{pet.name}</h2>
            //   <p>Raza: {pet.breed}</p>
            //   <p>Edad: {pet.age} años</p>
            // </div>
          ))}
        </div>
      </div>
  )
}
