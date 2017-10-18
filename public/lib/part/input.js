var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.input', {
        getInitialState: function() {
            return ({});
        },

        change: function(e) {
            if ($.is.function(this.props.onChange)) {
                this.props.onChange((e.target)? e.target.value : e);
            }
        },

        render: function() {
            if (this.props.type == 'password') {
                return r('part.password').set({value: this.props.value, placeholder: this.props.placeholder}).on('change', this.change).c();
            }
            if (this.props.type == 'select') {
                return r('part.select').set({value: this.props.value, option: this.props.option}).on('change', this.change).c();
            }
            if (this.props.type == 'checkbox') {
                return r('part.checkbox').set({value: this.props.value}).on('change', this.change).c();
            }
            if (this.props.type == 'list') {
                return r('part.list').set({value: this.props.value}).on('change', this.change).c();
            }
            var o = {type: this.props.type || 'input', value: this.props.value}, key = ['placeholder', 'style', 'min', 'max'];
            for (var i in key) {
                o[key[i]] = this.props[key[i]];
            }
            return r('input').style('none').set(o).on('change', this.change).c();
        }
    });
})(_App || (_App = {}));