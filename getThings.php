<?php

// Set the database access information
$db_user = 'yourusername';
$db_password = 'yourpassword';
$db_host = 'yourhost';
$db_name = 'yourdatabasename';	
	
// Connect to the database
$dbc = @mysqli_connect ($db_host, $db_user, $db_password, $db_name) OR die ('Could not connect to MySQL: ' . mysqli_connect_error());

// Get things from the database
$query = "SELECT id, thing, submitdate FROM things ORDER BY submitdate DESC";
$result = mysqli_query($dbc, $query);
while($row = mysqli_fetch_assoc($result))
{
	$things[] = array(
		'id' => $row['id'],
		'thing' => $row['thing'],
		'submitdate' => $row['submitdate'],
	);
}


// Create json array
$json = array(
	'things' => $things
);

// Output to browser
$output = json_encode($json);
echo $output;

?>