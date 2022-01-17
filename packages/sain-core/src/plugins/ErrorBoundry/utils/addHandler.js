export default function addHandler(obj, evnt, handler) {
    if (obj.addEventListener) {
        obj.addEventListener(evnt.replace(/^on/, ""), handler, false);
        // Note: attachEvent fires handlers in the reverse order they
        // were attached. This is the opposite of what addEventListener
        // and manual attachment do.
        //} else if (obj.attachEvent) {
        //    obj.attachEvent(evnt, handler);
    } else {
        if (obj[evnt]) {
            var origHandler = obj[evnt];
            obj[evnt] = function (evt) {
                origHandler(evt);
                handler(evt);
            };
        } else {
            obj[evnt] = function (evt) {
                handler(evt);
            };
        }
    }
}
