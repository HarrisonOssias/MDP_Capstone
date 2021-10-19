import React, { useContext, useState } from 'react';
import { Collapse, Space, Row, Col, Typography, Popover, Button, Modal } from 'antd';
import { DownOutlined, KeyOutlined } from '@ant-design/icons';
import { UserContext } from '../../pages/UserConsole';
import { SettingFilled } from '@ant-design/icons';
import './menu.css';

const { Panel } = Collapse;
const { Title, Paragraph, Text, Link } = Typography;

function HubMenu({ hub }) {
	const { hubList, setHubList, openDrawer, setOpenDrawer, currentHub, setCurrentHub } = useContext(UserContext);
	const [show, setShow] = useState(false);
	const [choice, setChoice] = useState(<></>);
	const handleDrawer = () => {
		setOpenDrawer(!openDrawer);
	};

	function callback(key) {
		if (key[1] === '0') {
			//open collapse
			let newList = [...hubList];
			newList.push(hub);
			setHubList(newList);
		} else {
			//close collapse
			let newList = [...hubList];
			var i = newList.indexOf(hub);
			newList.splice(i, 1);
			setHubList(newList);
		}
	}

	const content = (
		<div>
			<Button style={{ backgroundColor: '#CFEAE9' }} onClick={() => setShow(true)}>
				<Text strong={true}>Edit Info</Text>
			</Button>
			<Button style={{ backgroundColor: '#CEEBD1' }} onClick={() => setShow(true)}>
				<Text strong={true}>Add Nodes</Text>
			</Button>
		</div>
	);

	const header = (
		<>
			<Row style={{ width: '100%' }} gutter={[24, 8]} justify='start' align='middle'>
				<Col>
					<Title level={2} style={{ color: '#ffff', margin: '0px' }}>
						{hub.name}
					</Title>
				</Col>
				<Col>
					<div style={{ backgroundColor: hub.status === 'Ok' ? '#94f0a9' : '#f09494', textAlign: 'center', padding: '2px 16px 2px 16px', borderRadius: '12px', width: '80px' }}>
						<Title level={5} style={{ color: '#364156', margin: '0px' }}>
							{' '}
							{hub.status}
						</Title>
					</div>
				</Col>
				<Col>
					<div className='icon' value={hub.name}>
						<Popover content={content} title='Network Settings'>
							<SettingFilled style={{ color: '#ffff', fontSize: '20px' }} />
						</Popover>
					</div>
				</Col>
			</Row>
			<Row style={{ width: '100%' }}>
				<Col>
					<Paragraph style={{ margin: '0px', color: 'white' }}>Lat: {hub.lat}</Paragraph>
				</Col>
				<Col>
					<Paragraph style={{ margin: '0px', color: 'white', padding: '0px 10px 0px 10px' }}>|</Paragraph>
				</Col>
				<Col>
					<Paragraph style={{ margin: '0px', color: 'white' }}>Long: {hub.long}</Paragraph>
				</Col>
			</Row>
		</>
	);

	const nodeLength = hub.nodes.length;

	return (
		<>
			<Space direction='vertical'>
				<Collapse expandIcon={({ isActive }) => <DownOutlined style={{ fontSize: '32px', color: '#fdbe93' }} rotate={isActive ? 90 : 0} />} expandIconPosition='right' defaultActiveKey={hub.id} style={{ width: '20vw' }} onChange={callback}>
					<Panel header={header} style={{ backgroundColor: '#364156' }}>
						<div style={{ backgroundColor: 'white' }}>
							<Row>
								<Col style={{ width: '2%' }}>
									<div style={{ height: '100%', width: '3px', backgroundColor: '#fdbe93', marginRight: '4px', borderRadius: '2px' }} />
								</Col>
								<Col style={{ width: '98%' }}>
									{hub.nodes.map((node, index) => (
										<>
											<div style={{ padding: '12px 24px 12px 24px', backgroundColor: '#e1f3f6', borderRadius: '5px' }}>
												<Row style={{ width: '100%' }} gutter={[24, 8]} justify='start' align='middle'>
													<Col>
														<Title level={3} style={{ color: 'black', margin: '0px' }}>
															{node.name}
														</Title>
													</Col>
													<Col>
														<div style={{ backgroundColor: node.status === 'Ok' ? '#94f0a9' : '#f09494', textAlign: 'center', padding: '2px 16px 2px 16px', borderRadius: '12px', width: '80px' }}>
															<Title level={5} style={{ color: '#364156', margin: '0px' }}>
																{' '}
																{node.status}
															</Title>
														</div>
													</Col>
												</Row>
												<Row style={{ width: '100%' }}>
													<Col>
														<Paragraph style={{ margin: '0px', color: 'black' }}>Lat: {node.lat}</Paragraph>
													</Col>
													<Col>
														<Paragraph style={{ margin: '0px', color: 'black', padding: '0px 10px 0px 10px' }}>|</Paragraph>
													</Col>
													<Col>
														<Paragraph style={{ margin: '0px', color: 'black' }}>Long: {node.long}</Paragraph>
													</Col>
												</Row>
											</div>
											{nodeLength === index + 1 ? null : <div style={{ width: '100%', height: '16px' }} />}
										</>
									))}
								</Col>
							</Row>
						</div>
					</Panel>
				</Collapse>
			</Space>
			<Modal visible={show} onOk={() => setShow(false)} onCancel={() => setShow(false)}>
				{choice}
			</Modal>
		</>
	);
}

export default HubMenu;
