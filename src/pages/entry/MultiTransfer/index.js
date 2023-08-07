import React, { useEffect } from 'react';
import { Row, Col } from 'antd'
import MultiTransfer from '../../../component/MultiTransfer'


function Index() {
	// componentDidMount componentWillUnmount
	useEffect(() => {

		return () => {}
	}, []);


	const sourceData = [];
	const columns = [
		{title: '序号', dataIndex: 'index', width: '10%', render: t=>t+1},
		{title: '名称', dataIndex: 'index', width: '10%'},
		{title: '容量', dataIndex: 'index', width: '10%'},
	]

	const data = {
		source: {
			title: '可用硬盘',
			columns: columns,
			dataSource: sourceData
		},
		target: [
			{
				index: 'data',
				title: '数据盘',
				columns: columns,
				dataSource: []
			},
			{
				index: 'cache',
				title: '缓存盘',
				columns: columns,
				dataSource: []
			},
			{
				index: 'spare',
				title: '热备盘',
				columns: columns,
				dataSource: []
			},
		]
	}

	return (
		<div className={'full-page'}>
			Ant Design 的 Transfer 穿梭框组件只支持一对一的两栏中移动，无法应对一对多及多对多的数据排列场景。
			<div style={{height: '30px'}}/>
			<MultiTransfer data={data}/>
		</div>
	);
}

export default Index;
