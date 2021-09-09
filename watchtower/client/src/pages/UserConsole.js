import React from 'react';
import { Menu, Affix, Row, Col, Image } from 'antd';
import mapImg from '../images/maps-simul.png';
import logo from '../images/meshform.png';
import NavDrawer from '../comps/NavDrawer';
import SystemCard from '../comps/system-hubs/SystemCard';

function UserConsole() {
	return (
		<>
			<Row style={{ padding: '6px 0px', display: 'flex', alignItems: 'center', backgroundColor: '#364156', height: '7vh' }}>
				<NavDrawer />
				<div>
					<img src={logo} style={{ height: '50px' }} />
				</div>
			</Row>
			<Row style={{ height: '93vh' }}>
				<Col span={6}>
					<SystemCard />
				</Col>
				<Col span={18} style={{ backgroundColor: 'blue' }}>
					{/*<Image src={mapImg} width={'100%'} height={'100%'} />*/}
				</Col>
			</Row>
		</>
	);
}

export default UserConsole;
