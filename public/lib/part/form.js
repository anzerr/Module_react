var _App;
(function($) {
    "use strict";

    var deus = new $._deus('shared'), r = deus.pub();

    r.create('part.form', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            var form = [], self = this;

            for (var i in this.props.form)  {
                (function(f) {
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

            return r('div').style('full', this.props.style).c(
                r('part.scroll').set({
                    slide: r('div').style('full', {background: 'rgb(169, 169, 169)', borderRadius: '3px', margin: '2px'}).c()
                }).c(form)
            );
        }
    });

})(_App || (_App = {}));
