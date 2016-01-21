(function () {
    function MainCtrl($interval, Tasks) {
        console.log('Starting MainCtrl');

        // Initialize Variables

        //Constants
        var WORK_TIME = 5; //Work session default time - 1500 (25 minutes)
        var SHORT_BREAK_TIME = 3; //Short break session default time - 300 (5 minutes)
        var LONG_BREAK_TIME = 10; //Long break session default time - 1800 (30 minutes)

        // Private variables
        var timer; //Countdown timer used in $interval 
        var completedWorkSessions = 0; // The number of completed work sessions.  Used to determine break length
        var self = this; // Allows the inner function to gain access to 'this'
        var mySound = new buzz.sound( "assets/sounds/ding.mp3", { // Sound to play at the end of session
            preload: true
        });

        // Public variables
        this.onBreak = false; // State of break.  False indicates not on break
        this.time = WORK_TIME; // The value of the timer.  This variable is used in the template directive
        this.buttonName = 'Start'; //Set the name of the button
        this.taskList = Tasks.all(); // Get tasks from FireBase using the Tasks factory
        
        // Public function.  Called by the buttons in main.html template
        // Starts the countdown timer and handles resetting the timer
        this.startResetTimer = function () {
            console.log('startResetTimer() started');
            if (self.buttonName === 'Start') {
                $interval.cancel(timer); //Stop timer
                timer = $interval(countdown, 1000);
            } else {
                setTimer();
            }
        };
        
        // Starts the countdown clock
        // Private function
        // Initiated by the startResetTimer function's use of $interval
        var countdown = function () {
            self.time -= 1;
            self.buttonName = "Reset"; // Change the button to 'Reset'
            console.log("countdown " + self.time);

            if (self.time <= 0) {
                mySound.play(); //Play notification sound
                 // Increment Work Session count if not on break
                if (!self.onBreak) {
                    completedWorkSessions += 1; // Increment if work session
                    //alert('completedWorkSessions: ' + completedWorkSessions);
                }
                self.onBreak = !self.onBreak; // Swap break status
                setTimer();
            }
        };

        // Set the timer to appropriate duration
        // Private function
        var setTimer = function () {
            $interval.cancel(timer); //Stop timer
            
            // Determine correct duration
            // After 4 completed work sessions, the break duration is longer 
            self.buttonName = "Start";
            if (self.onBreak) {
                // Handle Break
                if (completedWorkSessions % 4 === 0) {
                    self.time = LONG_BREAK_TIME;
                } else {
                    self.time = SHORT_BREAK_TIME;
                }
            } else {
                // Handle Work Session
                self.time = WORK_TIME;
            }
        };
        
        // Add new task to the task list in Firebase
        // Public function
        this.addTask = function() {
            var inputBox =  document.getElementById('taskInput')
            
            //Add task to the list unless it is empty
            if (inputBox.value) {
                Tasks.add(inputBox.value); //Write to Firebase database via the Tasks factory
                inputBox.value = "";  //Clear the contents of the inputBox
                inputBox.focus();  // Put cursor in the inputBox
            }
        };

    } // End of MainCtrl


    angular
        .module('blocTime')
        .controller('MainCtrl', ['$interval', 'Tasks', MainCtrl]);
})();
