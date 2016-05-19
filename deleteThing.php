<?php

// Set the database access information
$db_user = 'yourusername';
$db_password = 'yourpassword';
$db_host = 'yourhost';
$db_name = 'yourdatabasename';	
		
// Connect to the database
$dbc = @mysqli_connect ($db_host, $db_user, $db_password, $db_name) OR die ('Could not connect to MySQL: ' . mysqli_connect_error());

// Delete thing from the database
$query = "DELETE FROM things WHERE id = '{$_GET['id']}'";
mysqli_query($dbc, $query);

// Create json array
$json = array(
	'status' => 'success'
);

// Output to browser
$output = json_encode($json);
echo $output;

?>