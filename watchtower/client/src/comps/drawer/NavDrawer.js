import React, { useState } from 'react';
import { Drawer, Button, Space, Divider, Modal } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import CreateDevice from './CreateDevice';
import CreateNetwork from './CreateNetwork';

function NavDrawer() {
	const [visible, setVisible] = useState(false);
	const [show, setShow] = useState(false);
	const [content, setContent] = useState(['', <></>]);
	const showDrawer = () => {
		setVisible(true);
	};

	const onClose = () => {
		setVisible(false);
	};

	const drawerContent = (
		<>
			<Space direction='vertical'>
				<Button style={{ width: '200px' }}>Profile Settings</Button>

				<Divider />
				<Button
					style={{ width: '200px' }}
					onClick={() => {
						setContent(['Create Network', <CreateNetwork />]);
						setShow(true);
					}}
				>
					Create Network
				</Button>

				<Button
					style={{ width: '200px' }}
					onClick={() => {
						setContent(['Create Device', <CreateDevice />]);
						setShow(true);
					}}
				>
					Create Device
				</Button>
			</Space>
		</>
	);

	const drawerFooter = (
		<Button  style={{ width: '220px', backgroundColor: '#364156' }}>
			<div style={{color: 'white' }}> Sign Out <LogoutOutlined /> </div>
		</Button>
	);

	return (
		<>
			<MenuOutlined style={{ color: '#bfd0ef', fontSize: '32px', padding: '0px 16px 0px 16px' }} onClick={showDrawer} />

			<Drawer title='Menu' placement='right' onClose={onClose} visible={visible} footer={drawerFooter}>
				{drawerContent}
			</Drawer>
			<Modal title={content[0]} visible={show} bodyStyle={{ height: '40vh', overflowY: 'scroll' }} width='20vw' onOk={() => setShow(false)} onCancel={() => setShow(false)}>
				{content[1]}
			</Modal>
		</>
	);
}

export default NavDrawer;
