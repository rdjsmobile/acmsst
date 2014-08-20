(function() {
	var root = {
		id: 'root',
		text: 'Seurat Mobile',
		items: [{
			text: '航班信息',
			leaf: true,
			view: 'acms.view.FlightInfomation'
		}]
	};
	
	Ext.define('acms.store.Menu', {
		extend: 'Ext.data.TreeStore',
		alias: 'store.Menu',
		requires: ['acms.model.MenuNode'],
		config: {
			model: 'acms.model.MenuNode',
			root: root,
            defaultRootProperty: 'items'
		}
	});
})();