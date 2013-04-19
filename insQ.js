//insertionQuery by naugtur
//MIT license
var insertionQ = (function(){

    var sequence=100,
    useTags,
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

    function listen(selector,callback){
        var styleAnimation,animationName = 'insQ_'+(sequence++);

            var eventHandler = function(event) {
                if (event.animationName === animationName || event[animationstring] === animationName) {
                    if(!isTagged(event.target)){
                        callback(event.target);
                    }
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
                //event support is not consistent with DOM prefixes
            }, 20); //starts listening later to skip elements found on startup. this might need tweaking

    }


    function tag(el) {
        el['-+-'] = true;
    }
    function isTagged(el) {
        return (useTags && (el['-+-'] === true));
    }
    function topmostUntaggedParent(el) {
        if (isTagged(el.parentNode)) {
            return el;
        } else {
            return topmostUntaggedParent(el.parentNode);
        }
    }
    function tagAll(e){
        tag(e);
        e = e.firstChild;
        for (; e; e = e.nextSibling) {
            if (e !== undefined && e.nodeType === 1) {
                tagAll(e);
            }
        }
    }

    //aggregates multiple insertion events into a common parent
    function catchInsertions(selector,callback) {
        var insertions = [];
        //throttle summary
        var sumUp = (function() {
            var to;
            return function() {
                clearTimeout(to);
                to = setTimeout(function() {
                    insertions.forEach(tagAll);
                    callback(insertions);
                    insertions = [];
                }, 10);
            };
        })();

        listen(selector,function(el) {
            if (isTagged(el)) {
                return;
            }
            tag(el);
            var myparent = topmostUntaggedParent(el);
            if (insertions.indexOf(myparent) < 0) {
                insertions.push(myparent);
            }
            sumUp();
        });
    }

    return function(selector,notag){
        if(isAnimationSupported && selector.match(/[^{}]/)){
            useTags=(notag)?false:true;
            if(useTags){
                tagAll(document.body);//prevents from catching things on show
            }
            return {
                every:function(callback){
                    listen(selector,callback);
                },
                summary:function(callback){
                    catchInsertions(selector,callback);
                }
            };
        } else {
            return false;
        }
    }
})();