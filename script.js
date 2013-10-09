window.fbAsyncInit = function() {
// init the FB JS SDK
	FB.init({
	  appId      : 361402127326796,                        // App ID from the app dashboard
	  channelUrl : 'http://sheltered-oasis-9211.herokuapp.com/', // Channel file for x-domain comms
	  status     : true,                                 // Check Facebook Login status
	  xfbml      : false                                  // Look for social plugins on the page
	});

	/*FB.Event.subscribe('auth.authResponseChange', function(response) {
		if (response.status === 'connected') {
			sayHello();
		} else if (response.status === 'not_authorized') {
			FB.login();
		} else {
			FB.login();
		}
	});*/

// Additional initialization code such as adding Event Listeners goes here
};

function loginFB() {
	FB.login(function(response) {
		if (response.authResponse) {
//			window.open("AlbumChoice.php", "_self");
			sayHello();
			getAlbums(createAlbumsTable);
		}				
	}, {scope: 'email,user_photos,publish_actions'});
};

function sayHello() {
	console.log('Welcome! Fetching your information...');
	FB.api('/me', function(response) {
		console.log('Good to see you ' + response.name);
	});
//	getAlbums();
};

function getAlbumCover(albums, currIndex, callback) {
	if (currIndex < albums.length) {
		var currAlbum = albums[currIndex];
		FB.api('/' + currAlbum.id + '/photos?fields=source', function(picture) {
			var albumRow = "<tr style='text-align: center;'><td><img height=\"80px\" width=\"100px\" src=" + picture.source + "> " + currAlbum.name + "</td></tr>";
			console.log("Curr album row: " + albumRow);
			albumsTBody += albumRow;
			if (typeof callback === "function") {
				callback(albums, ++currIndex, response.data[0]);
			}
		});
	} else {
		albumsTBody += "</tbody>";
		console.log("Finished building albums table. Its body looks like: " + albumsTBody);
		myAlbumsTable += albumsTBody + "</table>";
		document.getElementById('albumsTable').innerHTML = myAlbumsTable;
	}
};

function createAlbumsTable(albumsList) {
	var albumsTHeader = "<thead><tr><th>Choose the album to be used as source</th></tr></thead>";
	var myAlbumsTable = "<table border=1px>" + albumsTHeader;
	var albumsTBody = "<tbody>";
	getAlbumCover(albumsList, 0, getAlbumCover);
}
	
function getAlbums(callback) {
	console.log('Fetching albums info...');
	var albums;
	FB.api('/me/albums?fields=id,name', function(response) {
		albums = response.data;
		console.log("Albums response: " + albums);
		if (typeof callback === "function") {
			callback(albums);
		};
	
	//	console.log('getAlbums response:' + albums);
	//	
	//	for (var i = 0; i < albums.length; i++) {
	//		console.log('Album ' + i + ': ' + albums[i].name);
	//	}
	//		return albums;
	});
};

function createAlbumsTable1() {
	console.log('Creating Albums table');
	
	var albumsTHeader = "<thead><tr><th>Choose the album to be used as source</th></tr></thead>";
	var myAlbumsTable = "<table border=1px>" + albumsTHeader;
	
	getAlbums( function(model) {
		
		console.log('getAlbums response in createAlbumsTable' + model);
		
			console.log('Inserting album ' + currAlbumName + ' in the table.');

			getAlbumCover(model[i].id, function(picture) {
				var albumRow = "<tr style='text-align: center;'><td><img height=\"80px\" width=\"100px\" src=" + picture.source + "> " + currAlbumName + "</td></tr>";
				console.log(albumRow);
				albumsTBody += albumRow + 'a';
				console.log("Added an album row: " + albumsTBody);
			});
			
			console.log(albumsTBody);
		
		albumsTBody += "</tbody>";
		console.log(albumsTBody);
		myAlbumsTable += albumsTBody + "</table>";
		console.log("Finished inserting albums to the table. Loading table now!");
		
	});
	
	console.log(myAlbumsTable);
	
	document.getElementById('albumsTable').innerHTML = myAlbumsTable;
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/all.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));