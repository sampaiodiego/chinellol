Meteor.methods({
	findGame(name, region) {
		lol.setRegion(region);

		return lol.getCurrentGame(name);
	}
});
