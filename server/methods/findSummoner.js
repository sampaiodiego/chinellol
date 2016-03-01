Meteor.methods({
	findSummoner(name, region) {
		lol.setRegion(region);

		var ret = {};

		ret.summoner = lol.getSummonerByName(name);
		matches = lol.findMatches(name);

		if (matches) {
			ret.matches = matches;
		}

		return ret;
	}
});
