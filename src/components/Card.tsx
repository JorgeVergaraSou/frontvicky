import React from 'react'

interface CardProps {
  imageUrl: string
  petName: string
  dateLost: string
  petDescription: string
  petTags?: string[]
}

export const Card: React.FC<CardProps> = ({
  imageUrl,
  petName,
  petDescription,
  petTags
}) => {
  return (
    <>
      <div className='rounded overflow-hidden shadow-lg'>
        <img className='w-full' src={imageUrl} alt={petName} />
        <div className='px-6 py-4'>
          <div id='card-title' className='font-bold text-xl mb-2'>
            {petName}
          </div>
          <p className='text-gray-700 text-base'>{petDescription}</p>
        </div>
        {petTags !== undefined && (
          <div className='px-6 pt-4 pb-2'>
            {petTags.map(tag => (
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
