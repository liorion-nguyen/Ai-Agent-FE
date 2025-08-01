import ModalUpdateName from '@/app/[lang]/(user)/(root)/dashboard/profile/components/ModalUpdateName';
import ModalUpdatePassword from '@/app/[lang]/(user)/(root)/dashboard/profile/components/ModalUpdatePassword';
import ModalUpdatePhoneNumber from '@/app/[lang]/(user)/(root)/dashboard/profile/components/ModalUpdatePhone';
import Img from '@/components/ui/Image';
import { UserStatus } from '@/shared/constants';
import useUserStore from '@/store/user';
import { UserRound } from 'lucide-react';
import { useState } from 'react';
export default function FormProfile() {
  // State để lưu trữ ảnh đại diện (nếu có)
  const [avatar, setAvatar] = useState<string | null>(null);

  // Hàm xử lý khi chọn file ảnh
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result && typeof reader.result === 'string') {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { user } = useUserStore();
  const [isOpenModalUpdateName, setIsOpenModalUpdateName] = useState(false);
  const [isOpenModalUpdatePhone, setIsOpenModalUpdatePhone] = useState(false);
  const [isOpenModalUpdatePassword, setIsOpenModalUpdatePassword] =
    useState(false);

  return (
    <div className="max-w-3xl w-full md:w-2/3 mx-auto p-4 md:p-6">
      {/* Hình đại diện */}
      <div className="mb-6">
        <h2 className="text-md font-semibold mb-4">Hình đại diện</h2>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-lg bg-gray-200 flex items-center justify-center">
            {avatar ? (
              <Img
                src={user?.thumbnail ? user?.thumbnail : avatar}
                alt="Avatar"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <UserRound className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Dung lượng file cho phép 720x720 pixel, cao nhất là 1MB
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-600">
                Lưu thay đổi
              </button>
            </label>
          </div>
        </div>
      </div>

      {/* Chi tiết người dùng */}
      <div className="mb-6">
        <h2 className="text-md font-semibold mb-4">Chi tiết người dùng</h2>
        <div className="space-y-4  border border-gray-200 p-4 rounded-xl">
          {/* Tên */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">Tên</p>
            <div className="text-base font-medium flex-1">
              {user?.fullname || 'Chưa có thông tin'}
            </div>
            <div className="w-auto">
              <button
                onClick={() => setIsOpenModalUpdateName(true)}
                className="text-purple-500 hover:underline bg-transparent border-none"
              >
                Chỉnh sửa
              </button>
              <ModalUpdateName
                isOpen={isOpenModalUpdateName}
                onClose={() => setIsOpenModalUpdateName(false)}
                fullName={user?.fullname || ''}
              />
            </div>
          </div>

          {/* Nguồn gốc */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">Ngôn ngữ</p>
            <div className="text-base font-medium flex-1">
              <p className="text-base font-medium flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                Tiếng Việt
              </p>
            </div>
          </div>

          {/* ID người dùng */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">ID người dùng</p>
            <div className="text-base font-medium flex-1">{user?.id}</div>
          </div>
          {/* Trạng thái */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">Trạng thái</p>
            <div
              className={`text-base font-medium ${user?.status === UserStatus.ACTIVE ? 'text-green-600' : 'text-red-600'}`}
            >
              {user?.status === UserStatus.ACTIVE
                ? 'Đang hoạt động'
                : 'Đã khóa'}
            </div>
          </div>

          {/* Mật khẩu */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">Mật khẩu</p>
            <div className="text-base font-medium flex-1">
              <p className="text-base font-medium">************</p>
            </div>
            <div className="w-auto">
              <button
                onClick={() => setIsOpenModalUpdatePassword(true)}
                className="text-purple-500 hover:underline bg-transparent border-none"
              >
                Chỉnh sửa
              </button>
              <ModalUpdatePassword
                isOpen={isOpenModalUpdatePassword}
                onClose={() => setIsOpenModalUpdatePassword(false)}
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">E-mail</p>
            <div className="text-base font-medium flex-1">
              {user?.email || 'Chưa có thông tin'}
            </div>
          </div>

          {/* Số điện thoại */}
          <div className="flex w-full">
            <p className="text-sm text-gray-500 w-1/3">Số điện thoại</p>
            <div className="text-base font-medium flex-1">
              {user?.phone || 'Chưa có thông tin'}
            </div>
            <div className="w-auto">
              <button
                onClick={() => setIsOpenModalUpdatePhone(true)}
                className="text-purple-500 hover:underline bg-transparent border-none"
              >
                Chỉnh sửa
              </button>
              <ModalUpdatePhoneNumber
                isOpen={isOpenModalUpdatePhone}
                onClose={() => setIsOpenModalUpdatePhone(false)}
                phone={user?.phone || ''}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin công ty */}
      <div>
        <h2 className="text-md font-semibold mb-4">
          Thông tin công ty (Nếu bạn muốn xuất hóa đơn chính)
        </h2>
      </div>
    </div>
  );
}
