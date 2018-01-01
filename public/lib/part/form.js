var _App;
(function($) {
    "use strict";

    var deus = new $._deus('shared'), r = deus.pub();

    var t = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '1px',
        height: '1px',
        padding: '0px',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        background: 'rgba(0, 0, 0, 0)',
        pointerEvents: 'none',
        color: 'rgba(0, 0, 0, 0)',
        overflow: 'hidden'
    };

    r.create('part.form', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var form = [], self = this;

            var data = {};
            for (var i in this.props.form)  {
                (function(f) {
                    data[f.key] = self.props.value[f.key] || '';
                    form.push(r('div').set({key: f.key}).c(
                        r('div').style({width: '100%', margin: '2px'}).c(f.name),
                        r('div').style('pad', {width: '100%'}).class('ui input').c(
                            r('part.input').set({type: f.type, value: self.props.value[f.key] || '', placeholder: f.placeholder}).on('change', function(e) {
                                self.props.value[f.key] = e;
                                if ($.is.function(self.props.onChange)) {
                                    self.props.onChange(self.props.value);
                                }
                            }).c()
                        ),
                    ));
                })(this.props.form[i] || {});
            }

            var p = this.state.paste;
            console.log(data);
    		return r('div').style('full', this.props.style).c(
                r('textarea').set({ref: 'data', readOnly: true, value: btoa($.json.encode(data))}).style(t).c(),
                r('part.scroll').set({
                    slide: r('div').style('full', {background: 'rgb(169, 169, 169)', borderRadius: '3px', margin: '2px'}).c()
                }).c(
    				r('div').style({position: 'relative'}).c(
                        r('div').style('full', 'abs', {pointerEvents: p? 'inherit' : 'none', opacity: p? 1 : 0}).c(
                            r('div').style({
                                padding: '10px',
                                position: 'absolute',
                                background: 'white',
                                boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                zIndex: 100
                            }, {
                                left: '50px',
                                top: '50px',
                                width: 'calc(100% - 100px)',
                                height: 'calc(100% - 100px)'
                            }).c(
                                r('div').style('full', 'anim', {position: 'relative', padding: '1px'}).c(
                                    r('div').style('abs', {zIndex: 10, top: '0px', right: '0px'}).c(
                						r('i').class('remove icon').on('click', function() {
                                            self.setState({paste: false});
                                        }).c()
                					),
                                    r('div').style('full', {height: 'calc(100% - 76px)', margin: '20px 0px 10px 0px'}).c(
                                        r('textarea').set({value: this.state.pasteData || ''}).style('full').on('change', function(e) {
                                            self.setState({pasteData: e.target.value});
                                        }).c()
                                    ),
                                    r('div').style({overflow: 'auto'}).c(
                                        r('div').class('ui button').style('click', {margin: '0px 10px', float: 'right'}).on('click', function() {
                                            var a = $.json.parse(atob(self.state.pasteData));
                                            if (a && $.is.function(self.props.onChange)) {
                                                self.props.onChange(a);
                                            }
                                            self.setState({paste: false, pasteData: ''});
                                        }).c('Apply')
                                    )
                                )
                            )
                        ),
            			r('div').style({pointerEvents: p? 'none' : 'inherit', padding: '1px', filter: 'blur(' + (p? 2 : 0) + 'px)'}).c(
        					r('div').style('abs', {zIndex: 10, top: '0px', right: '0px'}).c(
        						r('i').class('paste icon').style('click').on('click', function() {
                                    self.setState({paste: true});
                                }).c(),
                                r('i').class('copy icon').style('click').on('click', function() {
                                    if (self.refs.data) {
                                        self.refs.data.select();
                                        document.execCommand('copy');
                                    }
                                }).c()
        					),
        					form
                        )
    				)
    			)
            );
        }
    });

})(_App || (_App = {}));
