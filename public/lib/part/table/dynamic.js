var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var k = Math.random() + '_';
    r.create('part.table.dynamic', {
        getInitialState: function() {
            return ({edit: {}, hash: {}});
        },
        style: {
            list: {maxWidth: '150px'}
        },

        custom: function(id, row, ref, map, data) {
            var self = this, key = id + '.' + row;
            if (map.name == 'Action') {
                return r('td').set({key: key}).c(
                    $.is.function(self.props.action)? self.props.action(id, row, ref, map, data) : null,
                    r('i').class((self.state.edit[id]? 'save' : 'edit') + ' icon').style('click').on('click', function() {
                        var hash = self.state.hash[id], cHash = $.json.encode(data);
                        self.state.edit[id] = $.defined(self.state.edit[id])? !self.state.edit[id] : true;
                        self.state.hash[id] = ((self.state.edit[id]) ? cHash : '');
                        self.setState({edit: self.state.edit, change: self.state.hash});

                        if ($.is.function(self.props.onEdit)) {
                            self.props.onEdit({
                                same: (hash == cHash),
                                state: self.state.edit[id],
                                id: id,
                                row: row,
                                ref: ref,
                                map: map,
                                data: data
                            });
                        }
                    }).c()
                );
            } else {
                if (map.static) {
                    return r('td').set({key: key}).c(data);
                }

                var o = {};
                for (var i in map) {
                    o[i] = map[i];
                }
                o.value = data;
                o.edit = this.state.edit[id] || false;
                return r('td').set({key: key}).style(this.style[o.type]).c(
                    r('part.edit').set(o).on('change', function(e) {
                        if ($.is.function(self.props.onChange)) {
                            self.props.value[id][ref] = e;
                            self.props.onChange(self.props.value);
                        }
                    }).c()
                );
            }
        },

        render: function() {
            for (var i in this.props.map) {
                this.props.map[i].custom = true;
            }
            this.props.map[k] = {name: 'Action', custom: true};

            return (r('part.table').set({
                extend: this.props.custom,
                head: this.props.head,
                map: this.props.map,
                value: this.props.value,
                custom: this.custom
            }).c());
        }
    });
})(_App || (_App = {}));