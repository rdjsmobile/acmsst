Ext.define('acms.controller.FlightInfomationController', {
    extend: 'Ext.app.Controller',
    requires: [
    	'acms.model.Flight',
    	'acms.view.FlightSearch'
    ],
    
    config: {
        refs: {
            flightInfomation: 'flightInfomation',
            flightSearch: 'flightSearch'
        },

        control: {
        	'flightInfomation #searchButtonId': {
        		tap: function() {
        			var flightSearch = Ext.create('acms.view.FlightSearch');
        			Ext.Viewport.add(flightSearch);
					var flightInfomation = this.getFlightInfomation();
					flightSearch.show();
        		}
        	},
        	/*'flightInfomation > list': {
        		itemtap: function(list, index, target, record, event, eOpts) {
        			this.showGroundServiceTicket(record);
        		}
        	},*/
        	'flightSearch > panel > fieldset > #cancelButtonId': {
        		tap: function() {
        			this.getFlightSearch().hide();
        		}
        	},
        	'flightSearch > panel > fieldset > #submitButtonId': {
        		tap: function() {
        			var flightInfomation = this.getFlightInfomation();
        			var flightSearch = this.getFlightSearch();
        			var params = flightSearch.getParams();
        			flightInfomation._store.setParams(params);
        			flightInfomation._store.loadPage(1);
        			flightInfomation._params = params;
        			flightSearch.hide();
        		}
        	},
        	'flightInfomation > list image[name=detailButton]': {
        		tap: function(self) {
        			var record = self.getParent().getParent().getRecord();
        			this.showGroundServiceTicket(record);
        		}
        	},
        	'flightInfomation > list image[name=printButton]': {
        		tap: function(self) {
        			alert("打印暂不支持");
        		}
        	}
        }
    },
    
    showGroundServiceTicket: function(record) {
        var mainView = Ext.ComponentQuery.query('mainview')[0];
        var groundServiceTicket = Ext.create('acms.view.GroundServiceTicket');
        var flightInfo = {
	        time: record.get("time"),
	        flightNumber: record.get("flightNumber"),
	        planeNumber: record.get("planeNumber"),
	        airName: record.get("airName"),
	        planeType: record.get("planeType")
	    }
		var store = Ext.create('Ext.data.Store', {
		    model: 'acms.model.GroundServiceItem',
			proxy: {
				type: 'ajax',
				useDefaultXhrHeader: false,
				url: groundServiceTicket._address,
				reader: {
					type: 'json',
					rootProperty: 'serviceItemList'
				}
			},
			params: {
	        	date: record.get("time"),
	        	flightNumber: record.get("flightNumber")
			}
		});
	    groundServiceTicket.setLabelData(flightInfo);
        mainView.add(groundServiceTicket);
        groundServiceTicket.show();
		var grid = groundServiceTicket.down('grid');
		grid.setStore(store);
		store.load();
		grid.refresh();
    }
});
