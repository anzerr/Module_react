var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.modal.dynamic', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var self = this;

            var button = [];
            for (var i in this.props.button) {
                (function(key) {
                    button.push(r('div').set({key: key}).class('ui button').style('click', {margin: '0px 10px', float: 'right'}).on('click', function() {
                        if (self.props.onClick) {
                            self.props.onClick(key.toLowerCase());
                        }
                    }).c(key))
                })(this.props.button[i]);
            }

            return r('part.modal').set({show: this.props.show, size: this.props.size}).c(
                r('div').style({height: 'calc(100% - 38px)'}).c(
                    this.props.children
                ),
                r('div').style({overflow: 'auto'}).c(button)
            );
        }
    });
})(_App || (_App = {}));