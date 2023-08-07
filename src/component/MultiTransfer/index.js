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
		mode: 'auto',   // 高度模式 默认为auto自动计算 根据目标框体的高度自动计算源框体高度
		sHeight: 180,   // 源框体高度 当mode为auto时无效
		tHeight: 180,   // 目标框体高度
		width: 300,     // 框体宽度
	};
	static propTypes = {
		data: PropTypes.object,
		mode: PropTypes.string,
		sHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
		tHeight: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
		width: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
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

	//



	render() {
		const { data } = this.state;
		const { mode, sHeight, tHeight, width } = this.props;

		let target = [], targetArea = [];
		if (data && data.target) {
			target = data.target
		}

		let leftStyle = {}, rightStyle = {};
		let bodyWidth = Number(width+'');
		let lHeight, rHeight = Number(tHeight+'');
		let num = target.length;
		if (mode === 'auto') {
			if (num === 0) {
				lHeight = 300
			}
			else {
				lHeight = (rHeight+10)*num-10
			}
		}
		else {
			lHeight = Number(sHeight+'')
		}

		leftStyle = {width: bodyWidth, height: lHeight}
		rightStyle = {width: bodyWidth, height: rHeight}

		let sourceTitle = '源数据', sourceColumns = []
		if (data && data.source && data.source.title) {
			sourceTitle = data.source.title
		}
		if (data && data.source && data.source.columns) {
			sourceColumns = data.source.columns
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
						<div className={'reid-transfer-right-box'} style={rightStyle}>
							<Row className={'reid-transfer-title'} type={'flex'} justify={'space-between'}>
								<Col>已选{}项</Col>
								<Col>{targetTitle}&nbsp;<Button type={'link'}>删除</Button></Col>
							</Row>
							<div>

							</div>
						</div>
					</Col>
				</Row>
			))
		}


		return (
			<Row className={'reid-transfer-wrapper'} type={'flex'}>
				<Col>
					<div className={'reid-transfer-left-box'} style={leftStyle}>
						<Row className={'reid-transfer-title'} type={'flex'} justify={'space-between'}>
							<Col>已选{}项</Col>
							<Col>{sourceTitle}</Col>
						</Row>
						<div>
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
