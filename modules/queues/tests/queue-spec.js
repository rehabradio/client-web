
describe('Queue', function(){

	it('Length of collection should equal count in mock data', function(){

		var collectionCount = dataQueue.count,
			collectionLength = dataStore.queueCollection.length;

		expect(collectionLength).toEqual(collectionCount);
	});

	it('Tracks should be able to be added to the queue', function(){

		var collectionLength = dataStore.queueCollection.length;

		$.ajax({
			url: 'add/to/queue', // TODO - update when available
			method: 'POST',
			async: false,
			success: function(){
				dataQueue.count = 5;
				dataQueue.results.push({

		            'id': 5, 
		            'track_id': 5, 
		            'source_type': 'soundcloud', 
		            'track_name': 'queued song 5', 
		            'album_name': 'soundcloud', 
		            'artists': [
		                'Artist Name'
		            ], 
		            'votes': 0, 
		            'image_small': null, 
		            'image_medium': null, 
		            'image_large': null

				});
			}
		});

		dataStore.queueCollection.fetch({
			async: false
		});

		expect(dataStore.queueCollection.length).toEqual(collectionLength + 1);

	});

	it('Tracks should be able to be removed from the queue', function(){

		$.ajax({
			url: 'remove/from/queue', // TODO - update when available
			method: 'POST',
			async: false,
			success: function(){
				dataQueue.count = 4;
				dataQueue.results.splice(0, 1);
			}
		});

		dataStore.queueCollection.fetch({
			async: false
		});

		expect(dataStore.queueCollection.at(0).get('id')).toEqual(2);

	});
});