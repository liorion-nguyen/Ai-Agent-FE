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
import { MemberRole } from '@/shared/constants/member';
import { toast, useZodForm } from '@/shared/hooks';
import { memberSchema } from '@/shared/validations/member/member.schema';
import useUserStore from '@/store/user';
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
      email: '',
      role: MemberRole.MEMBER,
    },
  });

  const { addMember, loading } = useAddMember();
  const { workspace } = useUserStore();

  const onSubmit = async (data: z.infer<typeof memberSchema>) => {
    try {
      const payload = {
        email: data.email,
        role: data.role,
      };
      await addMember({
        ...payload,
        workspace_id: workspace?.id || '',
      });
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
              Vai trò <span className="text-red-500">*</span>
            </label>
            <ModalSelect {...register('role')}>
              {Object.values(MemberRole).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
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
