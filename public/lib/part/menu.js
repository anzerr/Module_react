var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.menu', {
        getInitialState: function() {
            return ({open: false});
        },

        render: function() {
            var self = this, size = 200, show = (self.props.onClick)? this.props.open : this.state.open;
            return (r('div').style('full', 'abs').c(
                r('part.block').set({show: show}).on('click', function(e) {
                    if (self.props.onClick) {
                        self.props.onClick(e);
                    } else {
                        self.setState({open: false});
                    }
                }).c(),
                r('div').style('abs', 'anim', {
                    top: '0px',
                    left: ((!show) ? -size : 0) + 'px',
                    width: (size + 20) + 'px',
                    zIndex: 100,
                    height: '100%',
                    background: 'rgb(27, 28, 29)'
                }).c(
                    r('div').style({float: 'left', width: size + 'px', height: '100%'}).c(
                        this.props.children
                    ),
                    r('div').style({float: 'left', width: '20px', height: '20px', background: 'red'}).on('click', function(e) {
                        if (self.props.onClick) {
                            self.props.onClick(e);
                        } else {
                            self.setState({open: !self.state.open});
                        }
                    }).c('')
                )
            ));
        }
    });
})(_App || (_App = {}));