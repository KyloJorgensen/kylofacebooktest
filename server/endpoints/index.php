<?php

	DEFINE ('METHOD', $_SERVER['REQUEST_METHOD']);
	DEFINE ('URI', $_SERVER['REQUEST_URI']);
	DEFINE('__SERVER__', dirname(dirname(__FILE__)));
	DEFINE('__ROOT__', dirname(dirname(dirname(__FILE__))));
    // include("../client/index.php");
	try {
		// parse_str

		// echo strchr("Hello asd?fasdfasdf  asdfasdfasdf asdfworld!","?",true)."<br>";


		// parse_str("name=Peter&age=43");
		// echo $name."<br>";
		// echo $age."<br>";

		// echo strrchr("Hel?lo world!",63)."<br>";
		// echo strlen('kylo')."<br>";
		// echo substr("Hello world",6)."<br>";

		// pull params off
		$endpoint = strchr(URI, "?", true);
		if (!$endpoint) {
			$endpoint = URI;
		}

		// pull first endpoint only
		$endpoint = strtok($endpoint, "/");
		if ($endpoint == '') {
			// setcookie("color","red");
			// echo $_COOKIE["color"];
			return include('./build/index.html');
			return;
		} 
		if ($endpoint == 'news.php') {
			include('news.php');
			return;
		}
		if ($endpoint == 'login.php') {
			include('login.php');
			return;
		}
		if ($endpoint == 'logout.php') {
			include('logout.php');
			return;
		}

	    $error = new Exception('MISSING ENDPOINT');
	    $error->type = 404;
	    throw $error;
	} catch (Exception $e) {
		$errorHandler = include(__SERVER__ . '/error-handler.php');
		$errorHandler->handleError($e);
	}
?>