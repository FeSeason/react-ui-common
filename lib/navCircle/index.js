'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

require('./index.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavShow = function (_React$Component) {
	_inherits(NavShow, _React$Component);

	function NavShow(props, context) {
		_classCallCheck(this, NavShow);

		var _this = _possibleConstructorReturn(this, (NavShow.__proto__ || Object.getPrototypeOf(NavShow)).call(this, props, context));

		_this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
		_this.state = {
			navInfo: {},
			isShowCode: 100,
			dragInfo: {
				left: 0,
				top: 0,
				currentX: 0,
				currentY: 0,
				flag: false,
				wBoxDis: 0,
				hBoxDis: 0
			}
		};
		return _this;
	}

	_createClass(NavShow, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setState({ navInfo: this.props.navInfo });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			document.addEventListener('mousemove', function (e) {
				return _this2.navMove(e);
			}, false);
			document.addEventListener('mouseup', function (e) {
				return _this2.endDrag(e);
			}, false);
		}
	}, {
		key: 'navMove',
		value: function navMove(event) {
			var docW = document.documentElement.clientWidth,
			    docH = document.documentElement.clientHeight;
			var e = event || window.event;


			var dragNavDOM = this._dragNav;

			if (this.state.dragInfo.flag) {
				var nowX = e.clientX,
				    nowY = e.clientY;
				var w = this.state.dragInfo.wBoxDis,
				    h = this.state.dragInfo.wBoxDis;
				dragNavDOM.style.right = docW - nowX - (60 - w) + 'px';
				dragNavDOM.style.bottom = docH - nowY - (60 - h) + 'px';
			}
		}
	}, {
		key: 'animateToggle',
		value: function animateToggle(itemLength, delay, isShowCode) {
			var _this3 = this;

			if (isShowCode === 100) this.setState({ isShowCode: 101 });
			if (isShowCode === 101) {
				this.setState({ isShowCode: 102 });
				var duration = 0.6;
				var time = (itemLength * delay + duration) * 1000 + 10;
				setTimeout(function () {
					_this3.setState({ isShowCode: 100 });
				}, time);
			}
		}
	}, {
		key: 'dragStart',
		value: function dragStart(event) {
			var e = event || window.event;
			e.preventDefault();
			var dragNavDOM = _reactDom2.default.findDOMNode(this._dragNav);
			var w = e.clientX - dragNavDOM.offsetLeft;
			var h = e.clientX - dragNavDOM.offsetTop;

			this.setState({ dragInfo: Object.assign(this.state.dragInfo, { flag: true, wBoxDis: w, hBoxDis: h }) });
		}
	}, {
		key: 'endDrag',
		value: function endDrag(e) {
			var docW = document.documentElement.clientWidth,
			    docH = document.documentElement.clientHeight;
			var dragNavDOM = _reactDom2.default.findDOMNode(this._dragNav);

			if (dragNavDOM.offsetLeft < 175) {
				dragNavDOM.style.right = docW - 235 + 'px';
			}
			if (dragNavDOM.offsetTop < this.state.navInfo.itemList.length * (30 + 5) - 30) {
				dragNavDOM.style.bottom = docH - this.state.navInfo.itemList.length * (30 + 5) + 'px';
			}
			if (dragNavDOM.offsetTop > docH - 60) {
				dragNavDOM.style.bottom = '5px';
			}
			if (dragNavDOM.offsetLeft > docW - 60) {
				dragNavDOM.style.right = '5px';
			}

			this.setState({ dragInfo: Object.assign(this.state.dragInfo, { flag: false }) });
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var nav = this.state.navInfo;
			var code = this.state.isShowCode;
			var delay = 0.2;
			return _react2.default.createElement(
				'section',
				{ ref: function ref(dragNav) {
						return _this4._dragNav = dragNav;
					}, className: 'circle-nav', onClick: this.animateToggle.bind(this, nav.itemList.length, delay, code), onMouseDown: this.dragStart.bind(this) },
				_react2.default.createElement(
					'div',
					{ className: 'circle-main' },
					_react2.default.createElement(
						'div',
						{ className: 'circle-bd' },
						code === 100 || code === 102 ? nav.showTxt : nav.hideTxt
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'circle-item-list', style: { display: code === 100 ? 'none' : 'block' } },
					nav.itemList.map(function (item, index) {
						return _react2.default.createElement(
							'div',
							{
								className: (0, _classnames2.default)('item', { fadeInUp: code === 101, flipOutX: code === 102 }),
								key: index, style: { bottom: index * (30 + 5), animationDelay: delay * (index + 1) + 's' } },
							_react2.default.createElement(
								'a',
								{ href: item.link, target: '_blank', onClick: function onClick() {
										return _this4.setState({ isShowCode: 100 });
									} },
								'\u2022 ',
								item.txt
							)
						);
					})
				)
			);
		}
	}]);

	return NavShow;
}(_react2.default.Component);

exports.default = NavShow;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map