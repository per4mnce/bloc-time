(function() {
//    See https://www.firebase.com/docs/web/libraries/angular/quickstart.html#section-inject-services
    console.log("Starting Tasks.js");
    function Tasks() {
        //var Tasks = {};
        var ref = new Firebase("https://sweltering-inferno-4511.firebaseio.com/");
        
        // download tasks into a synchronized array
        var tasks = $firebaseArray(ref);
        
        return {
            all: tasks
            // remaining logic for tasks
        }
    }

    angular
        .module('blocTime')
        .factory('Tasks', [Tasks, '$firebaseArray']);
})();