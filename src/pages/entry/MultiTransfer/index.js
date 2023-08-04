import React, { useEffect } from 'react';
import { Row, Col } from 'antd'
import MultiTransfer from '../../../component/MultiTransfer'


function Index() {
	// componentDidMount componentWillUnmount
	useEffect(() => {

		return () => {}
	}, []);

	const data = {
		source: {title: '可用硬盘', }
	}

	return (
		<div className={'full-page'}>
			Ant Design 的 Transfer 穿梭框组件只支持两栏中移动，无法应对一对多及多对多的数据排列场景。
			<div style={{height: '30px'}}/>
			<MultiTransfer />
		</div>
	);
}

export default Index;
