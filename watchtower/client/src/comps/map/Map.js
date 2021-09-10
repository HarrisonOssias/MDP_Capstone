import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import HubPin from './HubPin';
import NodePin from './NodePin';
import { UserContext } from '../../pages/UserConsole';
import NodeData from '../system-hubs/mock.json';

const data = NodeData;

function SimpleMap() {
	const zoom = 15;
	const { hubList, setHubList } = useContext(UserContext);
	const [center, setCenter] = useState({ lat: 43.2608775, lng: -79.9214121 });
	const nodePins = hubList ? (
		hubList.map((hub) => {
			return hub.nodes ? (
				hub.nodes.map((node) => {
					return <NodePin lat={node.lat} lng={node.long} text='Node' status={node.status} />;
				})
			) : (
				<></>
			);
		})
	) : (
		<></>
	);

	const hubPins = hubList ? (
		hubList.map((hub, index) => {
			return <HubPin lat={hub.lat} lng={hub.long} text='Hub' status={hub.status} />;
		})
	) : (
		<></>
	);

	useEffect(() => {
		if (hubList.length - 1 !== -1) {
			setCenter({ lat: hubList[hubList.length - 1].lat, lng: hubList[hubList.length - 1].long });
		}
	}, [hubList]);
	return (
		// Important! Always set the container height explicitly
		<div style={{ height: '87vh', width: '100%' }}>
			<GoogleMapReact bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }} defaultCenter={{ lat: 43.2608775, lng: -79.9214121 }} defaultZoom={zoom} center={center}>
				{hubPins}
				{nodePins.map((item) => {
					return item;
				})}
			</GoogleMapReact>
		</div>
	);
}

export default SimpleMap;
