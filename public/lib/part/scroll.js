var _App;
(function($) {
    "use strict";

    var deus = new $._deus('shared'), r = deus.pub();

    r.create('part.scroll', {
        getInitialState: function() {
            return ({start: 0, bar: 0, anim: true});
        },

        _size: function(e) {
          if (e) {
              var width = e.clientWidth, height = e.clientHeight;
              return [width, height];
          }
          return null;
        },

        _update: function() {
          var inner = this._size(this.refs.inner), outer = this._size(this.refs.outer);
          if (inner && outer) {
              this.setState({size: Math.min(1, outer[1] / inner[1]), iSize: inner[1], oSize: outer[1], resize: false});
          }
        },

        componentDidMount: function() {
            var self = this, f1 = function(e) {
                if (self.state.drag) {
                    self.setState({bar: (self.state.pos - e.pageY) / self.state.oSize});
                }
            }, f2 = function(e) {
                if (self.state.drag) {
                    window.document.body.className = window.document.body.className.replace(/\snoselect/g, '').trim();
                    if (self.state.resize) {
                        console.log('resize');
                        self._update();
                    }
                    self.setState({anim: true, drag: false, resize: false});
                }
            };
            window.addEventListener('mousemove', f1);
            window.addEventListener('mouseup', f2);

            var observer = new MutationObserver(function(mutations) {
                for (var i in mutations) {
                    var t = mutations[i].target, h = t.clientHeight;

                    if (self.state.innerHeight != h && !self.state.drag) {
                        self.setState({innerHeight: h});
                        self._update();
                    } else {
                        self.setState({resize: true});
                    }
                }
            });
            observer.observe(this.refs.inner, {subtree: true, attributes: true, childList: true, characterData: true});

            this.setState({
                hookMove: f1,
                hookUp: f2,
                observer: observer,
                innerHeight: this.refs.inner.clientHeight
            });
            this._update();
        },

        componentWillUnmount: function() {
            window.removeEventListener('mousemove', this.state.hookMove);
            window.removeEventListener('mouseup', this.state.hookUp);
            if (this.state.observer) {
                this.state.observer.disconnect();
            }
        },

        render: function() {
            var self = this;
            var v = Math.max(this.state.size - 1, Math.min(0, (this.state.start + this.state.bar))), scale = v / (this.state.size - 1);

            var size = this.props.size || 10;
            var show = (this.state.oSize < this.state.iSize)? size : 0;
            var s = {
                position: 'absolute',
                top: Math.min(100 - (this.state.size * 100), Math.max(0, v * -100)) + '%',
                right: '0px',
                height: ((this.state.size || 1 ) * 100) + '%',
                width: size + 'px'
            };

            return (r('div').ref('outer').style({width: '100%', height: '100%', overflow: 'hidden', position: 'relative'}).c(
                r('div').ref('inner').on('wheel', function(e) {
                    var s = self.state.bar - (e.deltaY / 2000);
                    self.setState({bar: Math.max((self.state.oSize / self.state.iSize) - 1, Math.min(-self.state.start, s))});
                }).style((this.state.anim) ? 'anim' : '', {
                    width: 'calc(100% - ' + show + 'px)',
                    marginTop: ((show)? ((this.state.oSize - this.state.iSize) * scale) : 0) + 'px'
                }).c(this.props.children),
                r('div').style(s, (this.state.anim) ? 'anim' : '').c(
                    r('div').style('anim', {width: show + 'px', height: '100%', float: 'right'}).set({'onMouseDown': function(e) {
                        window.document.body.className += ' noselect';
                        self.setState({drag: true, start: v, pos: e.pageY, anim: false});
                        self.state.hookMove(e);
                    }}).c(
                        (this.props.slide)? this.props.slide : r('div').style('full', {background: 'white'}).c()
                    )
                )
            ));
        }
    });
})(_App || (_App = {}));
