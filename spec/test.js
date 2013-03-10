describe("Insertion Query lib", function() {


        it('should react to an insertion', function() {
            var callback = jasmine.createSpy('callback');
            runs(function() {
                insertionQ('blockquote',callback);
            });
            waits(200);
            runs(function() {
                document.body.appendChild(document.createElement('blockquote'));
            });
            waits(200); //just to be sure
            runs(function() {
                expect(callback.calls.length).toEqual(1);
            });

        });


        it('should call the callbacks for two selectors accordingly', function() {
            var callback1 = jasmine.createSpy('callback'),
                callback2 = jasmine.createSpy('callback');
            runs(function() {
                insertionQ('#a',callback1);
                insertionQ('#b',callback2);
            });
            waits(200);
            runs(function() {
                var el=document.createElement('q');
                el.id="a";
                document.body.appendChild(el);
                el=document.createElement('q');
                el.id="b";
                document.body.appendChild(el);
            });
            waits(200); //just to be sure
            runs(function() {
                expect(callback1.calls.length).toEqual(1);
                expect(callback2.calls.length).toEqual(1);
            });

        });

        it('should react to a change that causes the element to match the selector', function() {
            var callback = jasmine.createSpy('callback'),
                el;
            runs(function() {
                insertionQ('q.someFunnyClass',callback);
            });
            waits(200);
            runs(function() {
                el=document.createElement('q');
                document.body.appendChild(el);
            });
            waits(100);
            runs(function() {
                el.setAttribute('class','someFunnyClass');
            });
            waits(200);
            runs(function() {
                expect(callback.calls.length).toEqual(1);
            });

        });

        it('should not react to old elements', function() {
            var callback = jasmine.createSpy('callback');
            runs(function() {
                document.body.appendChild(document.createElement('q'));
            });
            waits(200);
            runs(function() {
                insertionQ('q',callback);
            });
            waits(200);
            runs(function() {
                document.body.appendChild(document.createElement('q'));
            });
            waits(200);
            runs(function() {
                expect(callback.calls.length).toEqual(1);
            });

        });
        it('should NOT react to old elements getting displayed just now (reacts in webkit)', function() {
            var callback = jasmine.createSpy('callback'),
                el=document.createElement('q');
            runs(function() {
                el.style.display='none';
                document.body.appendChild(el);
            });
            waits(200);
            runs(function() {
                insertionQ('q',function(){
                    console.log('call');
                    callback();
                });
            });
            waits(200);
            runs(function() {
                el.style.display='inline';
            });
            waits(400);
            runs(function() {
                expect(callback.calls.length).toEqual(0);
            });

        });

    });