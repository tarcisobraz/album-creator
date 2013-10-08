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
			window.open("AlbumChoice.php", "_self");
			sayHello();
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

function getAlbums() {
	console.log('Fetching albums info...');
	var albumsResponse = FB.api('/me/albums?fields=id,name', function(response) {
	var albums = response.data;
	
	console.log('getAlbums response:' + albums);
	
	for (var i = 0; i < albums.length; i++) {
		console.log('Album ' + i + ': ' + albums[i].name);
	}
		return albums;
	});

	return albumsResponse;
	
};

function createAlbumsTable() {
	console.log('Creating Albums table');
	var myAlbums = getAlbums();
	
	console.log('getAlbums response in createAlbumsTable' + myAlbums);

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
};

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/all.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));