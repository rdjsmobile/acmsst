Ext.define('demo.controller.GroundServiceTicketController', {
    extend: 'Ext.app.Controller',
    requires: [
    	'demo.model.GroundServiceItem',
    	'demo.view.GroundServiceTicket',
    	'demo.view.GroundServiceTicketItemEdit'
    ],

    config: {
    	
        refs: {
        	groundServiceTicket: 'groundServiceTicket',
        	groundServiceTicketGrid: 'groundServiceTicket > grid',
        	groundServiceTicketItemEdit: 'groundServiceTicketItemEdit'
        },

        control: {
        	'groundServiceTicket #addButtonId': {
        		tap: function() {
        			var groundServiceTicketItemEdit = Ext.create('demo.view.GroundServiceTicketItemEdit');
        			groundServiceTicketItemEdit.child('titlebar').setTitle("添加服务项");
        			Ext.Viewport.add(groundServiceTicketItemEdit);
        			groundServiceTicketItemEdit._action = "add";
					groundServiceTicketItemEdit.show();
        		}
        	},
        	'groundServiceTicket #editButtonId': {
        		tap: function() {
        			var groundServiceTicketItemEdit = Ext.create('demo.view.GroundServiceTicketItemEdit');
        			groundServiceTicketItemEdit.child('titlebar').setTitle("编辑服务项");
        			var groundServiceTicketGrid = this.getGroundServiceTicketGrid();
        			var record = groundServiceTicketGrid.getSelection()[0];
        			var params = {
						"serviceItem": record.get("serviceItem"),
						"startTime": record.get("startTime"),
						"endTime": record.get("endTime"),
						"amount": record.get("amount"),
						"unit": record.get("unit")
        			}
        			groundServiceTicketItemEdit.setParams(params);
        			Ext.Viewport.add(groundServiceTicketItemEdit);
        			groundServiceTicketItemEdit._action = "update";
					groundServiceTicketItemEdit.show();
        		}
        	},
        	'groundServiceTicket #deleteButtonId': {
        		tap: function() {
        			var scope = this;
        			Ext.Msg.confirm("", "确定删除?", function(buttonId, value, opt) {
        				if(buttonId == 'yes') {
		        			var groundServiceTicket = scope.getGroundServiceTicket();
		    				var date = Ext.Date.format(
		    					Ext.Date.parse(groundServiceTicket._labelData.time, 'Y-m-d H:i:s'),
		    					'Y-m-d');
		    				var flightNumber = groundServiceTicket._labelData.flightNumber;
		    				var record = scope.getGroundServiceTicketGrid().getSelection()[0];
		    				var serviceItem = record.get("serviceItem");
		    				var params = {};
		    				params.date = date;
		    				params.flightNumber = flightNumber;
		    				params.serviceItem = serviceItem;
	        				Ext.Ajax.request({
        						url: global_serverAddress + "groundServiceTicket/delete",
        						method: "POST",
        						params: params,
    							useDefaultXhrHeader: false,
					    		callback: function(options, success, response) {
					    			try {
					    				if(success) {
					    					var result = Ext.JSON.decode(response.responseText);
					    					if(result.success) {
					    						Ext.Msg.alert("成功", result.operation + "成功");
					    					} else {
					    						throw {causing: result.causing}
					    					}
					    				} else {
					    					throw {causing: "通信失败"};
					    				}
					    			} catch(e) {
					    				if(e.causing) {
					    					Ext.Msg.alert("失败", e.causing);
					    				}
					    			}
					    			groundServiceTicket.setMasked(false);
    								groundServiceTicket.refresh();
					    		}
					    	});
					    	groundServiceTicket.setMasked({
					    		xtype: 'loadmask'
					    	});
        				}
        			});
        		}
        	},
        	'groundServiceTicket #backwordButtonId': {
        		tap: function() {
        			this.getGroundServiceTicket().destroy();
        		}
        	},
        	'groundServiceTicketGrid': {
        		itemtap: function() {
        			var deleteButton = Ext.getCmp('deleteButtonId'),
        				editButton = Ext.getCmp('editButtonId');
        			deleteButton.setDisabled(false);
        			editButton.setDisabled(false);
        		}
        	},
        	'groundServiceTicketItemEdit > panel > fieldset > #cancelButtonId': {
        		tap: function() {
        			this.getGroundServiceTicketItemEdit().hide();
        		}
        	},
        	'groundServiceTicketItemEdit > panel > fieldset > #submitButtonId': {
        		tap: function() {
        			var groundServiceTicket = this.getGroundServiceTicket();
    				var groundServiceTicketItemEdit = this.getGroundServiceTicketItemEdit();
    				var date = Ext.Date.format(
    					Ext.Date.parse(groundServiceTicket._labelData.time, 'Y-m-d H:i:s'),
    					'Y-m-d');
    				var flightNumber = groundServiceTicket._labelData.flightNumber;
    				var params = groundServiceTicketItemEdit.getParams();
    				params.date = date;
    				params.flightNumber = flightNumber;
    				var action = groundServiceTicketItemEdit._action;
    				this.submitParams(action, params);
        		}
        	}
        }
    },
    
    submitParams: function(action, params) {
        var groundServiceTicket = this.getGroundServiceTicket();
    	var groundServiceTicketItemEdit = this.getGroundServiceTicketItemEdit();
    	Ext.Ajax.request({
    		url: global_serverAddress + "groundServiceTicket/" + action,
    		method: "POST",
    		params: params,
    		useDefaultXhrHeader: false,
    		callback: function(options, success, response) {
    			try {
    				if(success) {
    					var result = Ext.JSON.decode(response.responseText);
    					if(result.success) {
    						Ext.Msg.alert("成功", result.operation + "成功");
    					} else {
    						throw {causing: result.causing}
    					}
    				} else {
    					throw {causing: "通信失败"};
    				}
    			} catch(e) {
    				if(e.causing) {
    					Ext.Msg.alert("失败", e.causing);
    				}
    			}
    			groundServiceTicketItemEdit.setMasked(false);
    			groundServiceTicketItemEdit.hide();
    			groundServiceTicket.refresh();
    		}
    	});
    	groundServiceTicketItemEdit.setMasked({
    		xtype: 'loadmask'
    	});
    }
});
