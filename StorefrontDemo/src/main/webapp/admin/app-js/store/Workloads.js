/* Copyright (c) 2013 NuoDB, Inc. */

Ext.define('App.store.Workloads', {
    extend: 'Ext.data.Store',
    model: 'App.model.Workload',
    proxy: 'memory'
});
