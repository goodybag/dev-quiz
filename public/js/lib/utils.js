var utils = module.exports = require('lodash').extend( {}, require('lodash') );

utils.dom       = require('jquery');
utils.domready  = require('jquery');
utils.http      = require('jquery').ajax;