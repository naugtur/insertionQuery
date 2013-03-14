function mkglob(obj){
	for(var i in obj){
		window[i]=obj[i];
	}
}

mkglob(require("http://pivotal.github.com/jasmine/lib/jasmine.js"));
require("https://raw.github.com/larrymyers/jasmine-reporters/master/src/jasmine.tap_reporter.js"); 
mkglob(require("http://naugtur.github.com/insertionQuery/insQ.js"));
require("http://naugtur.github.com/insertionQuery/spec/test.js");


var jasmineEnv = jasmine.getEnv();
jasmineEnv.updateInterval = 250;

jasmineEnv.addReporter(new jasmine.TapReporter());

setTimeout(function(){
	jasmineEnv.execute();
},500);