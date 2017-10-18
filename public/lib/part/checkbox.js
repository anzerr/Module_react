var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.checkbox', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var self = this, value = (this.props.value) ? true : false;

            return r('span').on('click', function() {
                if ($.is.function(self.props.onChange)) {
                    self.props.onChange(!self.props.value);
                }
            }).c(r('input').style('none', {pointerEvents: 'none'}).set({type: 'checkbox', checked: value}).on('change', function() {
                // skip
            }).c());
        }
    });
})(_App || (_App = {}));