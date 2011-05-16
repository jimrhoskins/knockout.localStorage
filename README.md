# knockout.localStorage

knockout.localStorage is a plugin for knockout.js which allows observable 
values to be saved into localStorage. 

# Usage
You can make a ko.observable or ko.observableArray automatically persist
its value to localStorage, but adding a second options argument, and
specifying `{ persist: "localStorageKey"}` where `localStorageKey` is
the key to use when storing the value to localHost


    var viewModel = {
      name: ko.observable(),
      
      nameDefault: ko.observable('Jim'),

      namePersist: ko.observable(null, {persist: 'namePersist'}),

      nameDefaultPersist: ko.observable('James', {persist: 'nameDefaultPersis'})

    }

    ko.applyBindings(viewModel);

