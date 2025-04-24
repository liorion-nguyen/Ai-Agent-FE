'use client';

import useSettingStore from '@/store/setting';
import { useTranslation } from 'react-i18next';

const Counter = () => {
  const { t } = useTranslation();
  const { counter, setCounter, resetCounter } = useSettingStore();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
        {t('home.title')}
      </h1>

      <p className="text-center mb-6 text-gray-800 dark:text-gray-300 text-base md:text-lg">
        {t('home.content')}
      </p>

      <div className="text-center mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {t('home.counter')}: {counter}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={() => setCounter(counter + 1)}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
        >
          Increase
        </button>
        <button
          onClick={() => setCounter(counter - 1)}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition-all"
        >
          Decrease
        </button>
        <button
          onClick={resetCounter}
          className="w-full sm:w-auto px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
