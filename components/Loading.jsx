import React from 'react';

const Loading = () => {
  return (
    <div className=''>
      <div className='relative flex w-12  h-12'>
        {/* Outer Ring*/}
        {/* <div
          className='w-12 h-12 rounded-full absolute top-0 left-0
                          border-8 border-dashed border-gray-200'
        /> */}
        {/* Inner Ring */}
        <div
          className='w-12 h-12  top-[50%] left-[50%] rounded-full animate-spin fixed
                          border-8 border-dashed border-purple-500 border-t-transparent'
        />
      </div>
    </div>
  );
};

export default Loading;
