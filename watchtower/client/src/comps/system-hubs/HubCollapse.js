import React, { useState } from 'react';
import { Collapse, Space, Dropdown, Menu } from 'antd';

const { Panel } = Collapse;

const menu = (
	<Menu>
		<Menu.Item key='1'>1st menu item</Menu.Item>
		<Menu.Item key='2'>2nd menu item</Menu.Item>
		<Menu.Item key='3'>3rd menu item</Menu.Item>
	</Menu>
);

function HubMenu({ nodes }) {
	return (
		<Space direction='vertical'>
			<Collapse collapsible='header' defaultActiveKey={['0']}>
				<Dropdown overlay={menu} trigger={['contextMenu']}>
					<Panel header='This panel can only be collapsed by clicking text' key='1'>
						<p>Urnan</p>
					</Panel>
				</Dropdown>
			</Collapse>
		</Space>
	);
}

export default HubMenu;
