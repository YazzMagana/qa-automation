const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const env = require('node-env-file');
env('.env');

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        chromeOptions: {
            prefs: {
                'profile.managed_default_content_settings.notifications': 1
            }
        }
    },
    specs: [
        '../tests/sampleTest.js'
    ],

    // Set the Url where browser will start.
    baseUrl: process.env.URL,

    framework: 'jasmine2',
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        realtimeFailure: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 1200000
    },

    onPrepare: function() {
        browser.ignoreSynchronization = true;
        // Configure jasmine spec reporter.
        jasmine.getEnv().clearReporters(); // remove default reporter logs
        jasmine.getEnv().addReporter(new SpecReporter({ // add jasmine-spec-reporter
          spec: {
            displayStacktrace: true,
            displayPending: true
          }
        }));
        // Maximize Window
        setTimeout(function() {
            browser.driver.executeScript(function() {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                }
            }).then(function(result) {
                browser.driver.manage().window().setSize(result.width, result.height)
            })
        })
    }
}
