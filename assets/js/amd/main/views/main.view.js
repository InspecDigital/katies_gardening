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
          return null;
        }
      });

      this.fetchMedia({
        complete : function() {
          self.fetchTerms({
            complete : function() {
              self.render();
            },
            error : function(e) {
              console.log(e);
            }
          });
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

      var categories = this.Config.get('categories');

      var posts = [];

      var media = this.media.toJSON();

      var body;

      for(var i = 0; i < categories.length; i++) {

        posts[categories[i]] = _.map(this.posts.toJSON(), function(post) {
          return _.find(post.terms.category, function(item) {
            return item.name === categories[i];
          });
        });

      }

      media[0].active = true;

      body = mustache.render(mainTemplate, { posts : posts, media : media });

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
