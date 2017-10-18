var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.loader', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            return (r('part.block').set({show: ($.defined(this.props.show))? this.props.show : true}).c(
                r('div').class('anim-spin').style({
                    position: 'absolute',
                    top: 'calc(50% - 10px)',
                    left: 'calc(50% - 10px)',
                    width: '20px',
                    height: '20px',
                    //background: 'white'
                }).c(
                    r('i').style({
                        width: '20px',
                        height: '20px'
                    }).class('circle notched icon').c()
                )
            ));
        }
    });
})(_App || (_App = {}));