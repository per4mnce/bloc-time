var app = angular.module('blocTime');
app.factory('Tasks', ['$firebaseArray', function($firebaseArray) {

    var ref = new Firebase("https://sweltering-inferno-4511.firebaseio.com/tasks");

    // download tasks into a synchronized array
    var tasks = $firebaseArray(ref);

    return {
        add: function(task) {
            console.log("addTask from Task.js");
            var addTask = tasks.$add({
                name: task,
                date: Firebase.ServerValue.TIMESTAMP
                //completed: false
            });
            //return addTask;
        },
        delete: function(task) {
            return tasks.$remove(task);
        },
        all: function() {
            return tasks;
        }
    }
}]);

//(function() {
//    console.log("Starting Tasks.js");
//    function Tasks($firebaseArray) {
//        var ref = new Firebase("https://sweltering-inferno-4511.firebaseio.com/tasks");
//
//        // download tasks into a synchronized array
//        var tasks = $firebaseArray(ref);
//
//        return {
//            add: function(task) {
//                console.log("addTask from Task.js");
//                var addTask = tasks.$add({
//                    name: task,
//                    date: Firebase.ServerValue.TIMESTAMP
//                    //completed: false
//                });
//                return addTask;
//            },
//            delete: function(task) {
//                return tasks.$remove(task);
//            },
//            all: function() {
//                return tasks;
//            }
//        }
//    }
//
//    angular
//        .module('blocTime')
//        .factory('Tasks', [Tasks, '$firebaseArray']);
//})();

//// *** DEBUGGING WITHOUT FIREBASE ***
//(function() {
////    See https://www.firebase.com/docs/web/libraries/angular/quickstart.html#section-inject-services
//    console.log("Starting Tasks.js");
//    function Tasks() {
//        var Tasks = {};
//        
//        var taskList = ["Buy Milk", "Update Resume", "Update Linked-In"];
//        console.log(taskList);
//        
//        Tasks.getTasks = function(){
//            return taskList;
//        };
//        
//        return Tasks;
//    }
//
//    angular
//        .module('blocTime')
//        .factory('Tasks', [Tasks]);
//})();

