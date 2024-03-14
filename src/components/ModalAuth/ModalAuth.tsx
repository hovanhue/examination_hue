import React from 'react';
import { Modal } from 'antd';

import FormAuth from '../HeaderClient/FormAuth';

interface ModalAuthProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAuth: React.FC<ModalAuthProps> = ({ visible, onClose }) => (
    <Modal centered closeIcon={false} open={visible} onCancel={onClose} footer={null}>
      <FormAuth
        onCancelModal={() => {
          onClose();
        }}
      />
    </Modal>
  );

export default ModalAuth;
