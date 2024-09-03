import React from 'react';

const LoadingBtn = () => {
  return (
    <div className='flex w-8  h-8'>
      {/* Outer Ring*/}
      {/* <div
          className='w-12 h-12 rounded-full absolute top-0 left-0
                          border-8 border-dashed border-gray-200'
        /> */}
      {/* Inner Ring */}

      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={24}
        height={24}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        className='lucide lucide-loader-circle  animate-spin'>
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>
    </div>
  );
};

export default LoadingBtn;
