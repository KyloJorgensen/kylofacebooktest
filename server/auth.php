<?php
	class Auth {
		public function authenticate($key) {
		// Get a connection for the database
			require_once('mysqli_connect.php');
		// Create a query for the database
			$query = "SELECT * FROM users WHERE userkey = '" . $key . "'";
		// Get a response from the database by sending the connection
		// and the query
			$response = @mysqli_query($dbc, $query);
			if($response){
				$row =  mysqli_fetch_assoc($response);
				mysqli_close($dbc);
				if ($row['userkey'] == $key) {
					return true;
				}
				$errorHandler = require('error-handler.php');
				$error = new Exception('BAD AUTH');
				$error->type = 401;
				$errorHandler->handleError($error);
				return;
			} else {
				$errorHandler = require('error-handler.php');
				$error = new Exception("Couldn't issue database query " . mysqli_error($dbc));
				$error->type = 500;
				mysqli_close($dbc);
				$errorHandler->handleError($error);
				return;

			}
		}

		public function updatekey($key, $username) {
			require('mysqli_connect.php');
			$query = "UPDATE users SET userkey = ? WHERE username = ?";
			echo $username;
			$_stmt = mysqli_prepare($dbc, $query);
			mysqli_stmt_bind_param($_stmt, "ss", $key, $username);
			mysqli_stmt_execute($_stmt);
					
			$affected_rows = mysqli_stmt_affected_rows($_stmt);
					
			if($affected_rows == 1) {
				mysqli_stmt_close($_stmt);
				mysqli_close($dbc);
				return false;
			} else {
				$error = new Exception("Error with Saving Key" . mysqli_error($dbc));
				$error->type = 500;
				mysqli_stmt_close($_stmt);
				mysqli_close($dbc);
				// return $error;
			}
		}
    }

	return new Auth();
?>