(function() {
var panelWidth = window.innerWidth - global_menuWidth;
var columnsWidth = [
	panelWidth * 0.2,
	panelWidth * 0.3,
	panelWidth * 0.3,
	panelWidth * 0.1,
	panelWidth * 0.1
]
	
Ext.define('acms.view.GroundServiceTicket', {
	extend: 'Ext.Panel',
	xtype: 'groundServiceTicket',
    requires: [
    	'acms.model.GroundServiceItem',
        'Ext.grid.Grid'
    ],
    _address: global_serverAddress + "groundServiceTicket",
    _labelData: null,
    config: {
		layout: {
			type: 'fit'
		},
    	items: [{
    		xtype: 'titlebar',
	        title: '地面服务单',
	        docked: 'top',
	        ui: 'light'
        }, {
        	xtype: 'grid',
            titleBar: null,
            scrollable: {
            	direction: 'vertical'
            },
            columns: [
                { text: '服务项目', dataIndex: 'serviceItem', sortable: false, width: columnsWidth[0]},
                { text: '起始时间', dataIndex: 'startTime', sortable: false, width: columnsWidth[1]},
                { text: '终止时间', dataIndex: 'endTime', sortable: false, width: columnsWidth[2]},
                { text: '使用数量', dataIndex: 'amount', sortable: false, width: columnsWidth[3]},
                { text: '单位', dataIndex: 'unit', sortable: false, width: columnsWidth[4]}
            ],
            items: [{
	        	xtype: 'panel',
	        	docked: 'top',
	        	layout: 'hbox',
	        	padding: '10 40 10 40',
				cls: 'acms-sheet',
				items: [{
					xtype: 'panel',
					layout: 'vbox',
					width: panelWidth * 0.4,
					items: [{
	        			xtype: 'label',
	        			id: 'timeLabelId',
	        			data: {
	        				time: null
	        			},
			        	tpl: '航班日期: {time}'
			        }, {
	        			xtype: 'label',
	        			id: 'airNameLabelId',
	        			data: {
	        				airName: null
	        			},
			        	tpl: '航空公司: {airName}'
			        }]
				}, {
					xtype: 'panel',
					layout: 'vbox',
					width: panelWidth * 0.3,
					items: [{
			       		xtype: 'label',
			       		id: 'flightNumberLabelId',
	        			data: {
	        				flightNumber: null
	        			},
			       		tpl: '航班号: {flightNumber}'
			       	}]
				}, {
					xtype: 'panel',
					layout: 'vbox',
					width: panelWidth * 0.2,
					items: [{
			       		xtype: 'label',
			       		id: 'planeNumberLabelId',
	        			data: {
	        				planeNumber: null
	        			},
			       		tpl: '机号: {planeNumber}'
		        	}, {
			       		xtype: 'label',
			       		id: 'planeTypeLabelId',
	        			data: {
	        				planeType: null
	        			},
			       		tpl: '机型: {planeType}'
		        	}]
				}]
	        }, {
            	xtype: 'panel',
				layout: 'hbox',
				docked: 'bottom',
        		margin: '0 200 0 200',
				items: [{
					xtype: 'button',
					id: 'deleteButtonId',
					ui: 'plain',
					iconCls: 'delete',
					disabled: true
				}, {
					xtype: 'spacer'
				}, {
					xtype: 'button',
					id: 'editButtonId',
					ui: 'plain',
					iconCls: 'compose',
					disabled: true
				}, {
					xtype: 'spacer'
				}, {
					xtype: 'button',
					id: 'addButtonId',
					ui: 'plain',
					iconCls: 'add'
				}]
            }]
        }, {
        	xtype: 'panel',
        	docked: 'bottom',
        	layout: 'hbox',
        	margin: '5 40 5 40',
        	items: [{
        		xtype: 'button',
        		id: 'backwordButtonId',
        		width: 50,
        		height: 40,
        		style: 'background-image: url(./icons/backward.ico);background-repeat:no-repeat; background-size:30px; background-position: center;'
        	}, {
        		xtype: 'spacer'
        	}, {
        		xtype: 'button',
        		id: 'saveButtonId',
        		width: 50,
        		height: 40,
        		style: 'background-image: url(./icons/save.ico);background-repeat:no-repeat; background-size:30px; background-position: center;'
        	}, {
        		xtype: 'spacer'
        	}, {
        		xtype: 'button',
        		id: 'printerButtonId',
        		width: 50,
        		height: 40,
        		style: 'background-image: url(./icons/printer.ico);background-repeat:no-repeat; background-size:30px; background-position: center;'
        	}]
        }]
    },
    setLabelData: function(data) {
    	var timeLabel = Ext.getCmp('timeLabelId'),
    		flightNumberLabel = Ext.getCmp('flightNumberLabelId'),
    		planeNumberLabel = Ext.getCmp('planeNumberLabelId'),
    		airNameLabel = Ext.getCmp('airNameLabelId'),
    		planeTypeLabel = Ext.getCmp('planeTypeLabelId');
    	timeLabel.setData(data);
    	flightNumberLabel.setData(data);
    	planeNumberLabel.setData(data);
    	airNameLabel.setData(data);
    	planeTypeLabel.setData(data);
    	this._labelData = data;
    },
    getLabelData: function() {
    	return this._labelData;
    },
    refresh: function() {
    	var grid = this.down('grid');
    	grid.getStore().load();
    }
});
}());