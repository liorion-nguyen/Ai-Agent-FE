import {
  Modal,
  ModalBody,
  ModalButton,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/Modal';
import { CircleX } from 'lucide-react';

interface ChatbotDeleteParams {
  chatbot_id: string;
  chatbot_name: string;
  open: boolean;
}

export default function DeleteChatbotModal({
  data,
  onClose,
}: {
  data: ChatbotDeleteParams;
  onClose: () => void;
}) {
  const handleDelete = () => {
    console.log('Xóa chatbot', data.chatbot_id);
    onClose();
  };
  return (
    <Modal isOpen={data.open} onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Xóa chatbot</ModalTitle>
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody className="flex flex-col items-center gap-4 my-10">
        <CircleX color="#f91a1a" className="w-20 h-20" />
        <p>
          Bạn có chắc chắn muốn xóa chatbot{' '}
          <span className="font-bold">{data.chatbot_name}</span> không?
        </p>
      </ModalBody>
      <ModalFooter>
        <ModalButton variant="secondary" className="w-1/2" onClick={onClose}>
          Hủy
        </ModalButton>
        <ModalButton
          className="w-1/2 bg-red-500 text-white"
          onClick={handleDelete}
        >
          Xóa
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
