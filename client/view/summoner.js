Template.summoner.events({
	'click #summoner-info'(event, instance) {
		event.preventDefault();

		Meteor.call('findSummoner', $('#name').val(), $('#region').val(), (err, result) => {
			console.log('err ->',err);

			$('#result').html(JSON.stringify(result, null, '  '));
		});
	},
	'click #game-info'(event, instance) {
		event.preventDefault();

		Meteor.call('findGame', $('#name').val(), $('#region').val(), (err, result) => {
			console.log('err ->',err);

			$('#result').html(JSON.stringify(result, null, '  '));
		});
	}
})
