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
		<fb:login-button show-faces="true" width="200" max-rows="1"></fb:login-button>
	</body>

</html>

