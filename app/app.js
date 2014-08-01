/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

var isPhone = Ext.os.deviceType == 'Phone';

Ext.application({
    name: 'demo',

    requires: [
    ],
    
    controllers: [
    	'demo.controller.MainController',
    	'demo.controller.FlightInfomationController',
    	'demo.controller.GroundServiceTicketController'
    ],

    views: [
        'demo.view.MainView',
    	'demo.view.HomeView',
        'demo.view.FlightInfomation',
        'demo.view.GroundServiceTicket'
    ],
    
    stores: [
    	'demo.store.Menu'
    ],

    launch: function() {
        Ext.getBody().removeCls('loading');
        var mainview = Ext.create('demo.view.MainView');
    }
});
