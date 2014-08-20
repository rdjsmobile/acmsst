Ext.define('acms.view.HomeView', {
    extend: 'Ext.Panel',
    xtype: 'homeview',
    requires: [
    ],
    config: {
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
    	items: [{
    		xtype: 'titlebar',
	        title: 'Home',
	        docked: 'top',
	        ui: 'light'
        }, {
    		flex: 1,
            xtype: 'component',
            html: '<center> Welcome to ACMS-Mobile</center>',
            style: 'background:white'
        }]
    }
});