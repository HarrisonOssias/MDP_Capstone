import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import HubPin from './HubPin';
import NodePin from './NodePin';
import { UserContext } from '../../pages/UserConsole';

function SimpleMap() {
	const zoom = 15;
	const { hubList, setHubList } = useContext(UserContext);
	const [center, setCenter] = useState({ lat: 43.2608775, lng: -79.9214121 });
	console.log(hubList);
	const nodePins = hubList ? (
		hubList.map((hub) => {
			return hub.devices ? (
				hub.devices.map((node) => {
					if (node.isNode) return <NodePin lat={node.lat} lng={node.lng} status={node.status} val={node.name} battery={node.battery} />;
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
			return <HubPin lat={hub.devices[0].lat} lng={hub.devices[0].lng} status={hub.devices[0].status} val={hub.devices[0].name} battery={hub.battery} />;
		})
	) : (
		<></>
	);

	useEffect(() => {
		if (hubList.length - 1 !== -1) {
			setCenter({ lat: hubList[0].devices[0].lat, lng: hubList[0].devices[0].lng });
			console.log(center);
		}
	}, [hubList]);

	console.log(hubList);
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
