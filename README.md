# react-button-feedback
react-button-feedback is a couple of components that renders buttons with a [Ladda](http://lab.hakim.se/ladda/)-inspired feedback.
Most of the animation is made via CSS, and is heavily inspired by the [Progress Button Styles](http://tympanus.net/Development/ProgressButtonStyles/) from codrops.

Feel free to integrate or build upon it for free in your personal or commercial projetcs.
Don't republish, redistribute or sell "as-is".
Contributions are welcomed (I'm quiet open to any pull request).

# Usage
There are currently two components available: ``LoadingButton`` and ``ProgressButton``.
The former simply shows a spinner when clicked, while the latter shows a progress bar.

Both these components share the same props:

- pbsStyle: Style of the button.
	Options are ``default``, ``primary``, ``success``, ``warning`` or ``danger``
- size: The size of the button.
	Options are: ``sm``, ``md`` (default) or ``lg``
- statusTime: Time (in ms) that the - status (done or failed) will be displayed.
	During this time the button will be disabled.

You can manually start the loading animation, respectively stop it, with the methods ``start`` and ``stop``.
By default, ``start`` is called whenever the user clicks on the button.

Example:

```js
import LoadingButton from './lib/LoadingButton';

var App = React.createClass({
	render: function() {
		return (
			<LoadingButton ref="button" statusTime={3500}>
				Start an event
			</LoadingButton>
		);
	},

	_onSomeEvent: function() {
		this.refs.button.stop('failed');
	}
});
```

``ProgressButton`` has an additional method ``setProgress`` to update its progress bar.
You can also get its current progress with ``getProgress``.

