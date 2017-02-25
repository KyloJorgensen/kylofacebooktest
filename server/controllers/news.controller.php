<?php

	DEFINE('__SERVER__', dirname(__FILE__)); 

	class Row {
		public $idnews;
		public $title;
		public $date_enter;
		public $content;

		public function __construct($idnews, $title, $date_enter, $content) {
			$this->idnews = $idnews;
			$this->title = $title;
			$this->date_enter = $date_enter;
			$this->content = $content;
		}
	}	

	class Data {
		public $news = [];
		public $totalEntries;
	};

	class NewController {
		public function getNewsById($_id) {
			try {
				if(empty($_id)){
					// Adds name to array
					$data_missing[] = 'id';
				} else {
					$id = (int)$_id;
				}

				if(empty($data_missing)) {
				// Get a connection for the database
					require(__SERVER__ . '/mysqli_connect.php');
				// Create a query for the database
					$query = "SELECT idnews, title, date_enter, content FROM news WHERE idnews = " . $id;

				// Get a response from the database by sending the connection
				// and the query
					$response = @mysqli_query($dbc, $query);

					if($response){
						$row =  mysqli_fetch_assoc($response);

						$data = new Row($row['idnews'], convert_uudecode($row['title']), $row['date_enter'], convert_uudecode($row['content']));

						header('Content-Type: application/json');
						echo json_encode($data);
						mysqli_close($dbc);

					} else {
						$error = new Exception("Couldn't issue database query" . mysqli_error($dbc));
						$error->type = 500;
						mysqli_close($dbc);
						throw $error;
					}
				} else {
					$message = "You missing the following data";

					foreach($data_missing as $missing){
						$message = $message . ' -' . $missing;
					}

					$error = new Exception($message);
					$error->type = 400;
					$error->data_missing = $data_missing;
					throw $error;
					
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}

		public function getNews($amount , $offset) {
			$_amount = (int)$amount;
			$_offset = (int)$offset;

			if ($_amount == 0 ) {
				$_amount = 10;
			}
			try {
				if ($_amount < 0 || $_amount > 50) {
					$error = new Exception('Amount needs to be between 0 and 50.');
					$error->type = 400;
					throw $error;
				}
				if ($_offset < 0) {
					$error = new Exception('Offset needs to be greater then 0.');
					$error->type = 400;
					throw $error;
				}
			// Get a connection for the database
				require(__SERVER__ . '/mysqli_connect.php');
			// Create a query for the database
				$query = "SELECT idnews, title, date_enter, content FROM news ORDER BY date_enter DESC ";

			// Get a response from the database by sending the connection
			// and the query
				$response = @mysqli_query($dbc, $query);

				if($response){
					$data = new Data();

					$i = 1;
					while($row = mysqli_fetch_array($response)){
						if ((int)$i > $_offset && (int)$i <= ($_offset + $_amount)) {
							$data->news[] = new Row($row['idnews'], convert_uudecode($row['title']), $row['date_enter'], convert_uudecode($row['content']));
						}
						$i++;
					}

					$data->totalEntries = $i-1;
					$data->amount = $_amount;
					$data->offset = $_offset;
					error_log(print_r(json_encode($data), TRUE));

					header('Content-Type: application/json');
					echo json_encode($data);
					mysqli_close($dbc);

				} else {
					$error = new Exception("Couldn't issue database query" . mysqli_error($dbc));
					$error->type = 500;
					mysqli_close($dbc);
					throw $error;
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}

		public function addNews() {
			try {
				$data_missing = array();

				$query = json_decode(file_get_contents('php://input'), true);

				if(empty($query['title'])){
					// Adds name to array
					$data_missing[] = 'title';
				} else {
					$title = $query['title'];
				}

				if(empty($query['content'])){
					// Adds name to array
					$data_missing[] = 'content';
				} else {
					$content = $query['content'];
				}

				if(empty($data_missing)) {

				// Get a connection for the database
					require(__SERVER__ . '/mysqli_connect.php');

					$query = "INSERT INTO news (idnews, title, date_enter, content) VALUES (NULL, ?, NOW(), ?)";

					$stmt = mysqli_prepare($dbc, $query);
					
					mysqli_stmt_bind_param($stmt, "ss", convert_uuencode($title), convert_uuencode($content));

					mysqli_stmt_execute($stmt);
					
					$affected_rows = mysqli_stmt_affected_rows($stmt);
					
					if($affected_rows == 1) {
						echo 'NEWS Entered';
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
					
					} else {
						$error = new Exception("Error Occured" . mysqli_error($dbc));
						$error->type = 500;
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
						throw $error;
					}
					
				} else {
					$message = "You missing the following data";

					foreach($data_missing as $missing){
						$message = $message . ' -' . $missing;
					}

					$error = new Exception($message);
					$error->type = 400;
					$error->data_missing = $data_missing;
					throw $error;
					
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}

		public function deleteNews() {
			try {
				$data_missing = array();

				$query = json_decode(file_get_contents('php://input'), true);
				error_log(print_r($query['idnews'], TRUE)); 
				if(empty($query['idnews'])){
					// Adds name to array
					$data_missing[] = 'idnews';
				} else {
					$idnews = $query['idnews'];
				}

				if(empty($data_missing)) {

				// Get a connection for the database
					require(__SERVER__ . '/mysqli_connect.php');

					$query = "DELETE FROM news WHERE idnews = ?";
					
					$stmt = mysqli_prepare($dbc, $query);
					mysqli_stmt_bind_param($stmt, "i", $idnews);
					mysqli_stmt_execute($stmt);
					
					$affected_rows = mysqli_stmt_affected_rows($stmt);
					
					if($affected_rows == 1) {
						echo 'NEWS Deleted';
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
					
					} else {
						$error = new Exception("Error Occured" . mysqli_error($dbc));
						$error->type = 500;
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
						throw $error;
					}
					
				} else {
					$message = "You missing the following data";

					foreach($data_missing as $missing){
						$message = $message . ' -' . $missing;
					}

					$error = new Exception($message);
					$error->type = 400;
					// $error->data_missing = $data_missing;
					throw $error;
					
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}

		public function updateNews() {
			try {
				$data_missing = array();

				$query = json_decode(file_get_contents('php://input'), true);

				if(empty($query['title'])){
					// Adds name to array
					$data_missing[] = 'title';
				} else {
					$title = $query['title'];
				}

				if(empty($query['content'])){
					// Adds name to array
					$data_missing[] = 'content';
				} else {
					$content = $query['content'];
				}

				if(empty($query['idnews'])){
					// Adds name to array
					$data_missing[] = 'idnews';
				} else {
					$idnews = $query['idnews'];
				}

				if(empty($data_missing)) {

				// Get a connection for the database
					require(__SERVER__ . '/mysqli_connect.php');

					$query = "UPDATE news SET title = ?, content = ? WHERE idnews = ?";
					
					$stmt = mysqli_prepare($dbc, $query);
					mysqli_stmt_bind_param($stmt, "ssi", convert_uuencode($title), convert_uuencode($content), $idnews);
					mysqli_stmt_execute($stmt);
					
					$affected_rows = mysqli_stmt_affected_rows($stmt);
					
					if($affected_rows == 1) {
						echo 'NEWS Updated';
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
					
					} else {
						$error = new Exception("Update Failed" . mysqli_error($dbc));
						$error->type = 400;
						mysqli_stmt_close($stmt);
						mysqli_close($dbc);
						throw $error;
					}
					
				} else {
					$message = "You missing the following data";

					foreach($data_missing as $missing){
						$message = $message . ' -' . $missing;
					}

					$error = new Exception($message);
					$error->type = 400;
					// $error->data_missing = $data_missing;
					throw $error;
					
				}
			} catch (Exception $e) {
				$errorHandler = include(__SERVER__ . '/error-handler.php');
				$errorHandler->handleError($e);
			}
		}
	}

	return new NewController();
?>