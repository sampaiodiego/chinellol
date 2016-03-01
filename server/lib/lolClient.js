class lolClient {
	constructor(apiKey) {
		this.apiKey = apiKey;

		this.platformPerRegion = {
			'br': 'BR1',
			'na': 'NA1'
		};
	}
	setRegion(region) {
		this.region = region;
	}
	requestURL(action) {
		return ;
	}
	standardizedSummonerName(name) {
		return name.toLowerCase().replace(/\s/g, '');
	}
	parseError(e) {
		console.log('parseError ->',e);
		switch(e.status.status_code) {
			case 400:
				throw new Meteor.Error('bad-request', ret.status);
			case 401:
				throw new Meteor.Error('unauthorized', ret.status);
			case 429:
				throw new Meteor.Error('rate-limit-exceeded', ret.status);
			case 500:
				throw new Meteor.Error('internal-server-error', ret.status);
			case 503:
				throw new Meteor.Error('service-unavailable', ret.status);
		}
		// 400	Bad request
		// 401	Unauthorized
		// 404	No summoner data found for any specified inputs
		// 429	Rate limit exceeded
		// 500	Internal server error
		// 503	Service unavailable
	}
	getSummonerByName(name) {
		try {
			var ret = HTTP.get(`https://${this.region}.api.pvp.net/api/lol/${this.region}/v1.4/summoner/by-name/${name}?api_key=${this.apiKey}`);

			if (ret.statusCode === 200) {
				return ret.data;
			} else if (ret.statusCode === 200) {
				throw new Meteor.Error('no-summoner-data-found');
			} else {
				this.parseError(ret);
			}

			return ret.data;
		} catch (e) {
			throw new Meteor.Error('unknown-error');
		}
	}
	getCurrentGame(name) {
		try {
			var summoner = this.getSummonerByName(name);

			console.log('summoner->',summoner);

			var summonerId = summoner[this.standardizedSummonerName(name)].id;

			console.log('summonerId->',summonerId);

			let url = `https://${this.region}.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/${this.platformPerRegion[this.region]}/${summonerId}?api_key=${this.apiKey}`;

			console.log('url ->',url);
			var ret = HTTP.get(url);

			console.log('ret ->',ret);

			if (ret.statusCode === 200) {
				return ret.data;
			} else if (ret.statusCode === 200) {
				throw new Meteor.Error('no-summoner-data-found');
			} else {
				this.parseError(ret);
			}

			return ret.data;
		} catch (e) {
			// console.log(e.status());
			// console.log('message ->',e.message);
			// console.log('name ->',e.name);
			// console.log('arguments ->',e.arguments);
			// console.log('type ->',e.type);
			// this.parseError(e);
			throw new Meteor.Error('unknown-error');
		}
	}
};

lol = new lolClient('');
lol.setRegion('br');
