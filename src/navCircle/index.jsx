/**
 * Created by Season on 2017/7/17.
 */

import React from 'react'
import classNames from 'classnames'
import ReactDom from 'react-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './index.scss'
class NavShow extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.state = {
			navInfo : {},
			isShowCode: 100, // 100 为初始状态，101 显示状态， 102隐藏状态
			dragInfo: {
				left: 0,
				top: 0,
				currentX: 0,
				currentY: 0,
				flag: false,
				wBoxDis: 0,
				hBoxDis: 0
			}
		}
	}
	componentWillMount() {
		this.setState({ navInfo: this.props.navInfo })
	}
	componentDidMount() {
		document.addEventListener('mousemove', (e) => this.navMove(e), false)
		document.addEventListener('mouseup',(e)=> this.endDrag(e),false);
	}

	navMove(event) {
		const docW = document.documentElement.clientWidth,
					docH = document.documentElement.clientHeight;
		const e = event || window.event
		// e.preventDefault();

		const dragNavDOM = this._dragNav

		if ( this.state.dragInfo.flag ) {
			let nowX = e.clientX,
					nowY = e.clientY;
			let w = this.state.dragInfo.wBoxDis,
					h = this.state.dragInfo.wBoxDis
			dragNavDOM.style.right = docW - nowX - (60 - w) + 'px'
			dragNavDOM.style.bottom = docH - nowY - (60 - h) + 'px'
		}

	}

	animateToggle(itemLength, delay, isShowCode) {
		if (isShowCode === 100) this.setState({isShowCode: 101})
		if (isShowCode === 101) {
			this.setState({isShowCode: 102})
			const duration = 0.6;
			const time = ( itemLength * delay + duration ) * 1000 + 10
			setTimeout(() => {
				this.setState({ isShowCode: 100 })
			}, time)
		}
	}

	dragStart(event) {
		const e = event || window.event
		e.preventDefault()
		const dragNavDOM = ReactDom.findDOMNode(this._dragNav)
		const w = e.clientX - dragNavDOM.offsetLeft;
		const h = e.clientX - dragNavDOM.offsetTop;

		this.setState({ dragInfo: Object.assign(this.state.dragInfo, { flag: true, wBoxDis: w, hBoxDis: h }) })
	}

	endDrag(e) {
		const docW = document.documentElement.clientWidth,
					docH = document.documentElement.clientHeight;
		const dragNavDOM = ReactDom.findDOMNode(this._dragNav)

		if( dragNavDOM.offsetLeft < 175 ) {
			dragNavDOM.style.right = docW - 235 + 'px'
		}
		if( dragNavDOM.offsetTop < ( this.state.navInfo.itemList.length * (30 + 5) - 30 ) ) {
			dragNavDOM.style.bottom = docH - this.state.navInfo.itemList.length * (30 + 5) + 'px'
		}
		if( dragNavDOM.offsetTop > (docH - 60) ) {
			dragNavDOM.style.bottom = '5px'
		}
		if( dragNavDOM.offsetLeft > ( docW - 60 ) ) {
			dragNavDOM.style.right = '5px'
		}

		this.setState({ dragInfo: Object.assign(this.state.dragInfo, { flag: false }) })
	}

	render() {
		const nav = this.state.navInfo;
		const code = this.state.isShowCode;
		const delay = 0.2;
		return (
			<section ref={ dragNav => this._dragNav = dragNav } className="circle-nav" onClick={this.animateToggle.bind(this, nav.itemList.length, delay, code)} onMouseDown={ this.dragStart.bind(this) }>
				<div className="circle-main">
					<div className="circle-bd">
						{code === 100 || code === 102 ? nav.showTxt : nav.hideTxt}
					</div>
				</div>

				<div className="circle-item-list" style={{ display: code === 100 ? 'none' : 'block' }}>
					{
						nav.itemList.map((item, index) => {
							return (
								<div
									className={ classNames('item', {fadeInUp: code === 101, flipOutX: code === 102}) }
									key={index} style={{bottom: (index) * ( 30 + 5), animationDelay: ( delay * ( index + 1 ) ) + 's'}}>
									<a href={ item.link} target="_blank" onClick={ () => this.setState({ isShowCode: 100 }) }>
										• {item.txt}
									</a>
								</div>
							)
						})
					}

				</div>

			</section>
		)
	}
}

export default NavShow