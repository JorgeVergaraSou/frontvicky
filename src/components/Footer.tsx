import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className='flex-shrink-0 md:sticky md:bottom-0'>
      <div className='bg-gray-200 text-white'>
        <div className='flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4'>
          {/* Logo */}
          <div className='text-orange-500'>
            Footer
          </div>
        </div>
      </div>
    </footer>
  )
}
