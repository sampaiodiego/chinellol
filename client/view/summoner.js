Template.summoner.events({
	'submit form'(event, instance) {
		event.preventDefault();

		Meteor.call('findGame', $('#name').val(), $('#region').val(), (err, result) => {
			console.log('err ->',err);
			console.log('result ->',result);
		});
	}
})
