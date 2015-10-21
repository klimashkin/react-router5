import React, { Component, PropTypes } from 'react';

function routeNode(nodeName) {
    return function routeNodeWrapper(RouteSegment) {
        class RouteNode extends Component {
            constructor(props, context) {
                super(props, context);
                this.router = context.router;
                this.nodeListener = (toState, fromState) => this.setState({ previousRoute: fromState, route: toState });
                if (!this.router.registeredPlugins.LISTENERS) {
                    throw new Error('[react-router5][RouteNode] missing plugin router5-listeners.');
                }
                this.router.addNodeListener(nodeName, nodeListener);
            }

            render() {
                const props = this.props;
                const { previousRoute, route } = this.state;
                return React.createElement(RouteSegment, {...props, previousRoute, route});
            }
        }

        RouteNode.propTypes = {
            nodeName:     PropTypes.string.isRequired,
            nodeListener: PropTypes.func
        };

        RouteNode.contextTypes = {
            router:       PropTypes.object.isRequired
        };
    };
}

export default RouteSegment;