(function () {
    function MainCtrl($interval) {
        console.log('Starting MainCtrl');

        var SESSION_TIME = 5;         //Work session default time - 1500 (25 minutes)
        var SHORT_SESSION_TIME = 300; //Short break session default time - 300 (5 minutes)
        var LONG_SESSION_TIME = 1800; //Long break session default time - 1800 (30 minutes)

        var stop = undefined;
        this.time = SESSION_TIME;
        
        var self = this; // This allows the inner function to gain access to 'this'

        this.workButtonName = 'Start';  //Set the name op the work button
    
        // Starts or resets the timer based on button text
        // Initiated by the user button click
        // Public function.  Called by button in main.html template
        this.startResetTimer = function() {
            if (self.workButtonName == 'Start' || self.workButtonName == 'Break' ){
                startTimer();
            }
            else{
                stopTimer();
            }  
        };
        
        // Stop othe timer and reset the button name
        // Private function
        stopTimer = function() {
            $interval.cancel(stop);
            self.workButtonName = 'Start';
            self.time = SESSION_TIME;
        }
        
        // Start the countdown timer
        // Private Function.
        startTimer = function() {
            console.log('self.startTimer:  ' + self.time);
            self.workButtonName = 'Reset';
                
            stop = $interval(function() {
                console.log('$interval function started:  ' + self.time);
                if (self.time > 0 ) {
                    console.log('self.time > 0');
                    self.time -= 1;
                }
                else {
                    $interval.cancel(stop);
                    stop = undefined;
                    console.log('$interval function stopped: ' + self.time)
                }
            }, 1000);
        };
        
        
        
    
    } //End of MainCtrl
    
    angular
        .module('blocTime')
        .controller('MainCtrl', ['$interval', MainCtrl]);
})();
