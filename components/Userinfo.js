'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { validateEmail } from '@/lib/validateEmail ';
import Loading from './Loading';
import LoadingBtn from './LoadingBtn';
import toast from 'react-hot-toast';

export default function Userinfo() {
  const router = useRouter();
  const [uniqueEmailError, setUniqueEmailError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    coArtists: '',
    place: '',
    email: '',
    age: '',
    phone: '',
    gender: '',
    description: '',
    profession: '',

    // imgFile: null,
    // videoFile: null
  });
  const [mainImg, setmainImg] = useState([]);
  const [profilePic, setprofilePic] = useState([]);
  const [relatedImg, setrelatedImg] = useState([]);
  const [video, setvideo] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const { name } = event.target;

    setFormData({
      ...formData,
      // mainImg: event.target.files[0],
      // profilePic: event.target.files[0],
      // relatedImg: event.target.files[0],
      // video: event.target.files[0],
      [name]: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // console.log(event);
    // console.log(formData);
    // const emailData = event.target.value[]
    const emailValidationError = validateEmail(formData?.email);
    if (emailValidationError) {
      setIsLoading(false);
      setEmailError(emailValidationError);
      return;
    } else {
      setIsLoading(true);
      setEmailError('');
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    mainImg.forEach((file) => {
      formDataToSend.append('mainImg', file);
    });
    profilePic.forEach((file) => {
      formDataToSend.append('profilePic', file);
    });
    relatedImg.forEach((file) => {
      formDataToSend.append('relatedImg', file);
    });

    video.forEach((file) => {
      formDataToSend.append('video', file);
    });
    try {
      const response = await fetch(
        `https://dev-server.artlit.com.bd/api/photos`,
        {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data' is not needed; fetch will set it automatically for FormData
          },
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setFormData({
          name: '',
          coArtists: '',
          place: '',
          email: '',
          age: '',
          phone: '',
          gender: '',
          description: '',
          uploadedBy: '',
          photographer: '',
          profession: '',
          mainImg: null,
          profilePic: null,
          relatedImg: null,
          video: null,
        });
        setIsLoading(false);
        toast.success("Post Successful!");
        router.push('/');
      } else {
        setIsLoading(false);
        toast.error("Failed to save data");
        throw new Error('Failed to save data');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className='bg-white shadow-md rounded-md md:p-6 w-10/12 xl:w-1/2 3xl:w-5/12 '>
      <h5 className='text-center text-4xl pb-3'>Art Information</h5>
      <form
        method='post'
        onSubmit={handleSubmit}>
        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto  p-2 '>
            <label
              htmlFor='uploadedBy'
              className='block text-md font-medium text-gray-700'>
              Uploaded By <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='uploadedBy'
                id='uploadedBy'
                type='text'
                value={formData.uploadedBy}
                onChange={handleInputChange}
                required
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
            {nameError ? (
              <span className='text-red-500 text-[10px] block'>
                {nameError}
              </span>
            ) : null}
          </div>

          <div className='flex-auto  p-2 '>
            <label
              htmlFor='name'
              className='block text-md font-medium text-gray-700'>
              Artist <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='name'
                id='name'
                type='text'
                value={formData.name}
                onChange={handleInputChange}
                required
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
            {nameError ? (
              <span className='text-red-500 text-[10px] block'>
                {nameError}
              </span>
            ) : null}
          </div>
        </div>
        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 '>
            <label
              htmlFor='coArtists'
              className='block text-md font-medium text-gray-700'>
              Co-Artist{' '}
              {/* <span className='text-sm'>separate names by comma ( , )</span> */}
            </label>
            <div className='mt-1'>
              <input
                name='coArtists'
                id='coArtists'
                type='text'
                value={formData.coArtists}
                onChange={handleInputChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='phone'
              className='block text-md font-medium text-gray-700'>
              Phone Number <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='phone'
                id='phone'
                type='tel'
                value={formData.phone}
                onChange={handleInputChange}
                required
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='email'
              className='block text-md font-medium text-gray-700'>
              Email <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='email'
                id='email'
                type='email-address'
                autoComplete='email-address'
                value={formData.email}
                onChange={handleInputChange}
                required
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
            {emailError ? (
              <span className='text-red-500 text-[10px] block'>
                {emailError}
              </span>
            ) : null}
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 md:w-1/2 w-full '>
            <label
              htmlFor='age'
              className='block text-md font-medium text-gray-700'>
              Age <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                onWheel={(e) => e.target.blur()}
                name='age'
                id='age'
                type='number'
                min='12'
                max='28'
                required
                value={formData.age}
                onChange={handleInputChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='profession'
              className='block text-md font-medium text-gray-700'>
              Profession
            </label>
            <div className='mt-1'>
              <select
                name='profession'
                id='profession'
                value={formData.profession}
                onChange={handleInputChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'>
                <option value=''>Select Profession</option>
                <option value='student'>Student</option>
                <option value='jobless'>Jobless</option>
                <option value='job'>Job</option>
                <option value='business'>Business</option>
                <option value='housewife'>House Wife</option>
                <option value='others'>Others</option>
              </select>
            </div>
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto  p-2 md:w-1/2 w-full'>
            <label
              htmlFor='gender'
              className='block text-md font-medium text-gray-700'>
              Gender <span className='text-red-500'>*</span>{' '}
            </label>

            <div className='mt-1'>
              <select
                name='gender'
                id='gender'
                value={formData.gender}
                onChange={handleInputChange}
                required
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'>
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='others'>Others</option>
              </select>
            </div>
          </div>

          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='place'
              className='block text-md font-medium text-gray-700'>
              Graffiti Place <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='place'
                id='place'
                type='text'
                required
                value={formData.place}
                onChange={handleInputChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 md:w-1/2 w-full '>
            <label
              htmlFor='profilePic'
              className='block text-md font-medium text-gray-700'>
              Profile Picture <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='profilePic'
                id='profilePic'
                type='file'
                required
                accept='image/*'
                onChange={handleFileChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='mainImg'
              className='block text-md font-medium text-gray-700'>
              Graffiti Image <span className='text-red-500'>*</span>{' '}
            </label>
            <div className='mt-1'>
              <input
                name='mainImg'
                id='mainImg'
                type='file'
                accept='image/*'
                onChange={handleFileChange}
                required
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='relatedImg'
              className='block text-md font-medium text-gray-700'>
              Related Image
            </label>
            <div className='mt-1'>
              <input
                name='relatedImg'
                id='relatedImg'
                type='file'
                accept='image/*'
                multiple
                onChange={handleFileChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>

          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='video'
              className='block text-md font-medium text-gray-700'>
              Video
            </label>
            <div className='mt-1'>
              <input
                name='video'
                id='video'
                type='file'
                accept='video/*'
                onChange={handleFileChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 '>
            <label
              htmlFor='photographer'
              className='block text-md font-medium text-gray-700'>
              Photographer/Videographer <span className='text-red-500'>*</span>{' '}
              {/* <span className='text-sm'>separate names by comma ( , )</span> */}
            </label>
            <div className='mt-1'>
              <input
                name='photographer'
                id='photographer'
                type='text'
                required
                value={formData.photographer}
                onChange={handleInputChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        <div className='flex md:flex-row gap-3 flex-col '>
          <div className='flex-auto p-2 md:w-1/2 w-full'>
            <label
              htmlFor='description'
              className='block text-md font-medium  text-gray-700'>
              Description
            </label>
            <div className='mt-1'>
              <textarea
                name='description'
                id='description'
                type='text'
                value={formData.description}
                onChange={handleInputChange}
                className='px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm'
              />
            </div>
          </div>
        </div>

        <div className='pt-3'>
          {uniqueEmailError && (
            <p className='text-red-700 text-start mb-3 '>{uniqueEmailError}</p>
          )}
          {!isLoading ? (
            <button
              type='submit'
              className='flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2'>
              Save
            </button>
          ) : (
            <button
              className='flex justify-center items-center w-full rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm '
              disabled>
              <div className='flex justify-center items-center  '>
                <LoadingBtn /> <span>Loading...</span>
              </div>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
