var App = Ember.Application.create();

App.Router.map(function(){
	this.resource('posts', function(){	// http://localhost/#/posts
		this.resource('post', {path: '/:post_id'}, function(){
			this.route('edit');	// #/posts/111/edit
		});	
	});
});

App.PostsRoute = Ember.Route.extend({
	model: function(){
		return $.getJSON('/posts');
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params){
		var posts = this.modelFor('posts');
		return posts.findBy('id', parseInt(params.post_id));
	}
});

App.PostEditRoute = Ember.Route.extend({
	model: function(){
		return this.modelFor('post');
	}
});

App.PostEditController = Ember.ObjectController.extend({
	actions: {
		savePost: function(){
			var self = this;
			var post = this.get('model');
			$.ajax({
				url: '/posts/' + post.id,
				type: 'PUT'
			}).done(function(){
				self.transitionToRoute('post', post);
			});
		}
	}
});

Ember.Handlebars.helper('markdown', function(value){
  return new Handlebars.SafeString(markdown.toHTML(value));
});














