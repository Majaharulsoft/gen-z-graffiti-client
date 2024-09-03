'use client';
import { useEffect, useState } from 'react';
import PhotoCard from './PhotoCard';
import Loading from './Loading';
import LoadingBtn from './LoadingBtn';
import Link from 'next/link';

const pinPost = [
  {
    art_image_id: 1,
    artist_id: 1,
    image: 'uploads/1723626459726-mainImg.jpg',
    photographer: '',
    uploaded_by: '',
    related_images: null,
    location: 'Dhaka',
    image_description: 'We don’t want syndication',
    like_count: 0,
    love_count: 16,
    view_count: 365,
    artist_name: 'Majedul Hasan',
    co_artist_name: 'Unknown ',
    age: 28,
    gender: 'Male',
    profile_pic: 'uploads/1723626459724-profilePic.jpg',
    profession: 'job',
  },
  {
    art_image_id: 2,
    artist_id: 2,
    image: 'uploads/1723626664917-mainImg.jpg',
    photographer: '',
    uploaded_by: '',
    related_images: null,
    location: 'Dhaka',
    image_description: 'Something went wrong.',
    like_count: 0,
    love_count: 11,
    view_count: 231,
    artist_name: 'Saad Adnan',
    co_artist_name: 'Majedul',
    age: 28,
    gender: 'Male',
    profile_pic: 'uploads/1723626664914-profilePic.jpg',
    profession: 'job',
  },
];

const PhotoList = () => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [offset, setOffset] = useState(1);

  const loadMorePhotos = async (offset) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://dev-server.artlit.com.bd/api/photos?limit=10&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      // Select photos with art_image_id 1 and 2 to pin at the top
      // const pinnedPhotos = data.filter(
      //   (photo) => photo.art_image_id === 1 || photo.art_image_id === 2
      // );

      // Remove pinned photos from the original data
      // const remainingPhotos = data.filter(
      //   (photo) => photo.art_image_id !== 1 && photo.art_image_id !== 2
      // );

      // Sort the remaining photos by art_image_id in descending order
      // const sortedPhotos = remainingPhotos.sort(
      //   (a, b) => b.art_image_id - a.art_image_id
      // );

      // Combine pinned photos with the sorted photos
      // const finalPhotos = [...pinnedPhotos, ...sortedPhotos];

      // Append combined photos to the existing list
      setPhotos(() => {
        return [...data?.data];
      });
      // setOffset(data?.page);

      // Increment the offset for the next batch of photos
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const loadImg = async (offset) => {
      try {
        const response = await fetch(
          `https://dev-server.artlit.com.bd/api/photos?limit=10&offset=${offset}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        setPhotos(() => {
          return [...data?.data];
        });
        // setOffset(data?.page);

        // Increment the offset for the next batch of photos
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadImg(1);
    return () => {
      console.log('first', photos);
      setPhotos([]);
      console.log('second', photos);
    };
  }, []);

  const handleNext = () => {
    const nnn = offset + 1;

    console.log('Aoffset', offset, nnn);
    setOffset(nnn);
    console.log(offset);
    loadMorePhotos(nnn);
  };
  const handlePrev = () => {
    setOffset(offset - 1);
    loadMorePhotos();
  };

  // window.addEventListener('scroll', handleScroll);
  // return () => window.removeEventListener('scroll', handleScroll);

  return (
    <div>
      <div className='img-grid'>
        {/* Display loading spinner at the top if still loading */}

        {/* Render the pin post */}
        {pinPost.map((photo) => (
          <PhotoCard
            key={photo.art_image_id}
            photo={photo}
          />
        ))}
        {/* Render the list of photos */}
        {photos.length > 0 &&
          photos.map((photo) => (
            <PhotoCard
              key={photo.art_image_id}
              photo={photo}
            />
          ))}
        {/* Show a loading button and message when loading more photos */}
        {/* {loading && (
          <div className='flex justify-center items-center mx-w-40 my-4'>
            <LoadingBtn /> <span>Loading...</span>
          </div>
        )} */}
      </div>
      {loading && <Loading />}
      <>
        <div className='container mx-auto px-4 my-10'>
          <nav
            className='flex flex-row flex-nowrap justify-between md:justify-center items-center'
            aria-label='Pagination'>
            {offset > 1 ? (
              <Link
                onClick={handlePrev}
                className='flex w-32  h-10 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300'
                href='#'
                title='Previous Page'>
                <span className='sr-only'>Previous Page </span>
                <span>
                  <svg
                    className='block w-4 h-4 fill-current'
                    viewBox='0 0 256 512'
                    aria-hidden='true'
                    role='presentation'>
                    <path d='M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z'></path>
                  </svg>
                </span>
                <span className='pl-4'>Previous </span>{' '}
              </Link>
            ) : (
              <button
                className='flex w-32  h-10 mr-1 justify-center cursor-not-allowed items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300'
                title='Previous Page'>
                <span className='sr-only'>Previous Page </span>
                <span>
                  <svg
                    className='block w-4 h-4 fill-current'
                    viewBox='0 0 256 512'
                    aria-hidden='true'
                    role='presentation'>
                    <path d='M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z'></path>
                  </svg>
                </span>
                <span className='pl-4'>Previous </span>{' '}
              </button>
            )}

            <Link
              className='flex w-32 h-10 ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300'
              href='#'
              onClick={handleNext}
              title='Next Page'>
              <span className='sr-only'>Next Page</span>
              <span className='pr-4'>Next </span>{' '}
              <span>
                <svg
                  className='block w-4 h-4 fill-current'
                  viewBox='0 0 256 512'
                  aria-hidden='true'
                  role='presentation'>
                  <path d='M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z'></path>
                </svg>
              </span>
            </Link>
          </nav>
        </div>
      </>
    </div>
  );
};

export default PhotoList;
