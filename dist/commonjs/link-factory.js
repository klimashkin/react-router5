'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

exports['default'] = linkFactory;

function linkFactory(router) {
    return _react2['default'].createClass({
        propTypes: {
            routeName: _react2['default'].PropTypes.string.isRequired,
            routeParams: _react2['default'].PropTypes.object,
            routeOptions: _react2['default'].PropTypes.object,
            activeClass: _react2['default'].PropTypes.string,
            onClick: _react2['default'].PropTypes.func
        },

        getDefaultProps: function getDefaultProps() {
            return {
                className: '',
                activeClass: 'active',
                routeParams: {},
                routeOptions: {},
                onClick: this.clickHandler
            };
        },

        getInitialState: function getInitialState() {
            // Initialise state
            // Not an anti-pattern
            // https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html
            return {
                active: router.isActive(this.props.routeName, this.prop.routeParams)
            };
        },

        // Is it overkill?
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return !router.areStatesEqual({ name: nextProps.routeName, params: nextProps.routeParams }, { name: this.props.routeName, params: this.props.routeParams }) || this.state.active !== nextState.active;
        },

        clickHandler: function clickHandler(evt) {
            evt.preventDefault();
            router.navigate(this.props.routeName, this.props.routeParams, this.props.options);
        },

        // Is it overkill?
        // Should it be an option to observe state in Links?
        // Should we add a GroupLink component for menus?
        routeChangeHandler: function routeChangeHandler(toState, fromState) {
            this.setState({ active: router.isActive(this.props.routeName, this.prop.routeParams) });
        },

        componentDidMount: function componentDidMount() {
            router.addListener(this.routeChangeHandler);
        },

        componentWillUnmount: function componentWillUnmount() {
            router.removeListener(this.routeChangeHandler);
        },

        render: function render() {
            var props = this.props;
            var active = this.state.active;

            var href = router.buildPath(this.props.routeName, this.props.routeParams);
            var className = props.className.split(' ').concat(active ? [activeClassName] : []).join(' ');

            return _react2['default'].CreateElement('a', { href: href, className: className, onClick: onClick });
        }
    });
}
module.exports = exports['default'];