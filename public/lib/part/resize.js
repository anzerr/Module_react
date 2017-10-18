var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var path = function(e, type) {
        var t = e, id = '', dep = 0;
        while (t.parentNode) {
            if (type) {
                dep += 1;
            } else {
                var index = 0, node = t.previousElementSibling;
                while (node) {
                    index += 1;
                    node = node.previousElementSibling
                }
                id = t.tagName + '.' + index + '/' + id;
            }
            t = t.parentNode;
        }
        return ((type)? dep : id);
    };

    r.create('part.resize', {
        getInitialState: function() {
            return ({size: {}});
        },

        update: function(id, data) {
            this.state.size[id] = data;
            if ($.is.function(this.props.onResize)) {
                this.props.onResize(this.state.size[id]);
            }
            this.setState({size: this.state.size});
        },

        componentDidMount: function() {
            var self = this, observer = new MutationObserver(function(mutations) {
                for (var i in mutations) {
                    var t = mutations[i].target,  dep = path(t, true);
                    if ((self.state.dep + 1) != dep) {
                        return;
                    }

                    var id = path(t);
                    if (self.state.size[id]) {
                        if (self.state.size[id].width != t.clientWidth || self.state.size[id].height != t.clientHeight) {
                            self.update(id, {width: t.clientWidth, height: t.clientHeight});
                        }
                    } else {
                        self.update(id, {width: t.clientWidth, height: t.clientHeight});
                    }
                }
            });
            if ($.is.function(this.props.onInit)) {
                this.props.onInit({width: this.refs.box.clientWidth, height: this.refs.box.clientHeight});
            }
            observer.observe(this.refs.box, {subtree: true, attributes: true, childList: true, characterData: true});
            this.setState({observer: observer, dep: path(this.refs.box, true)})
        },

        componentWillUnmount: function() {
            if (this.state.observer) {
                this.state.observer.disconnect();
            }
        },

        render: function() {
            return (r('div').c(
                r('div').style((this.props.total)? {} : {float: 'left'}).ref('box').c(
                    this.props.children
                )
            ));
        }
    });
})(_App || (_App = {}));