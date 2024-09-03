import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex justify-center items-center'>
      <Image
        src={'/404.png'}
        width={1090}
        height={720}
        alt='not found'
      />
    </div>
  );
}
