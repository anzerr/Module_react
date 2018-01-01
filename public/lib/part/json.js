var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.json', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var self = this, value = (this.props.value) ? true : false;

            return r('div').style({position: 'relative'}).c(
				r('textarea').style(this.props.style).on('', function() {
					
				}).c()
			);
        }
    });
})(_App || (_App = {}));