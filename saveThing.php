<?php

// Set the database access information
$db_user = 'yourusername';
$db_password = 'yourpassword';
$db_host = 'yourhost';
$db_name = 'yourdatabasename';

// Connect to the database
$dbc = @mysqli_connect ($db_host, $db_user, $db_password, $db_name) OR die ('Could not connect to MySQL: ' . mqsqli_connect_error());

// Perform basic error checking
if(!$_POST['thing']) {
		// Error status
		$status = 'failure';
} else {
		// Insert thing into the database
		$query = "INSERT INTO things (id, thing, submitdate) VALUES (null, '{$_POST['thing']}', NOW())";
		$result = mysqli_query($dbc, $query);
		
		// Success status
		$status = 'success';
}

// Create json array
$json = array(
		'status' => $status
);

// Output to browser
$output = json_encode($json);
echo $output;

?>