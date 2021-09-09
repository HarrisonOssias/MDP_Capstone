import React, { useState } from 'react';
import NodeData from './NodeData.json';
import { Tabs, Typography } from 'antd';
import NodeGraph from './NodeGraph';

const { TabPane } = Tabs;

const units = ['Temp', 'Humidity']

const uncap= (str1) => {
  console.log(str1)
  return str1.charAt(0).toLowerCase() + str1.slice(1);
}

const hubDrops = units.map((unit) => {
		return (
		
		<TabPane tab={unit} key={unit} style={{maxHeight: 275}}>
      {unit} Readings
      <NodeGraph unit={uncap(unit)}/>
    </TabPane>
	
		);
	});


const GraphTabs = () => {
	return (
	<Tabs defaultActiveKey="1" >
    {hubDrops}
  
  </Tabs>
	);
};

export default GraphTabs;
