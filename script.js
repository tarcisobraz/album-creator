window.fbAsyncInit = function() {
// init the FB JS SDK
	FB.init({
	  appId      : 361402127326796,                        // App ID from the app dashboard
	  channelUrl : 'http://sheltered-oasis-9211.herokuapp.com/', // Channel file for x-domain comms
	  status     : true,                                 // Check Facebook Login status
	  xfbml      : false                                  // Look for social plugins on the page
	});

	FB.Event.subscribe('auth.authResponseChange', function(response) {
		console.log("Status: " + response.status);
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
	console.log("Logging user in...");
	FB.login(function(response) {
		if (response.authResponse) {
			window.open("AlbumChoice.php", "_self");
			sayHello();
//			createAlbumsTable();
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
	var albumsTHeader = "<thead><th>Choose one album below:</th></thead>";
	var myAlbumsTable = "<table id=\"albums-table\">" + albumsTHeader;
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
			FB.api('/' + currAlbum.id + '/photos?fields=source,height,width', function(pictures) {
				console.log("pictures: " + pictures.data);
				var coverPhoto = pictures.data[0];
				var aspectRatio = coverPhoto.height/coverPhoto.width;
				var coverWidth = 300;
				var height = aspectRatio*coverWidth; 
				console.log("AR: " + aspectRatio + "; Height: " + height);
				var albumRow = "<tr><td><img class=\"album-img\" height=\"" + height + "px\" width=\"" + coverWidth + "px\" src=" + coverPhoto.source + "><p class=\"album-name\">" + currAlbum.name + "</p></td></tr>";
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