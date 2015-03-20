var userIdCheck = Match.OneOf(null, undefined, String);

Meteor.startup(function(){
  if (Package['mongo'] != null){
    userIdCheck = Match.OneOf(null, undefined, String, Mongo.ObjectID);
  }
});

LocalPreferenceStore = {
  stringify: function LocalPreferenceStore_stringify(value){
    if (value === void 0) {
      return 'undefined';
    }
    return EJSON.stringify(value);
  },
  parse: function LocalPreferenceStore_parse(serialized){
    if (serialized === void 0 || serialized === "undefined") {
      return void 0;
    }
    return EJSON.parse(serialized);
  },
  set: function LocalPreferenceStore_set(userId, name, value) {
    var self = this;
    window.localStorage.setItem(self.key(userId, name), self.stringify(value));
  },
  key: function LocalPreferenceStore_key(userId, name){
    check(userId, userIdCheck);
    check(name, String);
    if (userId == null){
      return name;
    } else {
      return userId + '||' + name
    }
  },
  get: function LocalPreferenceStore_get(userId, name) {
    var self = this, value;
    try {
      value = window.localStorage.getItem(self.key(userId, name));
      if (value != null){
        return this.parse(value);
      }

    } catch (e) {
      console.error(e);
      Log.error("LocalPreferenceStore - error getting preference \"" + name + "\" for User: \"" + userId + "\"");
    }
  }
};
