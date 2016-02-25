//            _               _       
//   ___ __ _| |  _ __   ___ | |_   _ 
//  / __/ _` | | | '_ \ / _ \| | | | |
// | (_| (_| | | | |_) | (_) | | |_| |
//  \___\__,_|_| | .__/ \___/|_|\__, |
//               |_|            |___/ 
//      _                          _           _             
//   __| | _____   __    _      __| | ___  ___(_) __ _ _ __  
//  / _` |/ _ \ \ / /  _| |_   / _` |/ _ \/ __| |/ _` | '_ \ 
// | (_| |  __/\ V /  |_   _| | (_| |  __/\__ \ | (_| | | | |
//  \__,_|\___| \_/     |_|    \__,_|\___||___/_|\__, |_| |_|
//                                               |___/       
//  _                _         _   _                 
// | |__   __ _  ___| | ____ _| |_| |__   ___  _ __  
// | '_ \ / _` |/ __| |/ / _` | __| '_ \ / _ \| '_ \ 
// | | | | (_| | (__|   < (_| | |_| | | | (_) | | | |
// |_| |_|\__,_|\___|_|\_\__,_|\__|_| |_|\___/|_| |_|
// 
//  ____   ___  _  __   
// |___ \ / _ \/ |/ /_  
//   __) | | | | | '_ \ 
//  / __/| |_| | | (_) |
// |_____|\___/|_|\___/ 
// 
// // Version 0.1.x


// Helper Functions 
function makeSVG(tag, attrs) {
    var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs) {
        el.setAttribute(k, attrs[k]);
    }
    return el;
}

function isEven(n) {
   return n % 2 == 0;
}

// ==========| Classes |===========

//App Class
var App = function(){
	this.init();
};

App.prototype.init = function(){
	var _this = this;
	this.standBy();

	$('#payload').keypress(function (e) {
		if (e.which == 13) {
			_this.warmUp();
		}
	});

	$(".screen-inner span, #payload").hide();
	$(".screen-inner").hide().fadeIn(500);
	setTimeout(function(){
		$(".screen-inner span, #payload").fadeIn(500);
		setTimeout(function(){


			var tubeval = "";
			var d = 0;
			var k = 0;
			var sample = "background: red";

			function changeInput(){
				if(k<sample.length){
					tubeval+=sample[k];
					$("#payload").val(tubeval);
					k++;
				} else {
					setTimeout(function(){
						_this.warmUp();
					}, 1000);
				}
			}

			for(var j=0;j<sample.length+1;j++){
				setTimeout(changeInput, d);
				d+=Math.round(Math.random()*140);
			}
			
		}, 1000);
	}, 1000)
}

App.prototype.standBy = function(){

	$(".status").html("standBy").removeClass("red yellow green").addClass("red");
	$("#payload").removeClass("red yellow green").addClass("red");
	$(".laser-inner").removeClass("active");
	$(".laser-inner").removeClass("recoil");
	$(".light").removeClass("active");
	$(".light.red").addClass("active");
}

App.prototype.warmUp = function(){
	var _this = this;
	$(".laser-inner").removeClass("recoil");
	$(".status").html("warmUp").removeClass("red yellow green").addClass("yellow");
	$(".laser-inner").addClass("active");
	$(".light").removeClass("active");
	$(".light.yellow").addClass("active");
	$("#payload").removeClass("red yellow green").addClass("yellow");

	setTimeout(function(){
		_this.fire();
	}, 1500);
}

App.prototype.fire = function(){
	var _this = this;
	$(".status").html("ready").removeClass("red yellow green").addClass("green");	
	$(".light").removeClass("active");
	$(".light.green").addClass("active");
	$("#payload").removeClass("red yellow green").addClass("green");

	$(".laser-inner").addClass("recoil");

	var i = $("#payload").val().indexOf(";");
	var clean = $("#payload").val();
	if(i >= 0){
		clean.splice(i, 1);
	}
	var arr = clean.split(":");
	var prop = arr[0].trim();
	var val = arr[1].trim();

	$("#payload").val("");
	setTimeout(function(){
		$(".target .actual").css(prop, val);
		_this.standBy();
	}, 500);
}


// Run when jQuery says yo whats up dawgoc
$(document).ready(function(){
	myApp = new App();


	var $header = $("header");

    $(document).scroll(function() {
        if (300 <= $(document).scrollTop()) {
            $header.addClass("transparent");
        } else {
        	$header.removeClass("transparent");
        }
    });

});