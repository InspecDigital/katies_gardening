/**
 * @file main.collection.js
 * @alias MainCollection
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'app/plugins/backbone.collection.prototype',
  '../models/main.model'
], function(
  $,
  _,
  Backbone,
  BackboneCollectionPrototype,
  MainModel
) {

  'use strict';

  var Collection = Backbone.Collection.extend({

    model : MainModel,

    parse: function (response) {

      return response.data;

    }

  });

  _.merge(Collection.prototype, BackboneCollectionPrototype);

  return Collection;

});
