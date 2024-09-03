import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href='/'>
      <Image
        priority={true}
        className='max-w-[100px] md:max-w-[100px] '
        src='/logo.svg'
        alt='artlit-logo'
        height={35}
        width={100}
      />
    </Link>
  );
};

export default Logo;
