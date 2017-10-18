var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.table', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var body = [], head = [];

            if ($.is.function(this.props.head)) {
                head = this.props.head();
            } else {
                for (var i in this.props.map) {
                    head.push(r('th').set({key: i}).c(this.props.map[i].name));
                }
            }

            for (var x in this.props.value) {
                var count = 0, row = [];
                for (var i in this.props.map) {
                    if (this.props.map[i].custom && $.is.function(this.props.custom)) {
                        row.push(this.props.custom(x, count, i, this.props.map[i], this.props.value[x][i] || this.props.value[x]));
                    } else {
                        row.push(r('td').set({key: x + '.' + count}).c(this.props.value[x][i]));
                    }
                    count += 1;
                }
                body.push(r('tr').set({key: x}).c(row));
            }

            if ($.is.function(this.props.extend)) {
                body.push(this.props.extend());
            }

            return (r('table').class('ui celled table').c(
                r('thead').c(r('tr').c(head)),
                r('tbody').c(body)
            ));
        }
    });
})(_App || (_App = {}));