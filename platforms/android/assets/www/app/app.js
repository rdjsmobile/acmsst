Ext.application({
    name: 'acms',

    requires: [
    ],
    
    controllers: [
    	'acms.controller.MainController',
    	'acms.controller.FlightInfomationController',
    	'acms.controller.GroundServiceTicketController'
    ],

    views: [
        'acms.view.MainView'
    ],
    
    stores: [
    	'acms.store.Menu'
    ],

    launch: function() {
        var mainview = Ext.create('acms.view.MainView');
    }
});
