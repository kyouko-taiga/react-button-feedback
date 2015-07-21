import React from 'react';

import LoadingButton from './lib/LoadingButton';
import ProgressButton from './lib/ProgressButton';

console.log(LoadingButton == ProgressButton)
console.log(ProgressButton);


var App = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Loading button</h2>
                <LoadingButton ref="loadingButton" onClick={this._onLoadingClick}>
                    Click me!
                </LoadingButton>

                <h2>Progress button</h2>
                <ProgressButton ref="progressButton" onClick={this._onProgressClick}>
                    Click me!
                </ProgressButton>
            </div>
        );
    },

    _onLoadingClick: function(e) {
        var self = this;
        setTimeout(function() {
            self.refs.loadingButton.stop();
        }, 2000);
    },

    _onProgressClick: function(e) {
        var self = this;
        var update = function() {
            var progress = self.refs.progressButton.getProgress();
            self.refs.progressButton.setProgress(progress + 5);

            if (progress < 100) {
                setTimeout(update, 100)
            } else {
                self.refs.progressButton.stop('failed');
            }
        }

        update();
    }
});

React.render(
    <App />,
    document.getElementById('app-container')
);
