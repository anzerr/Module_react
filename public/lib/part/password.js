var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.password', {
        getInitialState: function() {
            return ({show: false});
        },

        render: function() {
            var self = this;
            return (r('div').class('ui input').style({position: 'relative', overflow: 'hidden', width: '100%'}).c(
                r('input').style('none', {width: '100%', padding: '10px'}).set({
                    placeholder: this.props.placeholder || '',
                    type: (this.state.show) ? 'text' : 'password',
                    value: this.props.value
                }).on('change', function(e) {
                    if ($.is.function(self.props.onChange)) {
                        self.props.onChange(e.target.value);
                    }
                }).c(),
                r('div').style('abs', 'anim', 'click', {top: '0px', right: ((this.state.show)? 0 : -50) + 'px', margin: '10px'}).on('click', function() {
                    self.setState({show: false});
                }).c('Hide'),
                r('div').style('abs', 'anim', 'click', {top: '0px', right: ((this.state.show)? -50 : 0) + 'px', margin: '10px'}).on('click', function() {
                    self.setState({show: true});
                }).c('Show')
            ));
        }
    });
})(_App || (_App = {}));