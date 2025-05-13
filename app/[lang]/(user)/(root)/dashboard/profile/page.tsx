'use client';

import FormProfile from '@/app/[lang]/(user)/(root)/dashboard/profile/components/FormProfile';

const ProfilePage = () => {
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 min-h-max md:min-h-[65px] md:max-h-[65px]">
        <h3 className="text-xl font-bold">Thông tin cá nhân</h3>
      </div>
      <div className="flex w-full h-[calc(100vh-65px)] p-4">
        <FormProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
