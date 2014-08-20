Ext.define('acms.view.FlightInfomation', {
	extend: 'Ext.Panel',
	xtype: 'flightInfomation',
	requires: [
		'acms.model.Flight',
		'acms.components.FlightInfomationListItem'
    ],
    _store: null,
    _params: null,
    _address: global_serverAddress + "flight/search",
	config: {
		plugins: [
		
		],
		layout: 'fit',
		items: [{
			xtype: 'titlebar',
	        docked: 'top',
	        ui: 'light',
	        title: '航班信息',
	        items:[{
	        	xtype: 'button',
	            text: '查询',
	            id: 'searchButtonId',
	            iconCls: 'search',
	            cls: 'xucong',
	            ui: 'action',
	            align: 'right'
	        }]
        }, {
            xtype: 'list',
            //useHeaders: false,
            defaultType: 'flightInfomationListItem',
            loadingText: '加载中...',
            emptyText: '没有记录',
            scrollable: {
                direction: 'vertical'
            },
            plugins: [{
                xclass: 'Ext.plugin.ListPaging',
                autoPaging: true,
                loadMoreText: '加载更多中...',
                noMoreRecordsText: ' '
            }],
            cls: 'datalist-basic',
            itemTpl: '<div class="img" style="background-image: url(./icons/airplane_{action}.ico); float: left;"></div>' +
            		 //'<div class="img" style="background-image: url(./icons/printer.ico); float: right;"></div>' +
            		 //'<div class="img" style="background-image: url(./icons/input_tablet.ico); float: right;"></div>' +
            		 '<div class="content">' +
	            		 '<div class="name">{flightNumber}</div>' +
	            		 '<div class="affiliation">机号: {planeNumber}</div>' +
	            		 '<div class="affiliation">机型: {planeType}</div>' +
	            		 '<div class="affiliation">航空公司: {airCode} {airName}</div>' +
	            		 '<div class="affiliation">起降时间: {time}</div>' +
	            		 '<div class="affiliation">任务性质: {flightNature}</div>' +
            		 '</div>'
        }],
        listeners: {
	        initialize: function() {
	        	var list = this.child('list');
	        	this._store = Ext.create('Ext.data.Store', {
	        		model: 'acms.model.Flight',
				    proxy: {
				    	type: 'ajax',
				    	useDefaultXhrHeader: false,
				    	url: this._address,
				    	reader: {
				    		type: 'json',
				    		rootProperty: 'flightList'
				    	}
				    }
				});
				list.setStore(this._store);
	        }
        }
	}
});