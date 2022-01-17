/**
 * https://gist.github.com/Yimiprod/7ee176597fef230d1451
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */

import transform from "lodash/transform";
import isEqual from "lodash/isEqual";
import isObject from "lodash/isObject";
import isArray from "lodash/isArray";
import difference from "lodash/difference";

export default function deepDifference(object, base) {
    function changes(object, base) {
        return transform(object, function(result, value, key) {
            if (!isEqual(value, base[key])) {
                if (isArray(value) && isArray(base[key])) {
                    result[key] = difference(value, base[key]); // Added by @Alizare for support array
                } else {
                    result[key] = isObject(value) && isObject(base[key]) ? changes(value, base[key]) : value;
                }
            }
        });
    }
    return changes(object, base);
}
