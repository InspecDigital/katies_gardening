/**
 * @file main.view.js
 * @author Tony M
 * @alias ProductsView
 * @mixes ProductsPrototype
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'require.text!../templates/main.template.html',
  '../plugins/main.prototype'
], function(
  $,
  _,
  Backbone,
  mustache,
  mainTemplate,
  MainPrototype
) {

  'use strict';

  var View = Backbone.View.extend({

    /**
     * Constructor
     *
     * @method
     */
    initialize : function(options) {

      var self = this;

      this.fetchPosts({
        complete : function() {
          console.log(self.posts);
          self.render();
        },
        error : function(e) {
          console.log(e);
        }
      });

    },

    /**
     * Render the template and replace the #workspace HTML
     *
     * @method
     */
    render : function(options) {

      var self = this;

      var body = mustache.render(mainTemplate);

      var _options = {
        partial : body,
        complete : function() {
          self.trigger('rendered');
          self.start();
        }
      };

      this.replaceBody(_options);

      return this;

    },

    /**
     * One time event hanlders
     * start() binds event handlers, but is called
     * only once per instance
     *
     * @method
     */
    start : function() {

      // Event handlers go here

      $(".morph").hover(function() {
          $(".morph img").animate({ opacity: 0 }, 'slow');
        }, function() {
          $(".morph img").animate({ opacity: 1 }, 'slow');
      });

      return this;

    }

  });

  _.merge(View.prototype, MainPrototype);

  return View;

});
