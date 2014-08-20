Ext.define('acms.view.MenuView', {
	extend: 'Ext.dataview.NestedList',
	xtype: 'menuview',
	
	config: {
		toolbar: {
			ui: 'dark'
		},
		border: '0 1 0 0',
    	style: 'border-color: black; border-style: solid;'
	}
});