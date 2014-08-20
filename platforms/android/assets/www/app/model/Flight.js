Ext.define('acms.model.Flight', {
	extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'flightNumber', type: 'string'},
            {name: 'planeNumber',  type: 'string'},
            {name: 'planeType',    type: 'string'},
            {name: 'airCode',      type: 'string'},
            {name: 'airName',      type: 'string'},
            {name: 'flightNature', type: 'string'},
            {name: 'action',       type: 'string'},
            {name: 'time',         type: 'string'}
        ]
    }
});