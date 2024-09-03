import Link from 'next/link';
import Logo from './Logo';
const Navbar = () => {
  return (
    <nav className='py-4 md:py-6 border-b'>
      <div className='container mx-auto flex items-center justify-between gap-x-6'>
        <Logo />
        <div>
          <Link
            className='bg-sky-400 hover:bg-red-500 text-white py-2 px-4 rounded-md'
            href={'/graffiti'}>
            {' '}
            Add New Graffiti{' '}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
