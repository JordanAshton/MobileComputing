// define current window
var win = Titanium.UI.currentWindow;

// Add textfield
var textField = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	HINTtEXT: 'Type something here',
	color: '#336699',
	top: 10,
	left: 10,
	width: 300,
	height: 50
});
win.add(textField);

// when the return button is clicked on the virtual keyboard
textField.addEventListener('return', function(data){
	// save the text to the database
	saveThing(textField.value);
		
	// clear the textfield
	textField.value = '';
});

// create a table view to hold our things
var table = Ti.UI.createTableView({
	top: 70,
	left: 0
});
win.add(table);

// listen for a click event on the things table
table.addEventListener('click', function(e){
	// check to see if there is an ID associated with this row
	if (e.source.id) {
		// delete the row from the database
		deleteThing(e.source.id);
	}
});

// get all things from the database
getThings();

var style;
if (Ti.Platform.name === 'iPhone OS'){
	style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
} else {
	style = Ti.UI.ActivityIndicatorStyle.DARK;
}
var activityIndicator = Ti.UI.createActivityIndicator({
	color: 'black',
	font: {fontFamily:'Helvetica Neue', fontSize:14},
	message: 'Loading...',
	style: style,
	top: 50,
	left: 100,
	zIndex: 1
});
win.add(activityIndicator);

/* saveThing function saves something to a PHP script */
function saveThing(thing){
	
	// create the httpRequest
	var xhr = Titanium.Network.createHTTPClient();
	var url = 'https://raw.githubusercontent.com/JordanAshton/MobileComputing/master/saveThing.php';
		
	// open the httpRequest
	xhr.open('POST',url);
		
	// this method will be called when the request is complete
	xhr.onload = function(){
			
		// hide activity indicator
		activityIndicator.hide();
				
		// parse json response
		var json = JSON.parse(this.responseText);
				
		if (json.status == 'success'){
			// display a confirmation
			alert('Your thing has been saved');
						
			// refresh tableView
			getThings();
		} else {
			// display an error
			alert('Error: A thing is required');
		}
	};
		
	// this method will be called if there is an error
	xhr.onerror = function() {
		alert(this.error + ': ' + this.statusText);
		return false;
	};
		
	xhr.send({'thing': thing});
}

function getThings() {
	// show activity indicator
	activityIndicator.show();
	
	// create an empty data array
	var data = [];
		
	// create an empty results array
	var results = [];
		
	// create the httpRequest
	var xhr = Titanium.Network.createHTTPClient();
	var url = 'https://raw.githubusercontent.com/JordanAshton/MobileComputing/master/getThings.php';
		
	// open the httpRequest
	xhr.open('GET',url);
		
	// this method will be called when the request is complete
	xhr.onload = function() {
			
		// hide activity indicator
		activityIndicator.hide();
				
		// parse json coming from the server
		var json = JSON.parse(this.responseText);
				
		// if things are returned
		if(json.things) {
					
			// loop through all of our things
			for (var i = 0; i < json.things.length; i++) {
							
				// create a new table row
				var row = Ti.UI.createTableViewRow();
								
				// create a label inside the table row
				var titleLabel = Ti.UI.createLabel({
					text: json.things[i].thing,
					left: 10,
					top: 10,
					height: 40,
					width: 210
				});
				row.add(titleLabel);
								
				// create a delete button inside the tabel row
				var deleteButton = Ti.UI.createButton({
					title: "delete",
					id: json.things[i].id,
					right: 10,
					top: 10
				});
								
				// add a custom row property
				row.deleteButton = deleteButton;
								
				// add the row to the row
				row.add(deleteButton);
								
				// push the row object to the data array
				data.push(row);
			}
						
			// populate the things table with data
			thingsTable.data = data;
		}
	};
	
	// this method will be called if there is an error
	xhr.onerror = function() {
		alert(this.error + ': ' + this.status.Text);
		return false;
	};
	
	xhr.send();
}

function deleteThing(id){
	// create the httpRequest
	var xhr = Titanium.Network.createHTTPClient();
	var url = 'https://raw.githubusercontent.com/JordanAshton/MobileComputing/master/deleteThing.php';
	
	// open the httpRequest
	xhr.open('GET',url);
	
	// this method will be called when the request is complete
	xhr.onload = function(){
		// parse json response
		var json = JSON.parse(this.responseText);
		
		if(json.status == 'success'){
			// display a confirmation
			alert('Your thing has been deleted');
			
			getThings();
		} else {
			// display an error
			alert('Error: A thing is required');
		}
	};
	
	// this method will be called if there is an error
	xhr.onerror = function(){
		alert(this.error + ': ' + this.statusText);
		return false;
	};
	
	xhr.send();
}

// get all things from the database
getThings();
