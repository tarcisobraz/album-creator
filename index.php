<!DOCTYPE html>
<html>

	<head>
		<title>Album Creator</title>
		<link href="Site.css" rel="stylesheet">
		<script src="script.js" type="text/javascript"></script>
	</head>

	<body>
		<div id="fb-root"></div>
<!-- 		<script> -->
<!-- // 			// Load the SDK asynchronously -->
<!-- 		</script> -->
		<div id="main">
			<h1>Album Creator</h1>
			<h2>We organize your photos for you!</h2>
			<img src="http://www.mosphotography.com/img/albums/digital-album-flat.jpg">

			<button id="create_album" height="80px" width="150px" onclick="loginFB()">Create Your Photo-Album</button>
			<fb:login-button show-faces="true" width="200" max-rows="1"></fb:login-button>
			<?php include("Footer.php"); ?>
		</div>
	</body>

</html>

