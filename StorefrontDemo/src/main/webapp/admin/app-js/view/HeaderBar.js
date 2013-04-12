/* Copyright (c) 2013 NuoDB, Inc. */

/**
 * @class App.view.HeaderBar
 */
Ext.define('App.view.HeaderBar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.headerbar',
    requires: ['App.view.MetricWell'],

    border: false,
    cls: 'nuo-header',
    enableOverflow: true,
    padding: '3 20 3 0',

    /** @Override */
    initComponent: function() {
        var me = this;
        var clickHandler = me.onViewButtonClick.bind(me);

        me.items = ['->', {
            xtype: 'container',
            layout: 'fit',
            height: '100%',
            margin: '0 8 0 8',
            items: {
                xtype: 'button',
                id: 'btnWelcome',
                itemId: 'welcome',
                iconAlign: 'left',
                iconCls: 'ico-nuodb',
                scale: 'large',
                text: App.app.title,
                enableToggle: true,
                allowDepress: false,
                pressed: true,
                handler: clickHandler
            }
        }, {
            xtype: 'container',
            layout: 'fit',
            height: '100%',
            margin: '0 4 0 0',
            items: {
                xtype: 'splitbutton',
                tooltip: 'Go shopping!',
                id: 'btnShowStore',
                itemId: 'storefront',
                iconAlign: 'top',
                iconCls: 'ico-store-48',
                scale: 'large',
                width: 80,
                enableToggle: true,
                allowDepress: false,
                handler: clickHandler,
                menu: {
                    showSeparator: false,
                    items: [{
                        text: '<b>Show Default Storefront</b>',
                        handler: clickHandler
                    }, {
                        text: 'Show Default Storefront in New Tab',
                        href: '../products',
                        hrefTarget: 'blank'
                    }]
                }
            }
        }, {
            xtype: 'metricwell',
            text: '<b>NuoDB</b> transactions/sec',
            graphVisible: false,
            metric: 'dbStats.tps',
            format: 'TBD',
            itemId: 'metrics-db',
            listeners: {
                click: clickHandler
            }
        }, {
            xtype: 'metricwell',
            text: '<b>Service</b> calls/sec',
            format: ',.0',
            metric: 'transactionStats.all.totalCountDelta',
            itemId: 'metrics-service',
            listeners: {
                click: clickHandler
            }
        }, {
            xtype: 'metricwell',
            text: '<b>Store</b> items in carts',
            metric: 'storefrontStats.all.cartItemCount',
            itemId: 'metrics-storefront',
            listeners: {
                click: clickHandler
            }
        }, {
            xtype: 'metricwell',
            text: '<b>Simulator</b> active users',
            metric: 'workloadStats.all.activeWorkerCount',
            itemId: 'metrics-simulator',
            listeners: {
                click: clickHandler
            }
        }, '->'];

        me.callParent(arguments);
        me.btnShowStore = me.down('#btnShowStore');
        me.viewButtons = Ext.ComponentQuery.query('button, metricwell', me);
    },

    getActiveViewName: function() {
        var me = this;
        for ( var i = 0; i < me.viewButtons.length; i++) {
            if (me.viewButtons[i].pressed) {
                return me.viewButtons[i].getItemId();
            }
        }
    },

    /** @private event handler */
    onViewButtonClick: function(btnActive) {
        var me = this;
        var viewName = btnActive.getItemId();
        for ( var i = 0; i < me.viewButtons.length; i++) {
            var btn = me.viewButtons[i];
            if (btn != btnActive) {
                btn.toggle(false, true);
            }
        }
        me.fireEvent('viewchange', viewName);
    }
});
