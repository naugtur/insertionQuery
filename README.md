insertionQuery
==============

Non-dom-event way to catch nodes showing up. And it uses selectors.

## Basic usage

	insertionQ('selector').every(function(element){
		//callback
	});

Runs the callback whenever an element matching the selector is created in the document. This means it handles DOM insertions of new nodes. 

Changing an existing element to match the selector won't run the callback. Showing an element that was not displayed before won't run the callback. You can disable preventing those situations by passing a second argument `insertionQ('selector',true)`, but it's not recommended.

## Insertion summary

    insertionQ('selector').summary(function(arrayOfInsertedNodes){
		//callback
	});

Runs the callback with an array of newly inserted nodes that contain element(s) matching the selector. For multiple nodes matching the selector, if they were inserted in a wrapper, the wrapper will be returned in the array. The array will contain the smallest set of nodes containing all the changes that happened to document's body.

## Technical notes:

 - run after DOM is ready or you'll get all the callbacks from HTML elements there. (thank you capt. Obvious)
 - the implementation is based on **CSS animations NOT DOM events**. So no consequences for performance.
 - because it's done with CSS you get the selectors for free, no javascript work is done matching that.
 - to make sure you won't get calls from elements that are there, the callbacks start working some miliseconds after you call insertionQ, so if you add elements in the same function call that you initiated insertionQuery, you won't get callbacks. 
 - it actually takes a few miliseconds before the callback runs after element is added (I measured upto 30ms in FireFox)
