Ext.define('demo.components.DraggableRow', {
	extend: 'Ext.grid.Row',
	xtype: 'draggableRow',
	config: {
		draggable: {
			direction: 'horizontal',
			constraint: {
				min: {x: 0, y: 0}, 
				max: {x: 100, y: 0}
			},
			listeners: {
				dragstart: {
					fn: function(draggable, e) {
						
					}
				},
				dragend: {
					fn: function(draggable, e) {
						
					}
				}
			}
		},
		listeners: {
			topchange: function(self, value, oldValue, eOpts) {
				alert(value + ", " + oldValue);
			}
		}
	}
});