var _App;
(function($) {
    "use strict";

    var deus = new $._deus('part'), r = deus.pub();

    var button = {
        bool: ['Cancel', 'Okay'],
        agree: ['No', 'Yes'],
        close: ['Close']
    };

    r.create('part.modal.type', {
        getInitialState: function() {
            return ({});
        },

        render: function() {
            if (!button[this.props.type]) {
                throw new Error('type is not valid');
            }

            return r('part.modal.dynamic').set({
                show: this.props.show,
                size: this.props.size,
                onClick: this.props.onClick,
                button: button[this.props.type] || [],
                style: this.props.style
            }).c(
                this.props.children
            );
        }
    });
})(_App || (_App = {}));