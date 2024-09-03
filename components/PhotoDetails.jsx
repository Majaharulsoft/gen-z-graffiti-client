'use client';
// import { getDictionary } from '@/app/[lang]/disctionaries';
import { smartTrim } from '@/lib/smartTrim';
import { PHOTO_URL } from '@/lib/urls';
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NotFound from './not-found';
import Loading from './Loading';

const PhotoDetails = ({ id, lang, dictionary }) => {
  const pathname = usePathname();
  const router = useRouter();
  // console.log(pathname);
  const [photo, setPhoto] = useState({});
  const [love, setLove] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      const response = await fetch(
        `https://dev-server.artlit.com.bd/api/photos/${id}`
      );
      const photoData = await response?.json();
      if (photoData.error) {
        setError(photoData.error);
      } else {
        setPhoto(photoData);
        setLove(photoData?.love_count);
        setError(null);
      }
      setLoading(false);
    };

    fetchPhoto();

    return () => {
      setPhoto({});
    };
  }, [id]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      setFullUrl(currentUrl);
    }
  }, [router]);
  // console.log(fullUrl);

  // const dictionary = await getDictionary(lang);

  const loveHandler = () => {
    const fetchPhoto = async () => {
      const love_count = love;
      setLove((x) => x + 1);

      const response = await fetch(
        `https://dev-server.artlit.com.bd/api/photos/love/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const photoData = await response.json();
      if (photoData.changedRows) {
        alert('You have loved this photo.');
        setLove(love_count + 1);
        return;
      }
      setLove(love_count);
    };

    fetchPhoto();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : !loading && error ? (
        <NotFound />
      ) : (
        <div className='grid grid-cols-12 gap-4 2xl:gap-10 '>
          <div className='col-span-12 lg:col-span-8 border rounded-xl'>
            <Image
              className='max-w-full h-full max-h-[70vh] mx-auto'
              src={`https://dev-server.artlit.com.bd/${photo.image}`}
              alt={smartTrim(photo.image_description, 20, '', '')}
              width={900}
              height={500}
            />
          </div>

          <div className='p-6 border rounded-xl col-span-12 lg:col-span-4'>
            <h2 className='text-lg lg:text-2xl font-bold mb-2'>
              {photo?.location || ''}
            </h2>
            {/* <div className='text-xs lg:text-sm text-black/60 mb-6'>
          {photo.tags.map((tag) => `#${tag} `)}
        </div> */}
            <div className='space-y-2.5 text-black/80 text-xs lg:text-sm'>
              <div className='flex justify-between'>
                <span>view</span>
                <span className='font-bold'>{photo?.view_count}</span>
              </div>
              <div className='flex justify-between'>
                <span>Loves</span>
                <span className='font-bold'>{love}</span>
              </div>
              <div className='flex justify-between'>
                {/* <span>{dictionary.uploadedOn}</span>
            <span className='font-bold'>{photo?.uploaded}</span> */}
              </div>
            </div>

            <div className='mt-6'>
              <div className='flex justify-between items-center mb-3'>
                <div className='flex items-center gap-3'>
                  <Image
                    className='size-12 lg:size-14 rounded-full border'
                    src={`${PHOTO_URL}/${photo.profile_pic}`}
                    alt='avatar'
                    width={50}
                    height={50}
                  />
                  <div className='spacy-y-3'>
                    <h6 className='lg:text-lg font-bold capitalize'>
                      {photo?.uploaded_by}
                    </h6>
                    {/* <p className='text-black/60 text-xs lg:text-sm'>
                  {photo.author.followers} {dictionary.followers}
                </p> */}
                  </div>
                </div>

                {/* <button className='flex items-center gap-1.5 text-black/60 text-xs xl:text-sm'>
              <img
                src='/follow.svg'
                className='w-5 h-5'
              />
              {dictionary.follow}
            </button> */}
              </div>

              <div className='space-y-2.5 text-black/80 text-xs lg:text-sm'>
                <div className='flex justify-between'>
                  <span className=' mr-3'>Artist</span>
                  <div className='font-bold uppercase'>
                    <span>{photo?.artist_name}</span>
                  </div>
                </div>
                {photo?.co_artist_name && (
                  <div className='flex justify-between'>
                    <span className=' mr-3'>Co-Artists </span>
                    <div className='font-bold uppercase'>
                      {photo?.co_artist_name.split(',')?.join(', ')}
                    </div>
                  </div>
                )}
                {photo?.photographer && (
                  <div className='flex justify-between'>
                    <span className=' mr-3'>Photographer </span>
                    <div className='font-bold uppercase'>
                      {photo?.photographer.split(',')?.join(', ')}
                    </div>
                  </div>
                )}
              </div>

              <h4 className='title text-black'>About</h4>
              <p className='text-xs lg:text-sm text-black/60'>
                {photo.image_description}
              </p>
            </div>
            <div className='mt-6'>
              <div className='flex items-stretch gap-3'>
                <button
                  className='flex-1 border py-1.5 rounded text-xs lg:text-sm flex items-center justify-center text-center gap-1.5 font-bold hover:bg-yellow-400'
                  onClick={loveHandler}>
                  <Image
                    src='/heart.svg'
                    className='w-5 h-5'
                    width={50}
                    height={50}
                    alt=''
                  />
                  {love}
                </button>
                {/* <button
                  className='flex-1 border py-1.5 rounded text-xs lg:text-sm flex items-center justify-center text-center gap-1.5 font-bold hover:bg-yellow-400'
                  disabled>
                  <Image
                    src='/like.svg'
                    className='w-5 h-5'
                    width={50}
                    height={50}
                    alt=''
                  />
                  like
                </button> */}
                <div className='flex-1 flex'>
                  <FacebookShareButton
                    // url={fullUrl}
                    title={'Gen-Z Graffiti'}
                    url={fullUrl}
                    className='flex-1 border py-1.5 rounded text-xs lg:text-sm flex items-center justify-center text-center gap-1.5 font-bold hover:bg-yellow-400'>
                    <FacebookIcon
                      size={32}
                      round
                    />
                  </FacebookShareButton>
                  <FacebookMessengerShareButton
                    // url={fullUrl}
                    title={'Gen-Z Graffiti'}
                    url={fullUrl}
                    className='flex-1 border py-1.5 rounded text-xs lg:text-sm flex items-center justify-center text-center gap-1.5 font-bold hover:bg-yellow-400'>
                    <FacebookMessengerIcon
                      size={32}
                      round
                    />
                  </FacebookMessengerShareButton>
                  <TwitterShareButton
                    // url={fullUrl}
                    url={fullUrl}
                    title={'Gen-Z Graffiti'}>
                    <TwitterIcon
                      size={32}
                      round
                    />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={fullUrl}
                    // url={'https://github.com/next-share'}
                    title={'Gen-Z Graffiti'}
                    separator=':: '>
                    <WhatsappIcon
                      size={32}
                      round
                    />
                  </WhatsappShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}{' '}
    </>
  );
};

export default PhotoDetails;
