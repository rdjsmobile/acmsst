Ext.define('demo.view.GroundServiceTicketItemEdit', {
	extend: 'Ext.Sheet',
	xtype: 'groundServiceTicketItemEdit',
	requires: [
	],
	_action: "add",
	config: {
		layout: 'fit',
		enter: 'right',
		exit: 'right',
		right: 0,
		width: '30%',
		height: '100%',
		stretchY: true,
		items: [{
			xtype : 'titlebar',
			docked : 'top',
			ui: 'light'
		}, {
			xtype: 'panel',
			scrollable : false,
			cls: 'acms-sheet',
			items: [{
				xtype: 'fieldset',
				layout: 'hbox',
				items: [{
					xtype: 'selectfield',
					name: 'serviceItem',
					label: '服务项目',
					options: [
                        {text: '牵引车', value: '牵引车'},
                        {text: '加水车', value: '加水车'},
                        {text: '污水车', value: '污水车'},
                        {text: '测试项目', value: '测试项目'}
                    ]
				}]
			}, {
				xtype: 'fieldset',
				layout: 'hbox',
				items: [{
					xtype: 'datepickerfield',
					name: 'startTime',
					label: '起始时间',
					dateFormat: 'Y-m-d'
				}]
			}, {
				xtype: 'fieldset',
				layout: 'hbox',
				items: [{
					xtype: 'datepickerfield',
					name: 'endTime',
					label: '结束时间',
					dateFormat: 'Y-m-d'
				}]
			}, {
				xtype: 'fieldset',
				layout: 'hbox',
				items: [{
					xtype: 'label',
					html: '<span>使用数量</span>',
					cls: 'x-form-label'
				}, {
					xtype: 'button',
					icon: './icons/minus_blue.ico',
					handler: function() {
						var textfield = this.getParent().child('textfield');
						var value = parseInt(textfield.getValue());
						if(isNaN(value)) {
							value = 0;
						}
						if(value > 0) {
							value -= 1;
						}
						textfield.setValue(value);
					}
				}, {
					xtype: 'textfield',
					name: 'amount'
				}, {
					xtype: 'button',
					icon: './icons/plus_blue.ico',
					docked: 'right',
					handler: function() {
						var textfield = this.getParent().child('textfield');
						var value = parseInt(textfield.getValue());
						if(isNaN(value)) {
							value = 0;
						}
						value += 1;
						textfield.setValue(value);
					}
				}]
			}, {
				xtype: 'fieldset',
				layout: 'hbox',
				items: [{
					xtype: 'selectfield',
					name: 'unit',
					label: '单位',
					options: [
                        {text: '次', value: '次'},
                        {text: '小时',  value: '小时'},
                        {text: '台次',  value: '台次'},
                        {text: '人次',  value: '人次'}
                    ]
				}]
			}, {
				xtype: 'fieldset',
				layout: 'hbox',
				height: 50,
				items: [{
					xtype: 'button',
					width: 150,
					id: 'cancelButtonId',
					text: '取消'
				}, {
					xtype: 'spacer',
					align: 'middle',
					cls: 'acms-sheet-spacer'
				}, {
					xtype: 'button',
					width: 150,
					id: 'submitButtonId',
					text: '确定'
				}]
			}]
		}],
		listeners: {
			hide: function(self, eOpts) {
				self.destroy();
			}
		}
	},
	getParams: function() {
		var serviceItem = this.down("[name=serviceItem]").getValue();
		var startTime = this.down("[name=startTime]").getFormattedValue('Y-m-d H:i:s');
		var endTime = this.down("[name=endTime]").getFormattedValue('Y-m-d H:i:s');
		var amount = this.down("[name=amount]").getValue();
		var unit = this.down("[name=unit]").getValue();
		return {
			"serviceItem": serviceItem,
			"startTime": startTime,
			"endTime": endTime,
			"amount": amount,
			"unit": unit
		}
	},
	setParams: function(params) {
		var serviceItem = params.serviceItem;
		var startTime = params.startTime;
		var endTime = params.endTime;
		var amount = params.amount;
		var unit = params.unit;
		this.down("[name=serviceItem]").setValue(serviceItem);
		this.down("[name=startTime]").setValue(Ext.Date.parse(startTime, 'Y-m-d'));
		this.down("[name=endTime]").setValue(Ext.Date.parse(endTime, 'Y-m-d'));
		this.down("[name=amount]").setValue(amount);
		this.down("[name=unit]").setValue(unit);
	}
});