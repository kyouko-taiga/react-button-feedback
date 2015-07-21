require('browsernizr/test/css/animations');
require('browsernizr/lib/prefixed');

var Modernizr = require('browsernizr');
var React = require('react');


// Check for CSS animation support.
var support = {
    transitions: Modernizr.csstransitions,
    transforms3d : Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d
};

// Define the transition name for the current browser.
var transition_end_events = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd',
    'transition': 'transitionend'
};
var transition_end_event = transition_end_events[Modernizr.prefixed('transition')];


/**
 * LoadingButton React Component.
 */
var LoadingButton = React.createClass({
    propTypes: {
        // Style of the button.
        // Options are: default, primary, success, warning or danger.
        pbsStyle: React.PropTypes.string,

        // The size of the button.
        // Options are: sm, md (default) or lg
        size: React.PropTypes.string,

        // Time in ms that the status (done or failed) will be displayed.
		// During this time the button will be disabled.
        statusTime: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            disabled: false,
            loading: false,
            pbsStyle: 'default',
            size: 'md',
            statusTime: 2500
        };
    },

    getInitialState: function() {
        return {
            disabled: this.props.disabled,
            buttonStyle: 'pbs-' + this.props.pbsStyle,
            loading: false
        };
    },

    start: function() {
        this.setState({
            disabled: true,
            loading: true,
            buttonStyle: 'pbs-loading'
        });
    },

    stop: function(status) {
        status = status || 'done';

        this.setState({
            buttonStyle: 'pbs-' + status,
            loading: false
        });

        // Come back to the initial state after props.statusTime.
        var self = this;
        setTimeout(function() {
            self.setState({
                disabled: false,
                buttonStyle: 'pbs-' + self.props.pbsStyle,
            });
        }, self.props.statusTime);
    },

    render: function() {
        var classes = [
            'pbs pbs-loading-spinner',
            'pbs-' + this.props.size,
            this.state.buttonStyle,
            this.props.className
        ].join(' ');

        if (this.state.loading) {
            var spinner = <i className="fa fa-spinner fa-spin"></i>;
        } else {
            var spinner = null;
        }
        

        return (
            <button
                {...this.props}
                type={this.props.type || 'button'} className={classes}
                disabled={this.state.disabled} onClick={this._onClick}
            >
                <span className="pbs-content">
                    {this.props.children}
                </span>
                <span className="pbs-progress">
                    {spinner}
                </span>
            </button>
        );        
    },

    _onClick: function(e) {
        e.preventDefault();
        this.start();
        this.props.onClick(e);
    }
});


export default LoadingButton;
