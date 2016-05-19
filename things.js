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
