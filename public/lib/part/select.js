var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.select', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var self = this;

            var list = [];
            for (var i in this.props.option) {
                list.push(r('option').set({key: i, value: this.props.option[i]}).c(this.props.option[i]));
            }

            return r('select').style('none').set({value: this.props.value}).on('change', function(e) {
                if ($.is.function(self.props.onChange)) {
                    self.props.onChange(e.target.value);
                }
            }).c(list);
        }
    });
})(_App || (_App = {}));