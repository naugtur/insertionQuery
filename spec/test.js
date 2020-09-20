function waits(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

describe("Insertion Query lib", function () {


    it('should react to an insertion', async function () {
        insertionQ.config({
            strictlyNew: true
        });
        var callback = jasmine.createSpy('callback');
        insertionQ('blockquote').every(callback);
        await waits(200);
        document.body.appendChild(document.createElement('blockquote'));
        await waits(200); //just to be sure
        console.log(callback)
        expect(callback.calls.count()).toEqual(1);

    });


    it('should call the callbacks for two selectors accordingly', async function () {
        var callback1 = jasmine.createSpy('callback'),
            callback2 = jasmine.createSpy('callback');
        insertionQ('#a').every(callback1);
            insertionQ('#b').every(callback2);
        await waits(200);
        var el = document.createElement('q');
            el.id = "a";
            document.body.appendChild(el);
            el = document.createElement('q');
            el.id = "b";
            document.body.appendChild(el);
        await waits(200); //just to be sure
        expect(callback1.calls.count()).toEqual(1);
            expect(callback2.calls.count()).toEqual(1);

    });

    it('should react to a change that causes the element to match the selector', async function () {
        var callback = jasmine.createSpy('callback'),
            el;
        insertionQ('q.someFunnyClass').every(callback);
        await waits(200);
        el = document.createElement('q');
            document.body.appendChild(el);
        await waits(100);
        el.setAttribute('class', 'someFunnyClass');
        await waits(200);
        expect(callback.calls.count()).toEqual(1);

    });

    it('should not react to old elements', async function () {
        var callback = jasmine.createSpy('callback');
        document.body.appendChild(document.createElement('q'));
        await waits(200);
        insertionQ('q').every(callback);
        await waits(200);
        document.body.appendChild(document.createElement('q'));
        await waits(200);
        expect(callback.calls.count()).toEqual(1);

    });
    it('should NOT react to old elements getting displayed just now (happened in webkit)', async function () {
        var callback = jasmine.createSpy('callback'),
            el = document.createElement('q');
        el.style.display = 'none';
            document.body.appendChild(el);
        await waits(200);
        insertionQ('q').every(function () {
                console.log('call');
                callback();
            });
        await waits(200);
        el.style.display = 'inline';
        await waits(200);
        expect(callback.calls.count()).toEqual(0);

    });

    it('should pass the newly added node to the callback function', async function () {
        var el = document.createElement('q'),
            resultNode;
        insertionQ('q').every(function (node) {
                resultNode = node;
            });
        await waits(200);
        document.body.appendChild(el);
        await waits(200);
        expect(resultNode).toBe(el);

    });


    it('should call one summary callback for two nodes with common parent', async function () {
        var nodeArray,
            callback1 = jasmine.createSpy('callback1');
        insertionQ('q').summary(function (a) {
                nodeArray = a;
                callback1();
            });
        await waits(200);
        var wrap = document.createElement('div'),
                el = document.createElement('q');
            el.id = "z";
            wrap.appendChild(el);
            el = document.createElement('q');
            el.id = "x";
            wrap.appendChild(el);
            document.body.appendChild(wrap);
        await waits(500); //just to be sure
        expect(callback1.calls.count()).toEqual(1);
            expect(nodeArray.length).toEqual(1);
            expect(nodeArray[0].nodeName).toBe('DIV');

    });


    it('should unbind everything when destroyed', async function () {
        var callback = jasmine.createSpy('callback');
        insertionQ('q').every(callback).destroy();
        await waits(20);
        document.body.appendChild(document.createElement('q'));
        await waits(200);
        expect(callback).not.toHaveBeenCalled();
    });

    it('should react to a disabled input insertion', async function () {
        var callback = jasmine.createSpy('callback');
        insertionQ('input[type="checkbox"]').every(callback);
        await waits(20);
        var el = document.createElement('input');
            el.type = 'checkbox';
            el.disabled = true;
            document.body.appendChild(el);
        await waits(200);
        expect(callback).toHaveBeenCalled();
    });

    it('should work with strictlyNew set to false', async function () {
        var asyncErrorCaught;
        var onErrorBackup = window.onerror;
        window.onerror = function (err) {
            asyncErrorCaught = err
        }
        insertionQ.config({
            strictlyNew: false
        });
        var callback = jasmine.createSpy('callback');
        document.body.appendChild(document.createElement('q'));
            insertionQ('q').summary(callback);
        await waits(200);
        insertionQ.config({
                strictlyNew: true
            });
        window.onerror = onErrorBackup
            if (asyncErrorCaught) {
                throw asyncErrorCaught
            }
    });


});
