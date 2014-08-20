Ext.define('acms.components.FlightInfomationListItem', {
    extend: 'Ext.dataview.component.ListItem',
    xtype: 'flightInfomationListItem',
    config: {
        layout: {
            type: 'hbox'
        },
        items: [{
        	xtype: 'panel',
        	docked: 'right',
        	layout: 'hbox',
        	items: [{
        		xtype: 'image',
	            src: './icons/input_tablet.ico',
        		name: 'detailButton',
	            width: 100,
	            style: 'background-size:50%; background-position:center;'
        	}, {
	            xtype: 'image',
	            src: './icons/printer.ico',
	            name: 'printButton',
	            width: 100,
	            style: 'background-size:50%; background-position:center;'
	        }]
        }]
    }
});