Ext.define('acms.view.MainView', {
    extend: 'Ext.Panel',
    xtype: 'mainview',
    requires: [
        'acms.view.MenuView',
        'acms.view.HomeView'
    ],
    config: {
        fullscreen: true,
        id: 'mainview_id',
		layout: {
			type: 'card',
			animation: {
				type: 'slide',
				direction: 'left',
                duration: 250
			}
		},
        items: [{
        	xtype: 'menuview',
        	docked: 'left',
        	store: 'Menu',
        	width: global_menuWidth
        }, {
        	xtype: 'homeview'
        }]
    }
});
