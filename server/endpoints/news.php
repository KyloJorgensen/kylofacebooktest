<?php

	DEFINE ('METHOD', $_SERVER['REQUEST_METHOD']);
	DEFINE ('URI', $_SERVER['REQUEST_URI']);
	DEFINE('__SERVER__', dirname(dirname(__FILE__)));
	$controller = require(__SERVER__ . '/controllers/news.controller.php');
	$auth = include(__SERVER__ . '/auth.php');

	if (!function_exists('getallheaders')) 
	{ 
	    function getallheaders() 
	    { 
	           $headers = ''; 
	       foreach ($_SERVER as $name => $value) 
	       { 
	           if (substr($name, 0, 5) == 'HTTP_') 
	           { 
	               $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value; 
	           } 
	       } 
	       return $headers; 
	    } 
	} 
	try {
		// pull params off
		$endpoint = strchr(URI, "?", true);
		if (!$endpoint) {
			$endpoint = URI;
		}
		
		// pull first endpoint only
		$endpoint = strtok($endpoint, "/");
		if ($endpoint == 'news.php') {
			$augs1 = strtok('/');
			if ($augs1 == 'id') {
				$augs2 = strtok('/');
				if (METHOD == 'GET') {
					$controller->getNewsById($augs2);
					return;
				}
			} else {
				if (METHOD == 'GET') {
					$augs2 = strtok('/');
					$controller->getNews($augs1, $augs2);
					return;
				}
				$headers = getallheaders();
				if (METHOD == 'POST') {
					if ($auth->authenticate($headers['Authorization'])) {
						$controller->addNews();
					}
					return;
				}
				if (METHOD == 'DELETE') {
					if ($auth->authenticate($headers['Authorization'])) {
						$controller->deleteNews();
					}
					return;
				}
				if (METHOD == 'PUT') {
					if ($auth->authenticate($headers['Authorization'])) {
						$controller->updateNews();
					}
					return;
				}
			}
		}
		$error = new Exception('MISSING ENDPOINT');
		$error->type = 404;
		throw $error;
	} catch (Exception $e) {
		$errorHandler = include(__SERVER__ . '/error-handler.php');
		$errorHandler->handleError($e);
	}
?>