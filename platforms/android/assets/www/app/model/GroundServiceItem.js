Ext.define('acms.model.GroundServiceItem', {
	extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'serviceItem', type: 'string'},
            {name: 'startTime',   type: 'string'},
            {name: 'endTime',     type: 'string'},
            {name: 'amount',      type: 'string'},
            {name: 'unit',        type: 'string'}
        ]
    }
});