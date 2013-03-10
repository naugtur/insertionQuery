insertionQuery
==============

Non-dom-event way to catch nodes showing up. And it uses selectors.

## Usage

	insertionQ('selector',function(element){
		//callback
	});

Runs the callback whenever an element matching the selector starts to exist. This means it handles DOM insertions of new nodes and changes that make old nodes start to match the selector. 

It is also triggered by nodes that are being displayed for the first time.

Technical notes:

 - run after DOM is ready or you'll get all the callbacks from HTML elements there. (thank you capt. Obvious)
 - the implementation is based on **CSS animations NOT DOM events**. So no consequences for performance.
 - because it's done with CSS you get the selectors for free, no javascript work is done matching that.
 - to make sure you won't get calls from elements that are there, the callbacks start working some miliseconds after you call insertionQ, so if you add elements in the same function call that you initiated insertionQuery, you won't get callbacks. 
