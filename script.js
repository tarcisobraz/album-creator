window.fbAsyncInit = function() {
// init the FB JS SDK
	FB.init({
	  appId      : 361402127326796,                        // App ID from the app dashboard
	  channelUrl : 'http://sheltered-oasis-9211.herokuapp.com/', // Channel file for x-domain comms
	  status     : true,                                 // Check Facebook Login status
	  xfbml      : false                                  // Look for social plugins on the page
	});

	FB.Event.subscribe('auth.authResponseChange', function(response) {
		if (response.status === 'connected') {
			sayHello();
		} else if (response.status === 'not_authorized') {
			FB.login();
		} else {
			FB.login();
		}
	});

// Additional initialization code such as adding Event Listeners goes here
};

function loginFB() {
	FB.login(function(response) {
		if (response.authResponse) {
			window.open("AlbumChoice.php", "_self");
			sayHello();
			createAlbumsTable();
		}				
	}, {scope: 'email,user_photos,publish_actions'});
};

function sayHello() {
	console.log('Welcome! Fetching your information...');
	FB.api('/me', function(response) {
		console.log('Good to see you ' + response.name);
	});
};

function createAlbumsTable() {
	console.log("Creating albums table...");
	var albumsTHeader = "<thead><tr><th>Choose the album to be used as source</th></tr></thead>";
	var myAlbumsTable = "<table border=1px>" + albumsTHeader;
	var albumsTBody = "<tbody>";
	var albums;
	getAlbums();
	
	function getAlbums() {
		console.log('Fetching albums info...');
		albumsTBody += " ";
		function getFBAlbums(fbResponse) {
			albums = fbResponse.data;
			console.log("Albums response: " + albums);
			getAlbumCover(0);
		}
		
		FB.api('/me/albums?fields=id,name', getFBAlbums);
	
	};
	
	function getAlbumCover(currIndex) {
		if (currIndex < albums.length) {
			var currAlbum = albums[currIndex];
			console.log("Current Album: " + currAlbum);
			FB.api('/' + currAlbum.id + '/photos?fields=source', function(pictures) {
				console.log("pictures: " + pictures.data);
				var albumRow = "<tr><td><img height=\"200px\" width=\"300px\" src=" + pictures.data[0].source + "><p>" + currAlbum.name + "</p></td></tr>";
				console.log("Curr album row: " + albumRow);
				albumsTBody += albumRow;
				getAlbumCover(++currIndex);
			});
		} else {
			albumsTBody += "</tbody>";
			console.log("Finished building albums table. Its body looks like: " + albumsTBody);
			myAlbumsTable += albumsTBody + "</table>";
			document.getElementById('albumsTable').innerHTML = myAlbumsTable;
		}
	};
}
	

(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "//connect.facebook.net/en_US/all/debug.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));