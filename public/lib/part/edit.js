var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.edit', {
        getInitialState: function() {
            return ({});
        },

        format: function() {
            if (this.props.type == 'checkbox') {
                return r('span').c((this.props.value) ? 'checked' : 'unchecked');
            }
            if (this.props.type == 'list') {
                var data = [];
                for (var i in this.props.value) {
                    data.push(r('div').set({key: i}).style({
                        display: 'inline-block',
                        background: 'rgb(234, 234, 234)',
                        margin: '4px',
                        padding: '4px'
                    }).c(this.props.value[i]))
                }
                return r('div').style({wordBreak: 'break-word'}).c(data);
            }
            return r('span').c((this.props.type == 'password') ? this.props.value.replace(/./g, '*') : this.props.value);
        },

        render: function() {
            if (this.props.edit) {
                return r('part.input').style('none').set(this.props).c();
            }
            return this.format();
        }
    });
})(_App || (_App = {}));