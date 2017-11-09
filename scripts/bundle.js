const rollup = require("rollup");
const uglify = require("rollup-plugin-uglify");

const rollupAnalyzer = require('rollup-analyzer')({
    limit: 20
})

function configure(plugins = []) {
    return {
        input: "dist/index.js",
        // sourceMap: false, !!generate!!
        onwarn: function(warning) {
            // Skip certain warnings

            // should intercept ... but doesn't in some rollup versions
            if (warning.code === 'THIS_IS_UNDEFINED') {
                return;
            }
            // intercepts in some rollup versions
            if (warning.message.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) {
                return;
            }
      
            // console.warn everything else
            console.warn(warning.message);
        },
        plugins: [...plugins],
        external: [
            "@angular/common",
            "@angular/core",
            "rxjs/Subscription",
            "rxjs/Subject",
            "rxjs/Observable",
            "rxjs/add/operator/share",
            "ng2-semantic-ui"
        ]
    }
}

// Regular bundle
rollup
    .rollup(configure())
    .then(bundle => {
        bundle.write({
            name: "ng-semantic-toast",
            file: "bundles/ng-semantic-toast.umd.js",
            format: "umd",
            globals: {
                "@angular/common": "ng.common",
                "@angular/core": "ng.core",
                "rxjs/Subscription": "Rx",
                "rxjs/Subject": "Rx",
                "rxjs/Observable": "Rx",
                "rxjs/add/operator/share": "Rx.Observable.prototype",
                "ng2-semantic-ui": "ng2.semantic.ui"
            }
        })
    })

// Minfied bundle
rollup
    .rollup(configure(
        [uglify()]
    ))
    .then(bundle => {
        //rollupAnalyzer.formatted(bundle).then(console.log).catch(console.error)
        bundle.write({
            name: "ng-semantic-toast",
            file: "bundles/ng-semantic-toast.umd.min.js",
            format: "umd",
            globals: {
                "@angular/common": "ng.common",
                "@angular/core": "ng.core",
                "rxjs/Subscription": "Rx",
                "rxjs/Subject": "Rx",
                "rxjs/Observable": "Rx",
                "rxjs/add/operator/share": "Rx.Observable.prototype",
                "ng2-semantic-ui": "ng2.semantic.ui"
            }
        })
    })