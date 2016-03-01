Meteor.methods({
	findSummoner(name, region) {
		lol.setRegion(region);

		return lol.getSummonerByName(name);
	}
});
