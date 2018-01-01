var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.block', {
        getInitialState: function() {
            return ({});
        },
        render: function() {
            var d = r('div').style('abs', 'full', 'anim', {
                pointerEvents: (this.props.show) ? 'all' : 'none',
                opacity: (this.props.show) ? 1 : 0,
                zIndex: 99,
                background: 'rgba(0, 0, 0, 0.5)',
                width: '100%',
                height: '100%',
                position: 'absolute',
                bottom: '0px',
                right: '0px'
            }, this.props.style);

            for (var i in this.props) {
                if (i.match(/^on/)) {
                    var t = i.replace('on', '');
                    d.on(t, this.props[i]);
                }
            }

            return (d.c(
                this.props.children
            ));
        }
    });
})(_App || (_App = {}));