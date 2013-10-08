function loginFB() {
	FB.login(function(response) {
		if (response.authResponse) {
			sayHello();
// 						window.open("AlbumChoice.php", "_self");
		}				
	}, {scope: 'email,user_photos,publish_actions'});
};

function sayHello() {
	console.log('Welcome! Fetching your information...');
	FB.api('/me', function(response) {
		console.log('Good to see you ' + response.name);
	});
	getAlbums();
};

function getAlbums() {
	console.log('Fetching albums info...');
	var albumsResponse = FB.api('/me/albums?fields=id,name', function(response) {
		var albums = response.data;
	for (var i = 0; i < albums.length; i++) {
		console.log('Album ' + i + ': ' + albums[i].name);
	}
		return albums;
	});

	return albumsResponse;
	
};