<!DOCTYPE html>
<html>

	<head>
		<title>Album Creator</title>
		<link href="Site.css" rel="stylesheet">
		<script src="script.js" type="text/javascript"></script>
	</head>

	<body>
		<div id="fb-root"></div>
		<script>
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

			// Load the SDK asynchronously
			(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/all.js";
			 fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		</script>
		<div id="main">
			<h1>Album Creator</h1>
			<h2>We organize your photos for you!</h2>
			<img src="http://www.mosphotography.com/img/albums/digital-album-flat.jpg">

			<button id="create_album" height="80px" width="150px" onclick="loginFB()">Create Your Photo-Album</button>
			<?php include("Footer.php"); ?>
		</div>
		<!--<fb:login-button show-faces="true" width="200" max-rows="1"></fb:login-button>-->
	</body>

</html>

