import React, { useState } from 'react';
import { Collapse, Space } from 'antd';

const { Panel } = Collapse;
function HubMenu({ nodes }) {
	return (
		<Space direction='vertical'>
			<Collapse collapsible='header' defaultActiveKey={['0']}>
				<Panel header='This panel can only be collapsed by clicking text' key='1'>
					<p>Urnan</p>
				</Panel>
			</Collapse>
		</Space>
	);
}

export default HubMenu;
