import React, { useState, createContext } from 'react';
import { Menu, Affix, Row, Col, Image, Drawer, Button } from 'antd';
import mapImg from '../images/maps-simul.png';
import logo from '../images/meshform.png';
import NavDrawer from '../comps/NavDrawer';
import SystemCard from '../comps/system-hubs/SystemCard';
import Map from '../comps/map/Map';
import GraphTabs from '../comps/data-vis/DrawerContent';

export const UserContext = createContext();

export function UserConsole() {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [hubList, setHubList] = useState([]);
	const [currentHub, setCurrentHub] = useState([]);

	const handleDrawer = () => {
		console.log(hubList);
		setOpenDrawer(!openDrawer);
	};
	const handleClose = () => {
		setOpenDrawer(false);
	};

	return (
		<UserContext.Provider value={{ hubList, setHubList, openDrawer, setOpenDrawer, currentHub, setCurrentHub }}>
			<Row style={{ padding: '6px 0px', display: 'flex', alignItems: 'center', backgroundColor: '#364156', height: '7vh' }}>
				<NavDrawer />
				<div>
					<img src={logo} style={{ height: '50px' }} />
				</div>
				<Button type='primary' onClick={() => handleDrawer()}>
					yessir
				</Button>
			</Row>
			<Row style={{ height: '93vh', backgroundColor: '#EDF2F5' }}>
				<Col span={6} style={{ backgroundColor: '#EDF2F5' }}>
					<SystemCard />
				</Col>
				<Col span={18} style={{ backgroundColor: '#EDF2F5', overflow: 'hidden', padding: '20px' }}>
					<Map />
					{/*<Image src={mapImg} width={'100%'} height={'100%'} />*/}
					<Drawer mask={false} placement='bottom' getContainer={false} style={{ position: 'absolute', margin: '50px 5px 5px 5px' }} onClose={() => handleClose()} visible={openDrawer} height={400}>
						<GraphTabs />
					</Drawer>
				</Col>
			</Row>
		</UserContext.Provider>
	);
}
