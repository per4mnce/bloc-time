(function() {
    function LandingCtrl() {
        this.heroTitle = "Pomodoro";
    }

    angular
        .module('blocTime')
        .controller('LandingCtrl', LandingCtrl);
})(); 