import React, { useEffect, useState } from 'react';
import { DashboardOutlined, UploadOutlined, DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom'
import PubSub from "pubsub-js";
import { SubEvent } from '../enum'
import '../index.css'

const rootSubmenuKeys = ['/credentials'];

const MenuList = () => {
	const [openKeys, setOpenKeys] = useState(['']);
	const [selectedKeys, setSelectedKeys] = useState(['']);
	const navigate = useNavigate();
	const location = useLocation();
	let menuSub = null;

	// componentDidMount
	useEffect(() => {
		setSelectedKeys([location.pathname]);
		// 监听其他页面发布的跳转事件
		menuSub = PubSub.subscribe(SubEvent.SWITCH_PAGE, (_, url)=>{
			navigate(url)
			setSelectedKeys([url])
			let openKey = '/'+url.split('/')[1]
			if (rootSubmenuKeys.includes(openKey)) {
				setOpenKeys([openKey])
			}
		})
		// 监听浏览器前进后退事件
		window.addEventListener('popstate', (e)=>{
			setSelectedKeys([e.target['location']['pathname']]);

			let openKey = '/'+e.target['location']['pathname'].split('/')[1]
			if (rootSubmenuKeys.includes(openKey)) {
				setOpenKeys([openKey])
			}
		})

		return () => {
			PubSub.unsubscribe(menuSub);
		}
	}, []);

	const primaryClick = (item) => {
		navigate(item['key'])
		setSelectedKeys([item['key']])
	}

	const onOpenChange = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
		}
	};

	const list = [
		{
			key: '/homepage', icon: <DashboardOutlined />, label: '首页'
		},
		{
			key: '/entry', icon: <UploadOutlined />, label: '数据录入',
			children: [
				{key: '/entry/MultiTransfer', label: '复用穿梭框'},
			]
		},
		{
			key: '/display', icon: <DownloadOutlined />, label: '数据展示',
			children: [
				{key: '/display/MultiTransfer', label: '复用穿梭框'},
			]
		},
		{
			key: '/feedback', icon: <QuestionCircleOutlined />, label: '反馈',
			children: [
				{key: '/feedback/MultiTransfer', label: '复用穿梭框'},
			]
		},
	]


	return (
		<Menu
			theme="dark"
			mode="horizontal"
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			onOpenChange={onOpenChange}
			onClick={primaryClick}
			items={list}
		/>
	);
};
export default MenuList;
