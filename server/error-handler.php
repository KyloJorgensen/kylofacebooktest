<?php
	DEFINE ('METHOD', $_SERVER['REQUEST_METHOD']);
	DEFINE ('URI', $_SERVER['REQUEST_URI']);

	class ErrorHandler {
		public function handleError($e) {
			if ($e->type == 404) {
				http_response_code(404);
				echo METHOD . URI;
				echo '<br/>Not Found: ', $e->getMessage(), "\n";
				return;
			}
			if ($e->type == 400) {
				http_response_code(400);

				if (!empty($e->data_missing)) {
					header('Content-Type: application/json');
					echo json_encode($e->data_missing);
					return;
				}
				echo $e->getMessage();
				return;
			}
			if ($e->type == 401) {
				http_response_code(401);
				echo $e->getMessage(), "\n";
				return;
			}
			http_response_code(500);
			echo 'Caught exception: ',  $e->getMessage(), "\n";
        }
    }

	return new ErrorHandler();
?>