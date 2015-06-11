/**
 * @file main.prototype.js
 * @alias SupportPrototype
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'app.core',
  '../collections/main.collection'
], function(
  $,
  _,
  Backbone,
  AppCore,
  MainCollection
) {

  'use strict';

  var Prototype = {

    api : {
      media : 'media',
      posts : 'posts',
      terms : 'taxonomies/category/terms'
    },

    fetchMedia : function(options) {

      var _options = this.prepareOptions(options);

      this.media = new MainCollection();

      this.media.url = this.Navigation.getServiceLink(this.api.media);

      return this._fetchData('media', _options);

    },

    fetchPosts : function(options) {

      var _options = this.prepareOptions(options);

      this.posts = new MainCollection();

      this.posts.url = this.Navigation.getServiceLink(this.api.posts);

      return this._fetchData('posts', _options);

    },

    fetchTerms : function(options) {

      var _options = this.prepareOptions(options);

      this.terms = new MainCollection();

      this.terms.url = this.Navigation.getServiceLink(this.api.terms);

      return this._fetchData('terms', _options);

    },

    /**
     * Wrapper for _prepareOptions
     * Since options are always optional, use
     * a wrapper for _prepareOptions so defaults
     * can be added.
     *
     * @method
     * @param {object} (options)
     */
    prepareOptions : function(options) {

      var defaults = { reset : true,
                       unshift : false,
                       dataType : 'json' };

      return this._prepareOptions(defaults, options);

    }

  };

  _.merge(Prototype, AppCore);

  return Prototype;

});