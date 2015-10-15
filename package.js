"use strict";

Package.describe({
    name: 'awsp:validatejs',
    version: '0.6.0',
    // Brief, one-line summary of the package.
    summary: 'Meteor package for validate.js library. ',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/awsp/validatejs-meteor',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.0');
    api.use([
        'momentjs:moment@2.10.0'
    ]);

    api.addFiles([
        'validatejs.js',
        'bower_components/validate/validate.js'
    ]);
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('awsp:validatejs');
    api.addFiles('validatejs-tests.js');
});
