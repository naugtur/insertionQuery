
var insertionQ = (function(){

    var sequence=100,
    isAnimationSupported = false,
    animationstring = 'animationName',
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
    pfx  = '',
    elm = document.createElement('div');

    if( elm.style.animationName ) { isAnimationSupported = true; }   

    if( isAnimationSupported === false ) {
        for( var i = 0; i < domPrefixes.length; i++ ) {
            if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                pfx = domPrefixes[ i ];
                animationstring = pfx + 'AnimationName';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                isAnimationSupported = true;
                break;
            }
        }
    }


    return function(selector,callback){

        if(isAnimationSupported && selector.match(/[^{}]/)){

            var styleAnimation,animationName = 'insQ_'+(sequence++);

            var eventHandler = function(event) {
                if (event.animationName === animationName || event[animationstring] === animationName) {
                    callback(event);
                }
            }

            styleAnimation = document.createElement('style');
            styleAnimation.innerHTML = '@keyframes '+animationName+' {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }' +
            "\n" + '@'+keyframeprefix+'keyframes '+animationName+' {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }' +
            "\n" + selector + ' { animation-duration: 0.001s; animation-name: '+animationName+'; ' +
            keyframeprefix+'animation-duration: 0.001s; '+keyframeprefix+'animation-name: '+animationName+'; ' +
            ' } ';

            document.head.appendChild(styleAnimation);

            setTimeout(function() {
                document.addEventListener('animationstart', eventHandler, false);
                document.addEventListener('MSAnimationStart', eventHandler, false);
                document.addEventListener('webkitAnimationStart', eventHandler, false);
            }, 20); //starts listening later to skip elements found on startup. this might need tweaking

            return true;
        } else {
            return false;
        }

    }
})();