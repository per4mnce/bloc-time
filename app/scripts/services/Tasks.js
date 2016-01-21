//Persist the data in Firebase database
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