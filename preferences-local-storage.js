var userIdCheck = Match.OneOf(null, undefined, String);

Meteor.startup(function(){
  if (Package['mongo'] != null){
    userIdCheck = Match.OneOf(null, undefined, String, Mongo.ObjectID);
  }
});

var WebStoragePreferenceStore = (function(){
  function WebStoragePreferenceStore(store){
    this.store = store
  }

  _.extend(WebStoragePreferenceStore.prototype, {
    stringify: function WebStoragePreferenceStore_stringify(value){
      if (value === void 0) {
        return 'undefined';
      }
      return EJSON.stringify(value);
    },
    parse: function WebStoragePreferenceStore_parse(serialized){
      if (serialized === void 0 || serialized === "undefined") {
        return void 0;
      }
      return EJSON.parse(serialized);
    },
    set: function WebStoragePreferenceStore_set(userId, name, value) {
      var self = this;
      self.store.setItem(self.key(userId, name), self.stringify(value));
    },
    key: function WebStoragePreferenceStore_key(userId, name){
      check(userId, userIdCheck);
      check(name, String);
      if (userId == null){
        return name;
      } else {
        return userId + '||' + name
      }
    },
    get: function WebStoragePreferenceStore_get(userId, name) {
      var self = this, value;
      try {
        value = self.store.getItem(self.key(userId, name));
        if (value != null){
          return self.parse(value);
        }

      } catch (e) {
        console.error(e);
        Log.error("WebStoragePreferenceStore - error getting preference \"" + name + "\" for User: \"" + userId + "\"");
      }
    }
  });
  return WebStoragePreferenceStore;
})();

LocalPreferenceStore = new WebStoragePreferenceStore(window.localStorage);
SessionPreferenceStore = new WebStoragePreferenceStore(window.sessionStorage);
