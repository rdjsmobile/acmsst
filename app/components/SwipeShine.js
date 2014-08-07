Ext.define('demo.components.SwipeShine', {
    alias: 'plugin.SwipeShine',

    init: function(list) {
        list.on({
            painted: this.setupContainer,
            delay: 1000,
            scope: this
        });
    },

    setupContainer: function() {
        var firstListItem = Ext.ComponentQuery.query('ShoppingCartList component[isFirst=true]')[0];

        if (firstListItem) {
            var element = firstListItem.element
        } else {
            return;
        }

        var container = Ext.create('Ext.Container', {
            height: '100%',
            width: '100%',
            cls: 'x-list-swipe-shine',
            right: 0,
            top: 0,
            renderTo: Ext.DomHelper.append(element, '<div></div>', true)
        });

        container.on({
            painted: function() {
                container.destroy();
            },
            delay: 2000,
            scope: this
        });
    }
});