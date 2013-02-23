require('ember-data/core');
require('ember-data/system/adapter');
require('ember-data/serializers/json_serializer');

var get = Ember.get;

DS.PouchAdapter = DS.Adapter.extend({

  serializer: DS.JSONSerializer,

  init: function() {
    this._super.apply(this, arguments);

    var self = this;
    var conn = new Pouch('idb://test', function(err, db) {
      self._db = db;
    });
  },

  /*
    Adapter methods
  */
  generateIdForRecord: function(store, record) {
    return Ember.guidFor(record);
  },

  find: function(store, type, id) {
    var self = this;

    this._db.get(id, function(err, response) {
      self.didFindRecord(store, type, response, id);
    });
    // var fixtures = this.fixturesForType(type),
    //     fixture;

    // Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    // if (fixtures) {
    //   fixture = Ember.A(fixtures).findProperty('id', id);
    // }

    // if (fixture) {
    //   this.simulateRemoteCall(function() {
    //     this.didFindRecord(store, type, fixture, id);
    //   }, this);
    // }
  },

  findMany: function(store, type, ids) {
    Ember.assert("Implement me", false);
    // var fixtures = this.fixturesForType(type);

    // Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    // if (fixtures) {
    //   fixtures = fixtures.filter(function(item) {
    //     return ids.indexOf(item.id) !== -1;
    //   });
    // }

    // if (fixtures) {
    //   this.simulateRemoteCall(function() {
    //     this.didFindMany(store, type, fixtures);
    //   }, this);
    // }
  },

  findAll: function(store, type) {
    Ember.assert("Implement me", false);
    // var fixtures = this.fixturesForType(type);

    // Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    // this.simulateRemoteCall(function() {
    //   this.didFindAll(store, type, fixtures);
    // }, this);
  },

  findQuery: function(store, type, query, array) {
    Ember.assert("Implement me", false);
    // var fixtures = this.fixturesForType(type);

    // Ember.assert("Unable to find fixtures for model type "+type.toString(), !!fixtures);

    // fixtures = this.queryFixtures(fixtures, query, type);

    // if (fixtures) {
    //   this.simulateRemoteCall(function() {
    //     this.didFindQuery(store, type, fixtures, array);
    //   }, this);
    // }
  },

  createRecord: function(store, type, record) {
    Ember.assert("Implement me", false);

    var data = this.serialize(record);

    this._db.put(data, function(err, response) {
      if (err) {
        this.didError(store, type, record);
      } else {
        Ember.run(this, function() {
          this.didCreateRecord(store, type, record, json);
        });
      }
    })

    // var fixture = this.mockJSON(type, record);

    // fixture.id = this.generateIdForRecord(store, record);

    // this.simulateRemoteCall(function() {
    //   this.didCreateRecord(store, type, record, fixture);
    // }, this);
  },

  updateRecord: function(store, type, record) {
    Ember.assert("Implement me", false);
    // var fixture = this.mockJSON(type, record);

    // this.simulateRemoteCall(function() {
    //   this.didUpdateRecord(store, type, record, fixture);
    // }, this);
  },

  deleteRecord: function(store, type, record) {
    Ember.assert("Implement me", false);
    // this.simulateRemoteCall(function() {
    //   this.didDeleteRecord(store, type, record);
    // }, this);
  }

});

