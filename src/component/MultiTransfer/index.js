import React, { Component } from 'react';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import './index.less';

/**
 * 面板组件
 */
class MultiTransfer extends Component {
	static defaultProps = {
		leftStyle: {            // 主框样式
			width: 260,
			height: 400
		},
		rightStyle: {           // 从框样式
			width: 250
		},
	};
	static propTypes = {
		leftStyle: PropTypes.object,
		rightStyle: PropTypes.object,
	};

	constructor(props) {
		super(props);
		this.state = {};
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
		const { expand } = this.state;
		const { leftStyle, rightStyle } = this.props;

		const leftSt = Object.assign({}, leftStyle)
		const rightSt = Object.assign({}, rightStyle)

		return (
			<Row className={'reid-transfer-wrapper'} type={'flex'}>
				<Col>
					<div style={leftSt} className={'reid-transfer-left-box'}>
						<Row className={'reid-transfer-title'} type={'flex'} justify={'space-between'}>
							<Col>已选{}项</Col>
							<Col>标题</Col>
						</Row>
					</div>
				</Col>
			</Row>
		);
	}
}

export default MultiTransfer;
