var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.list', {
        getInitialState: function() {
            return ({add: '', select: null});
        },

        render: function() {
            var self = this, value = [], data = [];

            for (var i in this.props.value) {
                data.push(this.props.value[i]);
                (function(i) {
                    value.push(r('div').set({key: i}).style('click', {
                        wordBreak: 'break-word',
                        display: 'inline-block',
                        background: 'rgb(234, 234, 234)',
                        position: 'relative',
                        margin: '4px',
                        padding: '4px',
                        paddingRight: '20px'
                    }).on('click', function() {
                        if (self.state.select === i) {
                            self.setState({select: null});
                            data.splice(i, 1);
                            if ($.is.function(self.props.onChange)) {
                                self.props.onChange(data);
                            }
                        } else {
                            self.setState({select: i});
                        }
                    }).c(
                        r('i').style('none', 'abs', {
                            height: '17px',
                            width: '17px',
                            right: '0px'
                        }).class('remove icon ' + ((self.state.select === i)? 'anim-spin' : '')).c(),
                        self.props.value[i]
                    ));
                })(i)
            }

            return r('span').c(
                r('div').c(
                    value
                ),
                r('div').style({marginTop: '15px'}).c(
                    r('part.input').set({value: this.state.add}).on('change', function(e) {
                        self.setState({add: e});
                    }).c(),
                    r('i').class('plus icon').style('click').on('click', function() {
                        if ($.is.function(self.props.onChange) && self.state.add != '') {
                            data.push(self.state.add);
                            self.setState({add: ''});
                            self.props.onChange(data);
                        }
                    }).c()
                )
            );
        }
    });
})(_App || (_App = {}));