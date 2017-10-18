var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var obj = function() {
        this.event = new $.event();
    };
    obj.prototype = {
        set: function(data) {
            this.event.emit('update', data);
        },
        on: function(event, func) {
            this.event.on(event, func);
            return (this);
        },
        removeListener: function(event, func) {
            this.event.removeListener(event, func);
            return (this);
        }
    };

    var _handle = {};
    $.tooltip = function(data, s) {
        var shared = s || 'any';
        if (_handle[shared]) {
            _handle[shared].set(data);
        }
    };

    r.create('part.tooltip', {
        getInitialState: function() {
            return ({data: null});
        },
        componentDidMount: function() {
            var hook = (_handle[this.props.shared]) ? _handle[this.props.shared] : (_handle[this.props.shared] = new obj());
            hook.on('update', this.update);
        },
        componentWillUnmount: function() {
            if (!_handle[this.props.shared]) {
                throw new Error('dont change the shared prop on tooltip they are static');
            }
            _handle[this.props.shared].removeListener('update', this.update);
        },

        update: function(data) {
            this.setState({data: data, last: this.state.data});
        },

        render: function() {
            return (r('part.overlay').set({move: true, show: $.defined(this.state.data)}).c(
                this.state.data || this.state.last
            ));
        }
    });
})(_App || (_App = {}));