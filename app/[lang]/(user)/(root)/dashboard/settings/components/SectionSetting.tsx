import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Language, Theme } from '@/shared/constants/setting';
import { Bell } from 'lucide-react';

import { Globe, Palette } from 'lucide-react';
import { useState } from 'react';

export default function SectionSetting() {
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'vi',
  );
  const [notifications, setNotifications] = useState(
    JSON.parse(localStorage.getItem('notifications') || 'false'),
  );
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const languageDisplay = language === 'vi' ? 'Tiếng Việt' : 'English';
  const themeDisplay =
    theme === 'light' ? 'Sáng' : theme === 'dark' ? 'Tối' : 'Hệ thống';
  return (
    <div className="w-full flex flex-col items-center pt-10 overflow-y-auto max-h-[calc(100vh-65px)]">
      {/* Cài đặt chung */}
      <div className="mb-6 flex flex-col gap-8 w-full md:w-1/2">
        <div className="space-y-4 border border-gray-200 p-4 rounded-xl flex flex-col gap-4">
          {/* Ngôn ngữ */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 w-1/3">
              <Globe className="h-5 w-5" />
              <span>Ngôn ngữ</span>
            </div>
            <div className="text-base font-medium">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder={languageDisplay} />
                </SelectTrigger>
                <SelectContent>
                  {Language.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Giao diện */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 w-1/3">
              <Palette className="h-5 w-5" />
              <span>Giao diện</span>
            </div>
            <div className="text-base font-medium">
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder={themeDisplay} />
                </SelectTrigger>
                <SelectContent>
                  {Theme.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Thông báo */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-500 w-1/3">
              <Bell className="h-5 w-5" />
              <span>Thông báo</span>
            </div>
            <div className="text-base font-medium">
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-purple-500 data-[state=unchecked]:bg-gray-200"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md">
            Lưu lại
          </button>
        </div>
      </div>
    </div>
  );
}
