var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.center', {
        getInitialState: function() {
            return ({});
        },
        componentDidMount: function() {

        },

        render: function() {
            var self = this, core = null;

            if (screen.height > this.state.height) {
                core = r('div').style({display: 'table', position: 'absolute'}, 'full').c(
                    r('div').style({display: 'table-cell', verticalAlign: 'middle'}).c(
                        r('div').style((this.props.anim)? 'anim' : null, {marginLeft: 'auto', marginRight: 'auto', width: (this.state.width || 0) + 'px'}).c(
                            r('part.resize').on('resize', function(e) {
                                //console.log(e);
                                self.setState(e);
                            }).on('init', function(e) {
                                //console.log(e);
                                self.setState(e);
                            }).c(
                                this.props.children
                            )
                        )
                    )
                );
            } else {
                core = r('part.resize').set({total: true}).on('resize', function(e) {
                    self.setState(e);
                }).on('init', function(e) {
                    self.setState(e);
                }).c(
                    this.props.children
                );
            }

            return (r('div').style('full', {position: 'relative', overflow: (screen.height > this.state.height)? 'hidden' : 'auto'}).c(
                core
            ));
        }
    });
})(_App || (_App = {}));