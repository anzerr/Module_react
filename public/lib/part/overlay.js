var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    r.create('part.overlay', {
        getInitialState: function() {
            return ({pos: {}});
        },
        componentDidMount: function() {
            window.addEventListener('mousemove', this.mouse);
        },
        componentWillUnmount: function() {
            window.removeEventListener('mousemove', this.mouse);
        },

        mouse: function(e) {
            if (this.props.pos) {
                return;
            }

            if (this.props.move) {
                this.setState({pos: {x: Number(e.pageX), y: Number(e.pageY)}});
            } else {
                if (!this.props.children && !this.props.move) {
                    this.setState({pos: {x: Number(e.pageX), y: Number(e.pageY)}});
                }
            }
        },

        render: function() {
            var size = {height: 0, width: 0}, pos = this.props.pos || this.state.pos, show = $.defined(this.props.show) ? this.props.show : this.props.children;
            if (this.refs.box) {
                size.height = this.refs.box.offsetHeight;
                size.width = this.refs.box.offsetWidth;
            }

            return (r('div').style('abs', 'full', {pointerEvents: 'none', zIndex: 999, overflow: 'hidden'}).c(
                r('div').style('abs', {left: pos.x + 'px', top: pos.y + 'px'}).c(
                    r('div').style('anim', {
                        opacity: show ? 1 : 0,
                        //marginTop: ((size.height / 2) + (show ? 0 : 100)) + 'px',
                        marginTop: (show ? 10 : 100) + 'px',
                        //marginLeft: -(size.width / 2) + 'px'
                    }).ref('box').c(this.props.children)
                )
            ));
        }
    });
})(_App || (_App = {}));