Package.describe({
  name: 'ndxbxrme:angular-multi-check',
  version: '0.4.1',
  summary: 'an angular multi-checkbox directive',
  git: 'https://github.com/ndxbxrme/angular-multi-check',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.addFiles('dist/multi-check.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ndxbxrme:angular-multi-check');
  api.addFiles('test/meteor-tests.js');
});