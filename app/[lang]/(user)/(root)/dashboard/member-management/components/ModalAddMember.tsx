'use client';
import { useAddMember } from '@/app/[lang]/(user)/(root)/dashboard/member-management/hooks/useMember';
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalInput,
  ModalSelect,
  ModalTitle,
} from '@/components/ui/Modal';
import { toast, useZodForm } from '@/shared/hooks';
import { memberSchema } from '@/shared/validations/member/member.schema';
import { z } from 'zod';

interface ModalAddMemberProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalAddMember({
  isOpen,
  onClose,
}: ModalAddMemberProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useZodForm(memberSchema, {
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      role: 'member',
    },
  });

  const { addMember, loading } = useAddMember();

  const onSubmit = async (data: z.infer<typeof memberSchema>) => {
    try {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      console.log('Member data:', payload);
      addMember(payload);
      onClose();
    } catch (error) {
      console.error('Error creating member:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể thêm thành viên',
        variant: 'destructive',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader>
        <ModalTitle>Thêm thành viên</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ tên thành viên <span className="text-red-500">*</span>
            </label>
            <ModalInput
              placeholder="Nhập tên của bạn"
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Thành viên <span className="text-red-500">*</span>
            </label>
            <ModalInput
              placeholder="Nhập email của bạn"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu <span className="text-red-500">*</span>
            </label>
            <ModalInput
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vai trò <span className="text-red-500">*</span>
            </label>
            <ModalSelect {...register('role')}>
              <option value="member">Thành viên</option>
              <option value="admin">Quản trị viên</option>
            </ModalSelect>
            {errors.role && (
              <p className="text-sm text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" onClick={onClose}>
          Đóng
        </ModalButton>
        <ModalButton
          type="submit"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
        >
          {loading ? 'Đang xử lý...' : 'Thêm thành viên'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
