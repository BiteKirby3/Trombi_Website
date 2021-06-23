import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Modal, Button, Tooltip } from 'antd';

//npm install antd

const Dialog = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imgData, setImgData] = useState('');

  const showModal = () => {
    setImgData('https://api.qrserver.com/v1/create-qr-code/?data='+props.dataFromPerson);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setImgData('');
    setIsModalVisible(false);
  };


  return (
    <>
      <Tooltip placement="top" color={'#009fe3'} title="générer un QR Code" arrowPointAtCenter>
      <Button type="text" style={{ borderColor: 'darkgrey'}} onClick={showModal} ghost>
        {props.dataFromPerson}
      </Button>
      </Tooltip>
      <Modal title={props.dataFromPerson} visible={isModalVisible} width={380} footer={null} closable={true} onOk={handleOk} onCancel={handleOk}>
        <img src={`${imgData}`} alt={'QRCode for '+props.dataFromPerson} width="300" height="300" align="center"/>
      </Modal>
    </>
  ); 
};

export default Dialog ;