Ext.define('acms.controller.MainController', {
    extend: 'Ext.app.Controller',
    requires: [
    ],

    config: {
    	
        refs: {
        	main: 'mainview',
            menu: 'mainview > menuview'
        },

        control: {
        	menu: {
        		leafitemtap: function(nestedlist, list, index) {
        			var record = list.getStore().getAt(index);
        			var viewNode = nestedlist.getStore().getNodeById(record.getId());
        			this.showView(viewNode);
        		}
        	}
        }
    },
    
    showView: function(viewNode) {
    	var view = this.createView(viewNode);
    	var menu = this.getMenu();
    	var main = this.getMain();
    	
    	menu.setDetailContainer(main);
        menu.setDetailCard(view);
        menu.goToNode(viewNode.parentNode);
        menu.goToLeaf(viewNode);
        menu.getActiveItem().select(viewNode);
    },
    
    createView: function(viewNode) {
    	var viewName = viewNode.get('view');
    	var mainview = this.getMain();
    	var view = null;
    	var destroys = [];
    	for(var i = 0; i < mainview.getItems().length; i++) {
    		var item = mainview.getAt(i);
    		if(item.self.getName() == viewName) {
    			view = item;
    		} else if(item.self.getName() != 'acms.view.MenuView' && item.self.getName() != 'acms.view.HomeView') {
    			destroys.push(item);
    		}
    	}
    	while(destroys.length > 0) {
    		var item = destroys.pop();
    		item.destroy();
    	}
    	
    	if(view == null) {
    		view = Ext.create(viewName);
    	}
    	
    	return view;
    }
});
