describe('Playlists', function(){

	it('Length of collection should equal count in mock data', function(){

		var collectionCount = dataPlaylists.count,
			collectionLength = dataStore.playlistsCollection.length;

		expect(collectionLength).toEqual(collectionCount);
	});

	it('Models should have the attribute "id"', function(){

		expect(dataStore.playlistsCollection.at(0).get('id')).not.toBe('undefined');

	});

	it('The first model should have the same \'id\' value as the mock data', function(){

		var id = dataPlaylists.results[0].id;
		expect(dataStore.playlistsCollection.at(0).get('id')).toEqual(id);

	});

	it('Models should have the attribute "name"', function(){

		expect(dataStore.playlistsCollection.at(0).get('name')).not.toBe('undefined');

	});

	it('The first model should have the same \'name\' value as the mock data', function(){

		var name = dataPlaylists.results[0].name;
		expect(dataStore.playlistsCollection.at(0).get('name')).toEqual(name);

	});

	it('Models should have the attribute "description"', function(){

		expect(dataStore.playlistsCollection.at(0).get('description')).not.toBe('undefined');

	});

	it('The first model should have the same \'description\' value as the mock data', function(){

		var description = dataPlaylists.results[0].description;
		expect(dataStore.playlistsCollection.at(0).get('description')).toEqual(description);

	});

	it('Models should have the attribute "owner_id"', function(){

		expect(dataStore.playlistsCollection.at(0).get('owner_id')).not.toBe('undefined');

	});

	it('The first model should have the same \'owner_id\' value as the mock data', function(){

		var owner_id = dataPlaylists.results[0].owner_id;
		expect(dataStore.playlistsCollection.at(0).get('owner_id')).toEqual(owner_id);

	});

	it('Models should have the attribute "protected"', function(){

		expect(dataStore.playlistsCollection.at(0).get('protected')).not.toBe('undefined');

	});

	it('The first model should have the same \'protected\' value as the mock data', function(){

		var protected = dataPlaylists.results[0].protected;
		expect(dataStore.playlistsCollection.at(0).get('protected')).toEqual(protected);

	});

});