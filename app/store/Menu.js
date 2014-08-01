(function() {
	var root = {
		id: 'root',
		text: 'Seurat Mobile',
		items: [{
			text: '航班信息',
			leaf: true,
			view: 'demo.view.FlightInfomation'
		}]
	};
	
	Ext.define('demo.store.Menu', {
		extend: 'Ext.data.TreeStore',
		alias: 'store.Menu',
		requires: ['demo.model.MenuNode'],
		config: {
			model: 'demo.model.MenuNode',
			root: root,
            defaultRootProperty: 'items'
		}
	});
})();