'use client';

import SectionSetting from './components/SectionSetting';

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center bg-white p-4 border-b border-gray-200 shadow-sm h-[65px]">
        <h3 className="text-xl font-bold text-gray-800">Cài đặt</h3>
      </div>
      <SectionSetting />
    </div>
  );
};

export default SettingsPage;
