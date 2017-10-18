var _App;
(function($) {
    "use strict";
    $.util = $.util || {};

    var deus = new $._deus('part'), r = deus.pub();

    var pack = {
        base: function(r) {
            r.style('anim', {WebkitTransition: 'all 500ms ease', transition: 'all 500ms ease'});
            r.style('abs', {position: 'absolute'});
            r.style('full', {width: '100%', height: '100%'});
            r.style('click', {cursor: 'pointer'});
            r.style('none', {padding: '0px', margin: '0px'});
            r.style('pad', {marginBottom: '20px'});
            r.style('inline', {display: 'inline-block'});
        }
    };

    var color = {
        red: 'red'
    };

    $.util.style = function(type, r) {
        if (pack[type] && r) {
            return  pack[type](r);
        }
        return (null);
    };

    $.util.color = function(col) {
        return (color[col]);
    };

})(_App || (_App = {}));