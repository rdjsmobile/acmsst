Ext.define('acms.model.MenuNode', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {name: 'id',          type: 'string'},
            {name: 'text',        type: 'string'},
            {name: 'limit',       type: 'auto'},
            {name: 'view',        type: 'string'}
        ]
    }
});