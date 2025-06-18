"use client";

import React from "react";
import Image from "next/image";

interface AvatarUploadProps {
  profileImage: string | null;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: number;
}

export function AvatarUpload({ profileImage, size = 24 }: AvatarUploadProps) {
  const sizeClass = `w-${size} h-${size}`;
  const imageSize = size * 4;

  return (
    <div className="relative">
      <div
        className={`${sizeClass} rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700`}
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt="Profile"
            className="object-cover"
            width={imageSize}
            height={imageSize}
            priority
            unoptimized={profileImage.startsWith("data:")}
          />
        ) : (
          <Image
            src="/avatar.png"
            alt="Default Profile"
            className="object-cover"
            width={imageSize}
            height={imageSize}
            priority
          />
        )}
      </div>
      {/* <label
        htmlFor="profile-image"
        className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
          <circle cx="12" cy="13" r="4"></circle>
        </svg>
      </label>
      <input
        type="file"
        id="profile-image"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      /> */}
    </div>
  );
}
