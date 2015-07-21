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
 * ProgressButton React Component.
 */
var ProgressButton = React.createClass({
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
            progressValue: 0,
            progressOpacity: 1
        };
    },

    getProgress: function() {
        return this.state.progressValue;
    },

    setProgress: function(val) {
        this.setState({progressValue: val});
    },

    start: function() {
        this.setState({
            disabled: true,
            buttonStyle: 'pbs-loading'
        });
    },

    stop: function(status) {
        status = status || 'done';

        // Display the button status after the progress bar faded out.
        var self = this;
        var on_fade = function(e) {
            if(support.transitions && e.propertyName !== 'opacity') {
                return;
            }

            // Show the button status.
            this.removeEventListener(transition_end_event, on_fade);
            self.setState({
                buttonStyle: 'pbs-' + status,
                progressValue: 0
            });

            // Come back to the initial state after props.statusTime.
            setTimeout(function() {
                self.setState({
                    disabled: false,
                    buttonStyle: 'pbs-' + self.props.pbsStyle,
                    progressOpacity: 1
                });
            }, self.props.statusTime);
        };
        React.findDOMNode(this.refs.progress).addEventListener(transition_end_event, on_fade);

        // Make the progress bar fade out.
        this.setState({progressOpacity: 0});
    },

    render: function() {
        var classes = [
            'pbs pbs-shrink',
            'pbs-' + this.props.size,
            this.state.buttonStyle,
            this.props.className
        ].join(' ');

        var progress_style = {
            opacity: this.state.progressOpacity,
            width: this.state.progressValue + '%'
        };

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
                    <span className="pbs-progress-inner" ref="progress" style={progress_style} />
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


export default ProgressButton;
