// References:
//
// Setting up Airbnb JS guide as eslinter:
// https://travishorn.com/setting-up-eslint-on-vs-code-with-airbnb-javascript-style-guide-6eb78a535ba6
//
// Adding eslinter to babel (otherwise, cannot parse jsx files)
// https://github.com/babel/babel-eslint

/*
 * Dont't forget to run:
 *
 * `npm i -g eslint`
 *
 * So that you can run eslint from command line.
 */
module.exports = {
    parser: "babel-eslint",
    "extends": [
        "airbnb-base",
        "plugin:react/recommended",
    ],
    "env": {
        "browser": true,
        "node": true
    }
};