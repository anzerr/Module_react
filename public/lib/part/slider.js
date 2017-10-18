var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var box = {width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', margin: '0px 5px'};

    r.create('part.slider', {
        getInitialState: function() {
            return ({page: 0});
        },

        render: function() {
            var max = React.Children.count(this.props.children), out = [], self = this;

            for (var i = 0; i < max; i++) {
                (function(i) {
                    out.push(r('div').set({key: i}).style('anim', box, {background: (self.state.page == i) ? '#0095ff' : '#d3d3d3'}).on('click', function() {
                        self.setState({page: Number(i)});
                    }).c());
                })(i);
            }

            var page = [];
            React.Children.forEach(this.props.children, function(child) {
                page.push(r('div').set({key: page.length}).style('full', {float: 'left', width: (100 / max) + '%'}).c(child));
            });

            return (r('div').style('full', {overflow: 'hidden', position: 'relative'}).c(
                r('div').style('anim', {marginLeft: (-100 * this.state.page) + '%', width: (100 * max) + '%', height: 'calc(100% - 20px)'}).c(
                    page
                ),
                r('div').style({textAlign: 'center'}).c(out)
            ));
        }
    });
})(_App || (_App = {}));