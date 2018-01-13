var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var obj = function() {
        this.event = new $.event();
    };
    obj.prototype = {
        set: function(data) {
            this.event.emit('update', data);
        },
        on: function(event, func) {
            this.event.on(event, func);
            return (this);
        },
        removeListener: function(event, func) {
            this.event.removeListener(event, func);
            return (this);
        }
    };

    var randomKey = function(length, charList) {
        var text = '', possible = charList || '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return (text);
    };

    var _handle = {};
    $.info = function(type, msg, time, s) {
        var shared = s || 'any';
        if (_handle[shared]) {
            console.log('info added');
            _handle[shared].set({
                key: randomKey(16),
                type: type || 'info',
                message: msg || 'empty',
                time: time || (10 * 1000),
                max: time || (10 * 1000)
            });
        }
    };

    var msgStyle = {
        verticalAlign: 'middle',
        verticalAlign: 'middle',
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px )'
    };
    var type = {
        success: {backgroundColor: '#67aa34'},
        error: {backgroundColor: '#f06645'},
        warn: {backgroundColor: '#efaa32'},
        info: {backgroundColor: '#4588ac'}
    }, icon = {
        success: 'checkmark icon',
        error: 'remove icon',
        warn: 'warning sign icon',
        info: 'info icon'
    }, iconStyle = {background: '#00000057', color: 'white', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', textAlign: 'center', width: '50px'};

    r.create('part.info', {
        getInitialState: function() {
            return ({data: [], now: null});
        },
        componentDidMount: function() {
            var s = this.props.shared || 'any', hook = (_handle[s]) ? _handle[s] : (_handle[s] = new obj()), self = this;
            this.setState({now: new Date().getTime(), think: setTimeout(function () {
                self.think();
            }, 1000)});
            hook.on('update', this.update);
        },
        componentWillUnmount: function() {
            var s = this.props.shared || 'any';
            if (!_handle[s]) {
                throw new Error('dont change the shared prop on tooltip they are static');
            }
            _handle[s].removeListener('update', this.update);
        },

        think: function() {
            var self = this, data = this.state.data, i = 0, now = new Date().getTime(), dif = now - this.state.now;
            while (data[i]) {
                if (data[i].time <= -5000) {
                    data.splice(i, 1);
                    i += 1;
                } else {
                    data[i].time -= dif;
                    i += 1;
                }
            }

            this.setState({now: now, think: setTimeout(function () {
                self.think();
            }, 200), data: data});
        },

        update: function(data) {
            this.state.data.push(data);
            console.log(data);
            this.setState({data: this.state.data});
        },

        render: function() {
            var o = [], self = this;

            for (var i in this.state.data) {
                (function(s, i) {
                    var d = (s.time <= 0), y = (s.time >= (s.max - 1));
                    o.push(r('div').set({key: s.key}).c(
                        r('div').style('anim', 'click', type[s.type] || {}, msgStyle, {
                            pointerEvents: 'all',
                            maxHeight: (d || y)? '0px' : '200px',
                            margin: (d || y)? '0px' : '10px 22px',
                            width: 'calc(100% - ' + (22 * 2) + 'px)',
                            //width: 'calc(100% - ' + ((d || y)? 0 : 22 * 2) + 'px)',
                            opacity: (d || y)? 0 : 1
                        }).on('click', function() {
                            for (var x in self.state.data) {
                                if (self.state.data[x].key == s.key) {
                                    self.state.data[x].time = 0;
                                    break;
                                }
                            }
                            self.setState({data: self.state.data});
                        }).c(
                            r('div').style({display: 'table'}).c(
                                r('div').style(iconStyle).c(
                                    r('i').class(icon[s.type] || '').style({margin: '0px', padding: '0px', height: '1px'}).c()
                                ),
                                r('div').style({padding: '10px', display: 'table-cell'}).c(s.message)
                            ),
                            r('div').style('anim', {background: 'black', height: '3px', marginLeft: (100 - ((s.time / s.max) * 100)) + '%', width: ((s.time / s.max) * 100) + '%' }).c()
                        )
                    ));
                })(this.state.data[i], i);
            }

            return (r('div').style('abs', 'full', {width: '25%', pointerEvents: 'none', zIndex: 997, top: '10px', right: '10px'}).c(o));
        }
    });
})(_App || (_App = {}));
