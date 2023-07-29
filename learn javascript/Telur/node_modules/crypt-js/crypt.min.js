/* Git Repository : https://github.com/Max1Truc/crypt     License : M.I.T. */
function crypt(r,t){for(var n="",o=0;o<r.length;o++){var e=r[o].charCodeAt(0),a=t[o%t.length].charCodeAt(0),c=String.fromCharCode(e+a);n=n.concat(c)}return n}function decrypt(r,t){for(var n="",o=0;o<r.length;o++){var e=r[o].charCodeAt(0),a=t[o%t.length].charCodeAt(0),c=String.fromCharCode(e-a);n=n.concat(c)}return n}
