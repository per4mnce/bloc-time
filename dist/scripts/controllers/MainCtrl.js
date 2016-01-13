(function () {
    function MainCtrl($interval) {
        console.log('Starting MainCtrl');

        var SESSION_TIME = 60; //1500 = 25 minutes
        var breakTime = 300; //5 minutes

        var stop;

        this.time = SESSION_TIME;


        this.buttonName = 'Start';
        
        this.startTimer = function() {
            console.log('this.startTimer:  ' + this.time);
            this.time -= 1;
                
            stop = $interval(function() {
                console.log('$interval function started:  ' + this.time);
                if (this.time > 0 ){
                    console.log('this.time > 0');
                    this.time -= 1;
                }
                else{
                    $interval.cancel(stop);
                    stop = undefined;
                    console.log('$interval function stopped: ' + this.time)
                }
            }, 1000);
        }
    }
    
    angular
        .module('blocTime')
        .controller('MainCtrl', ['$interval', MainCtrl]);
})();
