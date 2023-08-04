import React, { Component } from 'react';
import { Row, Col, Table, Button } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import './index.less';

/**
 * 复用穿梭框
 */
class MultiTransfer extends Component {
	static defaultProps = {
		// 数据源
		data: {
			source: {
				title: '源数据',
				columns: [],
				dataSource: []
			},
			target: [
				{
					title: '目的数据',
					columns: [],
					dataSource: []
				}
			]
		},
		// 主框样式
		leftStyle: {
			width: 300,
			height: 545
		},
		// 从框样式
		rightStyle: {
			width: 300,
			height: 150
		},
	};
	static propTypes = {
		data: PropTypes.object,
		leftStyle: PropTypes.object,
		rightStyle: PropTypes.object,
	};

	constructor(props) {
		super(props);

		const { data } = this.props
		this.state = {
			data
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			'collapse' in nextProps &&
			!isEqual(nextProps.collapse, prevState.collapse)
		) {
			return {
				collapse: !!nextProps.collapse
			};
		}

		if ('expand' in nextProps && !isEqual(nextProps.expand, prevState.expand)) {
			return {
				expand: !!nextProps.expand
			};
		}

		return null;
	}





	render() {
		const { data } = this.state;
		const { leftStyle, rightStyle } = this.props;

		const leftSt = Object.assign({}, leftStyle)
		const rightSt = Object.assign({}, rightStyle)

		let sourceTitle = '源数据', sourceColumns = []
		if (data && data.source && data.source.title) {
			sourceTitle = data.source.title
		}
		if (data && data.source && data.source.columns) {
			sourceColumns = data.source.columns
		}

		let target = [], targetArea = [];
		if (data && data.target) {
			target = data.target
		}
		for (let k in target) {
			let targetTitle = '源数据'
			if (target && target[k] && target[k].title) {
				targetTitle = target[k].title
			}
			targetArea.push((
				<Row>
					<Col style={{margin: '0 3px'}}>
						<div style={{marginTop: '40px'}}>
							<Button
								type="primary"
								icon={<RightOutlined />}
								disabled={true}
							/>
						</div>
						<div style={{marginTop: '3px'}}>
							<Button
								type="primary"
								icon={<LeftOutlined />}
								disabled={true}
							/>
						</div>
					</Col>
					<Col>
						<div className={'reid-transfer-right-box'}>
							<Row className={'reid-transfer-title'} type={'flex'} justify={'space-between'}>
								<Col>已选{}项</Col>
								<Col>{targetTitle}</Col>
							</Row>
							<div style={rightSt}>

							</div>
						</div>
					</Col>
				</Row>
			))
		}


		return (
			<Row className={'reid-transfer-wrapper'} type={'flex'}>
				<Col>
					<div className={'reid-transfer-left-box'}>
						<Row className={'reid-transfer-title'} type={'flex'} justify={'space-between'}>
							<Col>已选{}项</Col>
							<Col>{sourceTitle}</Col>
						</Row>
						<div style={leftSt}>
							<Table
								style={{}}
								size={'small'}
								columns={sourceColumns}
								rowKey={(record) => record.id || record.name}
								dataSource={[]}
							/>
						</div>
					</div>
				</Col>
				<Col>{targetArea}</Col>
			</Row>
		);
	}
}

export default MultiTransfer;
