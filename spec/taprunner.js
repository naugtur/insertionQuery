var jasmineEnv = jasmine.getEnv();
jasmineEnv.updateInterval = 250;

jasmineEnv.addReporter(new jasmine.TapReporter());

setTimeout(function(){
	jasmineEnv.execute();
},500);