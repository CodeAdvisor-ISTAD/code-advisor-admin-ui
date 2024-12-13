'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const formSchema = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, 'Image is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      '.jpg, .jpeg, .png and .webp files are accepted.'
    )
});

export default function MainContent() {
  const [urls, setUrls] = useState([
    'https://facebook.com/sopheaktra9',
    'https://twitter.com/sopheaktra9'
  ]);

  const addNewUrl = () => {
    setUrls([...urls, '']);
  };

  const defaultValues = {
    image: null
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Profile Section */}
        <section>
          <h2 className="mb-1 text-xl font-semibold">Profile</h2>
          <p className="mb-6 text-sm text-gray-500">
            This is your user profile on the site
          </p>

          {/* Profile Image */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">
              Profile Image
            </label>
            <div className="relative h-24 w-24">
              <img
                src="/api/placeholder/96/96"
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 rounded-full bg-white p-1 shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
              
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This is your profile picture. It will display on the as a profile
              image.
            </p>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Username</label>
            <input
              type="text"
              defaultValue="sopheaktra"
              className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              defaultValue="sopheaktra@gmail.com"
              className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              This is your email address on this account.
            </p>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Bio</label>
            <textarea
              defaultValue="I own a computer"
              className="h-24 w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-2 text-sm text-gray-500">
              This is bio of your profile
            </p>
          </div>

          {/* URLs */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">URLs</label>
            <p className="mb-4 text-sm text-gray-500">
              Add links to your website, blog, or social media profiles.
            </p>

            <div className="space-y-3">
              {urls.map((url, index) => (
                <input
                  key={index}
                  type="url"
                  defaultValue={url}
                  className="w-full rounded-lg border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              onClick={addNewUrl}
              className="mt-3 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
            >
              Add URL
            </button>
          </div>

          {/* Update Button */}
          <button className="w-full rounded-lg bg-black px-6 py-2 text-white transition-colors hover:bg-gray-800 sm:w-auto">
            Update profile
          </button>
        </section>
      </div>
    </>
  );
}
