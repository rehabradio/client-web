rehabradio Client
=================

Overview
--------

Using standard rehabstudio practices and frameworks.

-	Backbone
-	Browserify
-	Gulp
-	NPM

Set up
------

Set up the packages needed for dev:

	$ npm install

A gulp task has been created to build the js/sass so use:

	$ gulp watch

Mock data can be used in place of actual data from the API but using 'debug' as a url param. This uses data create in js/jasmine/data/ and uses Mockjax to catpure the jQuery ajax requests.

Test Driven Development
-----------------------

Tests are done using the Jasmine framework. You can either run the js/jasmine/spec-runner.html in the browser or use the gulp task:

	$ gulp karma

This uses Karma to launch a PhantomJS instance and run the tests there. The tests use mock data, and jQuery ajax requests are captured by Mockjax. This allows you to return the data you specify.
