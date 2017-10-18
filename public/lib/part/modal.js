var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var s = {
        long: [300, 100],
        xLong: [500, 150],
        small: [200, 300],
        slim: [250, 450],
        tall: [300, 500],
        large: [500, 400]
    }, size = {};
    for (var i in s) {
        size[i] = {
            left: 'calc(50% - ' + ((s[i][0] / 2) + 20) + 'px)',
            top: 'calc(50% - ' + ((s[i][1] / 2) + 20) + 'px)',
            width: s[i][0] + 'px',
            height: s[i][1] + 'px'
        };
    }

    r.create('part.modal', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            return (r('part.block').set({show: this.props.show}).c(
                r('div').style({
                    padding: '20px',
                    position: 'absolute',
                    background: 'white',
                    zIndex: 100
                }, size[this.props.size] || size.small).c(
                    r('div').style('full', {position: 'relative'}).c(
                        this.props.children
                    )
                )
            ));
        }
    });
})(_App || (_App = {}));