Ext.define('acms.controller.GroundServiceTicketController', {
    extend: 'Ext.app.Controller',
    requires: [
    	'acms.model.GroundServiceItem',
    	'acms.view.GroundServiceTicket',
    	'acms.view.GroundServiceTicketItemEdit'
    ],

    config: {
    	
        refs: {
        	groundServiceTicket: 'groundServiceTicket',
        	groundServiceTicketGrid: 'groundServiceTicket > grid',
        	groundServiceTicketItemEdit: 'groundServiceTicketItemEdit',
        	addButton: 'groundServiceTicket #addButtonId',
        	editButton: 'groundServiceTicket #editButtonId',
        	deleteButton: 'groundServiceTicket #deleteButtonId'
        },

        control: {
        	'addButton': {
        		tap: function() {
        			this.showEdit('add');
        		}
        	},
        	'editButton': {
        		tap: function() {
        			var groundServiceTicketGrid = this.getGroundServiceTicketGrid();
        			var record = groundServiceTicketGrid.getSelection()[0];
        			var params = {
						"serviceItem": record.get("serviceItem"),
						"startTime": record.get("startTime"),
						"endTime": record.get("endTime"),
						"amount": record.get("amount"),
						"unit": record.get("unit")
        			}
        			this.showEdit('update', params);
        		}
        	},
        	'deleteButton': {
        		tap: function() {
		    		var record = this.getGroundServiceTicketGrid().getSelection()[0];
		    		this.deleteRecord(record);
        		}
        	},
        	'groundServiceTicket #backwordButtonId': {
        		tap: function() {
        			this.getGroundServiceTicket().destroy();
        		}
        	},
        	'groundServiceTicket #saveButtonId': {
        		tap: function() {
        			function downloadFile() {
		        		/*var fileTransfer = new FileTransfer();
						var uri = encodeURI("http://10.1.39.84:8888/phonegap/MIAGFIYR.pdf");
						var localFilePath = "/sdcard/download/MIAGFIYR.pdf";
						
						fileTransfer.download(
						    uri,
						    localFilePath,
						    function(entry) {
						        Ext.Msg.alert("", "下载成功!");
						    },
						    function(error) {
						    	alert("失败：" + JSON.stringify(error));
						    },
						    true
						);*/
        				alert("打印暂不支持");
					}
        			downloadFile();
        		}
        	},
        	'groundServiceTicket #printerButtonId': {
        		tap: function() {
        			
        		}
        	},
        	'groundServiceTicketGrid': {
        		itemtap: function() {
        			if(this.getEditButton().getDisabled()) {
        				this.getEditButton().setDisabled(false);
        				this.getDeleteButton().setDisabled(false);
        			}
        		},
        		itemswipe: function(self, index, target, record, e, eOpts ) {
	        		if(e.direction == 'right' || e.direction == 'left') {
	        			if(e.direction == 'right') {
	        				this.deleteRecord(record);
	        			}
	        			var grid = this.getGroundServiceTicketGrid();
	        			grid.select(record);
	        			if(this.getEditButton().getDisabled()) {
	        				this.getEditButton().setDisabled(false);
	        				this.getDeleteButton().setDisabled(false);
	        			}
	        		}
        		},
        		itemdoubletap: function(self, index, target, record, e, eOpts) {
        			var params = {
        				"serviceItem": record.get("serviceItem"),
						"startTime": record.get("startTime"),
						"endTime": record.get("endTime"),
						"amount": record.get("amount"),
						"unit": record.get("unit")
        			}
        			this.showEdit('update', params);
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
    
    showEdit: function(action, params) {
    	var title = action == 'add' ? '添加服务项' : '编辑服务项';
        var groundServiceTicketItemEdit = Ext.create('acms.view.GroundServiceTicketItemEdit');
        groundServiceTicketItemEdit.child('titlebar').setTitle(title);
        if(params != null) {
        	groundServiceTicketItemEdit.setParams(params);
        }
        Ext.Viewport.add(groundServiceTicketItemEdit);
        groundServiceTicketItemEdit._action = action;
		groundServiceTicketItemEdit.show();
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
    			groundServiceTicketItemEdit.hide();
    			groundServiceTicket.setMasked(false);
    			groundServiceTicket.refresh();
    		}
    	});
    	groundServiceTicket.setMasked({
    		xtype: 'loadmask'
    	});
    },
    
    deleteRecord: function(record) {
    	var scope = this;
    	Ext.Msg.confirm("", "确定删除?", function(buttonId, value, opt) {
    		if(buttonId == 'yes') {
    			var groundServiceTicket = scope.getGroundServiceTicket();
		    	var date = Ext.Date.format(
		    		Ext.Date.parse(groundServiceTicket._labelData.time, 'Y-m-d H:i:s'),
		    	'Y-m-d');
		    	var flightNumber = groundServiceTicket._labelData.flightNumber;
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
    					scope.getDeleteButton().setDisabled(true);
    					scope.getEditButton().setDisabled(true);
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
});
