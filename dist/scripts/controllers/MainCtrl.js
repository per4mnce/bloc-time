(function () {
    function MainCtrl($interval) {
        console.log('Starting MainCtrl');

        // Initialize
        var WORK_TIME = 5; //Work session default time - 1500 (25 minutes)
        var SHORT_BREAK_TIME = 3; //Short break session default time - 300 (5 minutes)
        var LONG_BREAK_TIME = 10; //Long break session default time - 1800 (30 minutes)
        var timer;
        var self = this; // This allows the inner function to gain access to 'this'

        this.onBreak = false;
        this.time = WORK_TIME; // Initial timer setting
        this.buttonName = 'Start'; //Set the name op the work button


        // Public function.  Called by button in main.html template
        this.startResetTimer = function () {
            console.log('startResetTimer() started');
            if (self.buttonName === 'Start') {
                timer = $interval(countdown, 1000);
            } else {
                //alert("Reset Button");
                setTimer();
            }
        };

        // Starts the countdown clock
        var countdown = function () {
            self.time -= 1;
            self.buttonName = "Reset";
            console.log("countdown " + self.time);

            if (self.time <= 0) {
                $interval.cancel(timer); //Stop Timer
                //self.onBreak ? setWork() : setBreak();
                self.onBreak = !self.onBreak;  //Change from current break type to the other
                setTimer();
            }
        };

        var setTimer = function () {
            $interval.cancel(timer); //Stop timer
            self.buttonName = "Start";
            if (self.onBreak) {
                self.time = SHORT_BREAK_TIME;
            } else {
                self.time = WORK_TIME;
            }
        };

    } // End of MainCtrl


    angular
        .module('blocTime')
        .controller('MainCtrl', ['$interval', MainCtrl]);
})();
