<?php

	DEFINE('__SERVER__', dirname(__FILE__)); 

	class LogoutController {
		public function logout() {
			setcookie("adminkey", 'null', time() + 0);
		}
	}

	return new LogoutController();
?>