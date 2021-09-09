import React, { useState } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

function NavDrawer() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      
      <MenuOutlined style={{color: '#bfd0ef', fontSize: '32px', padding: '0px 16px 0px 16px'}} onClick={showDrawer}/>

      <Drawer title="Menu" placement="left" onClose={onClose} visible={visible}>
        <p>Booooo</p> 
      </Drawer>
    </>
  );
};

export default NavDrawer;