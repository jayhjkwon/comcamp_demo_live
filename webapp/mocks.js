$.mockjax({
	url: '/posts',
	responseText: [
		{id:1, title:'Nancy', contents:'Hello NancyFX'},
		{id:2, title:'Ember.js', contents:'Hello Ember.js'}
	],
	responseTime:2000
});

$.mockjax({
	url: '/posts/*',
	type: 'PUT',
	status: 200
});