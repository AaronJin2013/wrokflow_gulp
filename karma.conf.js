/**
 * Created by Aaron.jin on 2015/7/2.
 */

module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['mocha'],
        files: [
            {pattern: 'node_modules/chai/chai.js', include: true},
            'src/**/*.js',
            'test/**/*.js'
        ]
    });
};