Meteor.methods({
	findMatches(name, region) {
		lol.setRegion(region);

		return lol.findMatches(name);
	}
});
