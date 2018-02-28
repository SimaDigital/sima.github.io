var textElement = document.getElementById('text');
var buttonsElement = document.getElementById('buttons');
var scenes = [];
var curScene = "0";
var _music = new Audio();
var timers = [];
var vars = [];


// Operations
var del = "*delete";
var stop = "*stop";




var specicalFunction = function(fun){
	// Function: Splitter
	// Returns [SceneName, EvalFunction]
	var split1 = function (str){
		if (str.indexOf(" ") != -1){
			var sceneName = str.split(" ")[0];
			var afterSpace = str.indexOf(" ")+1;
			var evalString = str.substr(afterSpace);
			var fun = function(){ eval(evalString); };
			return [sceneName, fun];
		} else {
			return [str, update];
		}
	}	

	if (fun == undefined){
		fun = update;
		return fun;
	}

	if (typeof fun === "string"){
		var evalTxt = fun;
		// If ".dotInTheStart"
		if (evalTxt.charAt(0) == "."){
			undottedText = evalTxt.substr(1);
			var [sceneToGo, func] = split1(undottedText); 
			var result = function(){func(); scene(sceneToGo);};
			return result;
		}

		result = function(){eval(evalTxt); update();}
		return result;
	}
	return function(){fun(); update();}
}

var playSound = function(src){
	var sound = new Audio(src);
	sound.play();
}

var music = function(src, vol){
	if (vol == undefined) vol = 0.3;
	// if src is undefined, then stop the music
	if (src == stop){
		_music.currentTime = 0;
		_music.pause();
		return;
	}
	_music.src = src;
	_music.currentTime = 0;
	_music.loop = true;
	_music.volume = vol;
	_music.play();
}

var text = function(txt){
	textElement.innerHTML = txt;
}
var print = function(txt){
	textElement.innerHTML += txt+"<br>";
}

var update = function(){
	scene(curScene);
}

var button = function(name, click){
	var b = document.createElement("button");
	b.innerHTML = name;
	click = specicalFunction(click);
	b.onclick = click;
	buttonsElement.appendChild(b);
}


var clear = function(){
	buttonsElement.innerHTML = "";
}

var scene = function(a, b){
	var fun;
	var name;

	// Deletion
	if (a == del){
		if (scenes.hasOwnProperty(b)){
			delete scenes[b];
		}
		return;
	}

	// If a is string only
	// GO TO SCENE
	if (typeof a === "string" && b == undefined){
		if (scenes.hasOwnProperty(a)){
			fun = scenes[a];
			textElement.innerHTML = "";
			clear();
			fun();
			curScene = a;
			return;
		} else {
			window.alert("There are no such scene: ["+a+"]!");
			return;
		}
	}
	
	if (b == undefined){
		fun = a;
	} else{
		name = a;
		fun = b;
	}

	// If name is specified
	// Then we just add to scenes array
	if (name != undefined){
		scenes[name] = fun;
		return;
	}

	textElement.innerHTML = "";
	clear();
	fun();
}

var changeBackground = function(src){
	var bgEl = document.getElementById("bg");
	bgEl.style['background-image'] = "url("+src+")";
}

var timer = function(name, fun, msec){
	if (name == del){
		name = fun;
		fun = undefined;
		msec = undefined;
	}

	if (msec == undefined) msec = 1000;
	fun = specicalFunction(fun);

	if (timers.hasOwnProperty(name)){
		clearInterval(timers[name]);
	}
	if (fun == undefined){
		delete timers[name];
	} else {
		timers[name] = setInterval(fun, msec);
	}
}

var v = function(a, b){
	var name = a, value = b;
	if (a == del) {
		name = b;
		delete vars[name];
		return;
	}
	if (name == undefined) return;
	if (value == undefined) return vars[name];
	vars[name] = value;
}

// Shorting
var t = timer;
var p = print;
var c = clear;
var b = button;
var bg = changeBackground;
var m = music;
// var v = /* function to work with vars */
var inp = prompt;
var _ = scene;