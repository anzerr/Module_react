var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var base = {overflow: 'hidden', minHeight: '32px', zIndex: 10};

    r.create('part.json', {
        getInitialState: function() {
            return ({active: false, height: null});
        },

        render: function() {
            var self = this, elem = this.refs.box;

            var error = '';
            try {
                JSON.parse(this.props.value);
            } catch(e) {
                error = e.toString();
            }

            var data = $.json.parse(this.props.value), line = 19.2;
            var show = (!this.state.active && data), cur = (this.props.value.match(/\n/g) || []).length + 1;
            var height = Math.max(32, (this.state.height)? this.state.height : (cur * line));
            return r('div').style({position: 'relative', width: '100%', height: height + 'px'}).c(
                r('part.block').style({pointerEvents: 'none'}).set({show: this.state.show}).c(
                    r('part.center').c(
                        r('div').style({width: '400px', textAlign: 'center', color: 'white'}).c(error)
                    )
                ),
				r('textarea').style('full', 'anim', base, {
                    height: height + 'px',
                    color: (data) ? 'black' : 'red',
                    opacity: show ? 0 : 1
                }, this.props.style).set({
                    value: (data && !this.state.active)? JSON.stringify(data, null, '\t') : this.props.value
                }).on('focus', function() {
                    self.setState({active: true, show: false});
				}).on('blur', function() {
                    self.setState({active: false});
                    if (!data) {
                        self.setState({show: true});
                    }
                    if ($.is.function(self.props.onChange) && data) {
                        var d = JSON.stringify(data, null, '\t');
                        self.setState({height: ((d.match(/\n/g) || []).length + 1) * line});
                        self.props.onChange(d);
                    }
				}).on('change', function(e) {
                    if ($.is.function(self.props.onChange)) {
                        var d = e.target.value;
                        self.setState({height: ((d.match(/\n/g) || []).length + 1) * line});
                        self.props.onChange(d);
                    }
                }).c(),
                r('div').style('abs', 'anim', {minHeight: height + 'px', border: '1px solid black', width: '100%', pointerEvents: 'none', opacity: show ? 1 : 0, top: '0px', left: '0px'}).c(
                    r('part.code').set({data: data, space: 32}).c()
                )
			);
        }
    });
})(_App || (_App = {}));
