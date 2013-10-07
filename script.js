function getAlbums() {
	console.log('Fetching albums info...');
	var albumsResponse = FB.api('/me/albums?fields=id,name', function(response) {
		var albums = response.data;
//	for (var i = 0; i < albums.length; i++) {
//		console.log('Album ' + i + ': ' + albums[i].name);
//	}
		return albums;
	});

	return albumsResponse;
	
}

function sayHello() {
	console.log('Welcome! Fetching your information...');
	FB.api('/me', function(response) {
		console.log('Good to see you ' + response.name);
	});
//	getAlbums();
}

function loginFB() {
	FB.login(function(response) {
		if (response.authResponse) {
			sayHello();
			window.open("AlbumChoice.php", "_self");
		}				
	}, {scope: 'email,user_photos,publish_actions'});
}

function createAlbumsTable() {
	console.log('Creating Albums table');
	var myAlbums = getAlbums();

	var albumsTHeader = "<thead><tr><th>Choose the album to be used as source</th></tr></thead>";
	var albumsTBody = "<tbody>";

	for (var i = 0; i < myAlbums.length; i++) {
		console.log('Inserting album ' + myAlbums[i].name + ' in the table.');
		var albumCoverImg = FB.api('/' + myAlbums[i].id + '/photos?fields=source', function(response) {
			return response.data[0].source;
		});
		var albumRow = "<tr style='text-align: center;'><td><img height=\"80px\" width=\"100px\" src=" + albumCoverImg + "> " + myAlbums[i].name + "</td></tr>";
		console.log(albumRow);
		albumsTBody += albumRow;
	}

	console.log("Finished inserting albums to the table. Loading table now!");
	
	albumsTBody += "</tbody>";

	var myAlbumsTable = "<table border=1px>" + albumsTHeader + albumsTBody + "</table>";
	
	document.getElementById('albumsTable').innerHTML = myAlbumsTable;
}