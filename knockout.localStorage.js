(function(ko){
  // Wrap ko.observable and ko.observableArray
  var methods = ['observable', 'observableArray'];

  ko.utils.arrayForEach(methods, function(method){
    var saved = ko[method];
    
    ko[method] = function(initialValue, options){
      options = options || {};

      //Name of the key to local storage, null = don't look at local storage
      var key = options.persist;
      
      //Custom constuctor method, injection method so callers can specify how to recontruct the object.      
      var constructorMethod = options.constructorMethod;

      // Load existing value if set
      if(key && localStorage.hasOwnProperty(key)){
        try{
          initialValue = JSON.parse(localStorage.getItem(key))
        }catch(e){};
      }

      //call the custom contructor if needed.
      var observableObject = null;
      if (constructorMethod) {observableObject = constructorMethod(initialValue);}
      else {observableObject = initialValue;}
      
      // Create observable from saved method
      var observable = saved(observableObject);
      
      // Subscribe to changes, and save to localStorage
      if(key){
        observable.subscribe(function(newValue){
          localStorage.setItem(key, ko.toJSON(newValue));
        });
      };

      return observable;
    }
  })
})(ko);
