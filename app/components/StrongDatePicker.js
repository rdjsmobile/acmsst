Ext.define('demo.components.StrongDatePicker', {
	extend: 'Ext.picker.Date',
	xtype: 'strongDatePicker',
	config: {
		toolbar: {
			xtype: 'toolbar',
			items: [{
				text: 'Today',
				handler: function() {
					var picker = this.getParent().getParent();
					picker.setValueAnimated(new Date());
				}
			}]
		}
	}
});