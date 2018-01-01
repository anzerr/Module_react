var _App;
(function($) {
    "use strict";

    var deus = new $._deus('shared'), r = deus.pub();

    var col = {
        green: 'rgb(198, 240, 121)',
        red: 'rgb(227, 120, 93)',
        yellow: 'rgb(255, 230, 1)',
        blue: 'rgb(190, 229, 255)'
    };

    var colorString = {
        '"OK"': 'rgb(0, 255, 0)',
        '"KO"': 'rgb(255, 0, 0)'
    };

    r.create('part.code', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var str = JSON.stringify(this.props.data, null, '\t').split('\n'), out = [];

            for (var i in str) {
                var c = (str[i].match(/\t/g) || []).length;
                str[i] = str[i].replace(/\t*/g, '');

                out.push(r('div').set({key: out.length}).style({marginLeft: c * 20}).c(
                    (function() {
                        var s = /".*?":\s/.exec(str[i]);

                        if (s == null) {
                            return (str[i]);
                        } else {
                            var left = str[i].substr(s[0].length), end = (left[left.length - 1] == ',');
                            left = (end)? left.substr(0, left.length - 1) : left;

                            var typeColor = (left[0] == '"') ? col.green : (!isNaN((parseInt(left))) ? col.red : col.yellow);
                            if (left == 'null') {
                                typeColor = col.blue;
                            }

                            return (r('span').c(
                                r('span').style({color: col.green, wordBreak: 'break-all'}).c(s[0].replace(': ', '')),
                                ': ',
                                r('span').style({color: (colorString[left]) ? colorString[left] : typeColor, wordBreak: 'break-all'}).c(left),
                                r('span').style({color: col.yellow}).c((end) ? ',' : '')
                            ));
                        }
                    })()
                ));
            }

            var s = $.schema.merge({overflowY: 'auto', height: '100%', color: col.yellow}, this.props.style || {});
            return r('div').class((this.props.font)? 'codeFont' : '').style(s).c(out);
        }
    });

})(_App || (_App = {}));
