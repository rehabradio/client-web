rehabradio Client
=================

Overview
--------

Using standard rehabstudio practices and frameworks.

-	Backbone, underscore, jquery, handlebars
-	Browserify
-	Gulp
-	NPM

Set up
------

An .env file is required in the root. Values in the .env are needed for the following attributes:

	$ NODE_ENV
	$ API_ROOT
	$ SOCKETS_URL

Set up the packages needed for dev:

	$ npm install

This will install all dependencies and dev-dependencies. The application is currently deployed to Heroku and therefore uses a simple Node.js script (index.js).

The gulp file uses gulp-ruby-sass so the sass executable will need to be available. This is installed through:
	
	$ gem install sass

To run the server locally, make sure you have node installed and use:

	$ node index.js

from the root directory. Alternatively you can use:

	$ nodemon index.js

which will restart the server when index.js is changed.


To deploy to Heroku you will need to add your ssh key to the Heroku Dashboard. Ask for access. Once you can push to the Heroku app use:

	$ git push heroku {source_branch}:{destination_branch}

For example

	$ git push heroku develop:master


For task running, gulp is used. Tasks exist for building the:

	// Javascript - which includes linting the code
	$ gulp build

	// CSS
	$ gulp sass

	// Test runner - karma is used for the tests, this task includes a sub-task that builds the test suites from the spec files found the module folders.
	$ gulp karma

	//Svgs are used for the icons. A gulp task (gulp-svgstore) is used to build a single inline svg image which is injected into the base.html using 'gulp-inject'. This process can be run using:
	$ gulp svg


A watch task has been created to watch for changed to the javascript files, scss files, and svg images which in turn triggers the respective gulp tasks. This process is started using:

	$ gulp watch


Mock data can be used in place of actual data from the API but using 'debug' as a url param. This uses data create in js/jasmine/data/ and uses Mockjax to catpure the jQuery ajax requests.

Test Driven Development
-----------------------

Tests are done using the Jasmine framework. You can either run the js/jasmine/spec-runner.html in the browser or use the gulp task described above.

This uses Karma to launch a PhantomJS instance and run the tests there. The tests use mock data, and jQuery ajax requests are captured by Mockjax. This allows you to return the data you specify.
