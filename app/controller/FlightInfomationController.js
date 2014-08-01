Ext.define('demo.controller.FlightInfomationController', {
    extend: 'Ext.app.Controller',
    requires: [
    	'demo.model.Flight',
    	'demo.view.FlightSearch'
    ],
    
    config: {
        refs: {
            flightInfomation: 'flightInfomation',
            flightSearch: 'flightSearch'
        },

        control: {
        	'flightInfomation #searchButtonId': {
        		tap: function() {
        			var flightSearch = Ext.create('demo.view.FlightSearch');
        			Ext.Viewport.add(flightSearch);
					var flightInfomation = this.getFlightInfomation();
					flightSearch.show();
        		}
        	},
        	'flightInfomation > list': {
        		itemtap: function(list, index, target, record, event, eOpts) {
        			var mainView = Ext.ComponentQuery.query('mainview')[0];
        			var groundServiceTicket = Ext.create('demo.view.GroundServiceTicket');
        			var flightInfo = {
	        			time: record.get("time"),
	        			flightNumber: record.get("flightNumber"),
	        			planeNumber: record.get("planeNumber"),
	        			airName: record.get("airName"),
	        			planeType: record.get("planeType")
	        		}
		        	var store = Ext.create('Ext.data.Store', {
		        		model: 'demo.model.GroundServiceItem',
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
        	},
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
        	}
        }
    }
});
