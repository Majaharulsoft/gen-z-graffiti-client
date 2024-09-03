import Link from "next/link";
import Image from "next/image";
import { smartTrim } from '@/lib/smartTrim';
import { PHOTO_URL } from '@/lib/urls';

const PhotoCard = ({ photo }) => {
  // console.log(photo);

  return (
    <Link
      href={`photos/${photo.art_image_id}`}
      className='group overflow-hidden h-'>
      <Image
        src={`${PHOTO_URL}/${photo.image}`}
        alt={photo.location}
        width={700}
        height={700}
      />

      <div className='title-container '>
        <div className='flex justify-center gap-3 items-center p-2'>
          <div>
            <Image
              className='rounded-full'
              src={`${PHOTO_URL}/${photo.profile_pic}`}
              alt={photo.profile_pic}
              width={50}
              height={50}
            />
          </div>
          <div className=' text-left'>
            <h4 className='title'>{photo.artist_name}</h4>
            <p className='text-white text-sm'>
              {smartTrim(photo.image_description, 50, '', '...')}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;