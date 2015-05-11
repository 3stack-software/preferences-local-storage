Package.describe({
  name: '3stack:preferences-local-storage',
  version: '1.1.0',
  summary: 'A preference store to use with 3stack:preferences',
  git: 'https://github.com/3stack-software/meteor-preferences-local-storage',
  documentation: 'README.md'
});


Package.onUse(function(api){
  api.versionsFrom('METEOR@0.9.2');

  api.use([
    'underscore',
    'check',
    'ejson',
    'logging'
  ], 'client');

  api.use('mongo', 'client', {weak: true});

  api.export([
    'LocalPreferenceStore',
    'SessionPreferenceStore'
  ], 'client');

  api.addFiles('preferences-local-storage.js', 'client');
});
