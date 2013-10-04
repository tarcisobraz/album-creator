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
				  channelUrl : 'http://sheltered-oasis-9211.herokuapp.com/channel.html', // Channel file for x-domain comms
				  status     : true,                                 // Check Facebook Login status
				  xfbml      : false                                  // Look for social plugins on the page
				});

				FB.Event.subscribe('auth.authResponseChange', function(response) {
					if (response.status === 'connected') {
						sayHello();
					else if (response.status === 'not_authorized') {
						FB.login();
					else {
						FB.login();
					}
				});

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

				function sayHello() {
					console.log('Welcome! Fetching your information...');
					FB.api('/me', function(response) {
						console.log('Good to see you ' + response.name);
					});
				}
			</script>
		<div id="main">
			<h1>Album Creator</h1>
			<h2>We organize your photos for you!</h2>
			<img src="http://www.mosphotography.com/img/albums/digital-album-flat.jpg">

			<div id="button" height="80px" width="150px" >Create Your Photo-Album</div>
			<?php include("Footer.php"); ?>
		</div>
	</body>

</html>

