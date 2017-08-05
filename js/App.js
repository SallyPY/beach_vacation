// var keysPressed = {};

// App constructor
var App = function(canvas, overlay) {

	// set a pointer to our canvas
	this.canvas = canvas;
	this.overlay = overlay;

	// if no GL support, cry
	this.gl = canvas.getContext("experimental-webgl");
	if (this.gl === null) {
		console.log( ">>> Browser does not support WebGL <<<" );
		return;
	}
	this.gl.pendingResources = {};

	// create a simple scene
	this.scene = new Scene(this.gl);
	this.keysPressed = {};
	// document.onkeydown = function(event) {
	// 	keysPressed[keyboardMap[event.keyCode]] = true;

	// };
	// document.onkeyup = function(event) {
	// 	keysPressed[keyboardMap[event.keyCode]] = false;
	//  };

	this.resize();
};

// match WebGL rendering resolution and viewport to the canvas size
App.prototype.resize = function(){
	this.canvas.width = this.canvas.clientWidth;
	this.canvas.height = this.canvas.clientHeight;
	this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
	this.scene.camera.setAspectRatio(this.canvas.clientWidth/this.canvas.clientHeight);	
};


App.prototype.registerEventHandlers = function() {
	var theApp = this;
	document.onkeydown = function(event) {
		theApp.keysPressed[keyboardMap[event.keyCode]] = true;
	};
	document.onkeyup = function(event) {
		theApp.keysPressed[keyboardMap[event.keyCode]] = false;
	};
	this.canvas.onmousedown = function(event) {

  		theApp.scene.camera.mouseDown();
		//jshint unused:false
		//theApp.scene.mouseDown(event);
	};
	this.canvas.onmousemove = function(event) {
		//jshint unused:false
		event.stopPropagation();
		theApp.scene.camera.mouseMove(event);
		//theApp.scene.mouseMove(event);
	};
	this.canvas.onmouseout = function(event) {
		//jshint unused:false
		//theApp.scene.mouseUp(event);
	};
	this.canvas.onmouseup = function(event) {
		theApp.scene.camera.mouseUp();
		//jshint unused:false
		//theApp.scene.mouseUp(event);
	};
	window.addEventListener('resize', function() {
		theApp.resize();
		//theApp.scene.resize(theApp.canvas);
	});
	window.requestAnimationFrame(function() {
		theApp.update();
	});		
};

// animation frame update
App.prototype.update = function() {

	var pendingResourceNames = Object.keys(this.gl.pendingResources);
	if(pendingResourceNames.length === 0) {
		// animate and draw scene
		this.scene.update(this.gl, this.keysPressed);
		this.overlay.innerHTML = "Ready.";
	} else {
		this.overlay.innerHTML = "Loading: " + pendingResourceNames;
	}

	// refresh
	var theApp = this;
	window.requestAnimationFrame(function() {
		theApp.update();
	});	
};

// entry point from HTML
window.addEventListener('load', function() {

	var canvas = document.getElementById("canvas");
	var overlay = document.getElementById("overlay");
	overlay.innerHTML = "WebGL";

	this.canvas.width = this.canvas.clientWidth;
	this.canvas.height = this.canvas.clientHeight;

	var app = new App(canvas, overlay);
	app.registerEventHandlers();
});
// var app;
// var overlay;
// var pendingResources = {};


// // App constructor
// var App = function(canvas, minimap) {

// 	// set a pointer to our canvas
// 	this.canvas = canvas;
// 	this.minimap = minimap;

//     this.gl2 =  minimap.getContext("experimental-webgl");

// 	// if no GL support, cry
// 	this.gl = canvas.getContext("experimental-webgl");
// 	if (this.gl == null) {
// 		alert( ">>> Browser does not support WebGL <<<" );
// 		return;
// 	}

// 	var theApp = this;

// 	document.onkeydown = function(event) {
// 		keysPressed[keyboardMap[event.keyCode]] = true;

// 	};
// 	document.onkeyup = function(event) {
// 		keysPressed[keyboardMap[event.keyCode]] = false;
// 	 };

// 	var dt = 0;
// 	var longLim = 4;
// 	 var hi;

	
		
// 	// set the initial canvas size and viewport
// 	this.canvas.width = this.canvas.clientWidth;
// 	this.canvas.height = this.canvas.clientHeight;
// 	// console.log(click);

// 	// create a simple scene
// 	this.scene = new Scene(this.gl);	
// 	// this.scene = new Scene(this.gl, keysPressed, click, xClick, yClick, short);	

// 	// this.miniScene = new Scene(this.gl2);
// 	// this.miniScene = new Scene(this.gl2, keysPressed, click, xClick, yClick, short);


// 	canvas.onmousedown =
// 	  function(event) {
// 	  	theApp.scene.camera.mouseDown();


//      };

// 	canvas.onmouseup =
// 	  function(event) {
// 	  	theApp.scene.camera.mouseUp();

	 
// 	  };

// 	canvas.onmousemove =
// 	  function(event) {
// 	  	theApp.scene.camera.mouseMove(event);

	 
// 	  };

	

// 	theApp.scene.camera.setAspectRatio(
// 	    this.canvas.clientWidth /
// 	    this.canvas.clientHeight);

// 	// theApp.miniScene.camera.setAspectRatio(
// 	//     this.minimap.clientWidth /
// 	//     this.minimap.clientHeight);
// //change

// 	// this.gl2.viewport(0, 0 , this.canvas.width/19.5, this.canvas.height/19.5); 
// 	this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);


// 	window.addEventListener('resize', function() {
// 	  theApp.canvas.width = this.canvas.clientWidth;
// 	  theApp.canvas.height = this.canvas.clientHeight;

//   //    theApp.gl2.viewport(0, 0, this.canvas.width/19.5, this.canvas.height/19.5); //minimap
// 	 // theApp.miniScene.camera.setAspectRatio(
// 	 //    this.minimap.clientWidth /
// 	 //    this.minimap.clientHeight);

// 	  theApp.gl.viewport(0, 0,
// 	    this.canvas.width, this.canvas.height);
// 	  theApp.scene.camera.setAspectRatio(
// 	    this.canvas.clientWidth /
// 	    this.canvas.clientHeight);
// 	});


// }




// // animation frame update
// App.prototype.update = function() {
	
// 	var pendingResourceNames = Object.keys(pendingResources);
// 	if(pendingResourceNames.length === 0) {
// 		// animate and draw scene
// 		this.scene.update(this.gl);
// 		// this.miniScene.update(this.gl2);
// 		click = false;
// 		short = false;


// 		// overlay.innerHTML = "Ready.";
// 	} else {
// 		// overlay.innerHTML = "Loading: " + pendingResourceNames;
// 	}

// 	// refresh
// 	window.requestAnimationFrame(function() {
// 		app.update();
// 	});
// }

// // entry point from HTML
// window.addEventListener('load', function() {

// 	var canvas = document.getElementById("canvas");
// 	overlay = document.getElementById("overlay");
// 	var minimap = document.getElementById("minimap");
// 	// overlay.innerHTML = "WebGL";

// 	app = new App(canvas, minimap);

// 	window.requestAnimationFrame(function() {
// 		// app.click = false;
// 		app.update();
// 	});

// });