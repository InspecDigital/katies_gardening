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
  '../plugins/main.prototype',
  '/assets/app/lib/wordpress/wp-content/plugins/contact-form-7/includes/js/jquery.form.min.js'
], function(
  $,
  _,
  Backbone,
  mustache,
  mainTemplate,
  MainPrototype,
  jqueryForm
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

      var articles = [];

      var media = this.media.toJSON();

      var body;

      for(var i = 0; i < categories.length; i++) {

        articles[i] = {};
        articles[i].term = this.terms.findWhere({ slug : categories[i] }).toJSON();
        articles[i].posts = _.map(this.posts.toJSON(), function(post) {
          return _.find(post.terms.category, function(item) {
            return item.slug === categories[i];
          }) !== undefined ? post : null;
        });

        articles[i].posts = _.reject(articles[i].posts, function(post) { return post === null; });

      }

      console.log(articles);

      media[0].active = true;

      body = mustache.render(mainTemplate, { articles : articles, media : media });

      var _options = {
        partial : body,
        complete : function() {
          self.trigger('rendered');
          self.start();
        }
      };

      this.replaceBody(_options);

      var _wpcf7 = {"loaderUrl":"http:\/\/kgdev.inspecdigital.org\/assets\/app\/lib\/wordpress\/wp-content\/plugins\/contact-form-7\/images\/ajax-loader.gif","sending":"Sending ..."};
      require(["/assets/app/lib/wordpress/wp-content/plugins/contact-form-7/includes/js/scripts.js"], 'wpcf7Scripts');
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
