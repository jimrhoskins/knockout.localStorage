// Knockout localStorage plugin v0.0.1
// (c) 2011 Jim Hoskins - https://github.com/jimrhoskins/knockout.localStorage
// License: MIT (http://opensource.org/licenses/mit-license)

(function(a){a.utils.arrayForEach(["observable","observableArray"],function(c){var f=a[c];a[c]=function(a,d){var d=d||{},b=d.persist;if(b&&localStorage.hasOwnProperty(b))try{a=JSON.parse(localStorage.getItem(b))}catch(c){}var e=f(a);b&&e.subscribe(function(a){localStorage.setItem(b,JSON.stringify(a))});return e}})})(ko);
