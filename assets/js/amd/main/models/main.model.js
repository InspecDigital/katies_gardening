/**
 * @file main.model.js
 * @alias MainModel
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'app/plugins/backbone.model.prototype'
], function(
  $,
  _,
  Backbone,
  BackboneModelPrototype
) {

  'use strict';

  var Model = Backbone.Model.extend({

    defaults: {

    }

  });

  _.merge(Model.prototype, BackboneModelPrototype);

  return Model;

});
