var eventHandler = function(event) {
    if (event.animationName == 'nodeInserted' && !isTagged(event.target)) {
        tag(event.target);
        callback(event);
    }
    ;
}

var styleAnimation = document.createElement('style');
styleAnimation.innerHTML = '@keyframes nodeInserted {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }' +
        "\n" + '@-moz-keyframes nodeInserted {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }' +
        "\n" + '@-webkit-keyframes nodeInserted {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }' +
        "\n" + '@-ms-keyframes nodeInserted {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  }' +
        "\n" + '@-o-keyframes nodeInserted {  from {  clip: rect(1px, auto, auto, auto);  } to {  clip: rect(0px, auto, auto, auto); }  } ' +
        "\n" + '#' + nodeId + ' input, #' + nodeId + ' textarea, #' + nodeId + ' select { animation-duration: 0.001s; animation-name: nodeInserted; ' +
        '  -o-animation-duration: 0.001s; -o-animation-name: nodeInserted; ' +
        '	-ms-animation-duration: 0.001s; -ms-animation-name: nodeInserted; ' +
        '	-moz-animation-duration: 0.001s; -moz-animation-name: nodeInserted; ' +
        '	-webkit-animation-duration: 0.001s; -webkit-animation-name: nodeInserted; ' +
        ' } ';

document.head.appendChild(styleAnimation);

setTimeout(function() {

    document.addEventListener('animationstart', eventHandler, false);
    document.addEventListener('MSAnimationStart', eventHandler, false);
    document.addEventListener('webkitAnimationStart', eventHandler, false);

}, 100);
