Ext.define('acms.view.FlightSearch', {
	extend: 'Ext.Sheet',
	xtype: 'flightSearch',
	requires: [
	],
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
			title: '航班查询',
			ui: 'light'
		}, {
			xtype: 'panel',
			scrollable : false,
			cls: 'acms-sheet',
			items : [{
				xtype : 'fieldset',
				layout: 'hbox',
				items: [{
					xtype: 'datepickerfield',
					name: 'date',
					label: '航班日期',
					labelWidth: 100,
					dateFormat: 'Y-m-d',
					value: new Date(2011, 7, 1),
					picker: {
						useTitles: true,
						yearFrom: new Date().getFullYear() - 5,
						yearTo: new Date().getFullYear() + 5,
						yearText: '年',
						monthText: '月',
						dayText: '日',
						doneButton: {
							text: '确定'
						},
						cancelButton: {
							text: '取消'
						},
						slotOrder: ['year', 'month', 'day']
					}
				}, {
					xtype: 'spacer',
					align: 'middle',
					cls: 'acms-sheet-spacer'
				}, {
					xtype: 'button',
					width: 70,
					text: '上一天',
					handler: function() {
						var dateField = this.getParent().child('datepickerfield');
						var currentDate = Ext.Date.parse(
							dateField.getFormattedValue('Y-m-d'), 'Y-m-d');
						var lastDate = Ext.Date.add(currentDate, Ext.Date.DAY, -1);
						dateField.setValue(lastDate);
					}
				}]
			}, {
				xtype: 'fieldset',
				items: [{
					xtype: 'textfield',
					name: 'flightNumber',
					label: '航班号',
					labelWidth: 100,
					value: '3U8627'
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
		var date = this.down("[name=date]").getFormattedValue('Y-m-d');
		var flightNumber = this.down("[name=flightNumber]").getValue();
		return {"date": date, "flightNumber": flightNumber};
	},
	setParams: function(params) {
		var date = params.date;
		var flightNumber = params.flightNumber;
		this.down("[name=date]").setValue(Ext.Date.parse(date, 'Y-m-d'));
		this.down("[name=flightNumber]").setValue(flightNumber);
	}
});