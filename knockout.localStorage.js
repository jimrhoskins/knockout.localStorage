(function(ko){
  "use strict";

  var DEFAULT_POLL_FREQUENCY = 1000;

  // Wrap ko.observable and ko.observableArray
  var methods = ['observable', 'observableArray'];

  var lastValue = {};

  ko.utils.arrayForEach(methods, function(method){
    var saved = ko[method];
    
    ko[method] = function(initialValue, options){
      options = options || {};

      var key = options.persist;

      // Load existing value if set
      if(key && localStorage.hasOwnProperty(key)){
        try{
          initialValue = JSON.parse(localStorage.getItem(key))
        }catch(e){};
      }

      // Create observable from saved method
      var observable = saved(initialValue);
      if (options.synclocal) lastValue[key] = initialValue;

      // Subscribe to changes, and save to localStorage
      if(key){
        observable.subscribe(function(newValue){
          localStorage.setItem(key, ko.toJSON(newValue));
          if (options.synclocal) lastValue[key] = newValue;
        });

        // Be notify of the changes at the localStorage
        if (options.synclocal) {
          (function (saved, key) {
            setInterval(function () {
              try{
                var localVal = JSON.parse(localStorage.getItem(key))
                if (lastValue[key] != localVal) {
                  observable(localVal);
                  lastValue[key] = localVal;
                }
              }catch(e){
                console.warn(e);
              };
            }, options.pollfreq || DEFAULT_POLL_FREQUENCY);
          })(saved, key);
        }

      };

      return observable;
    }
  })
})(ko);
