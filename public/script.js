
    console.log('FFFFFFFFFFFFFFFFFFFFF');

alert("syka blyat");

    let div = document.createElement('div');
    div.className = "alert";
    div.innerHTML = "<div class=\"countdown-number\" style=\"display: flex; flex-direction: column; justify-content: space-between\">\n" +
        "    <span class=\"days countdown-time\">1</span>\n" +
        "    <span class=\"countdown-text\">Days</span>\n" +
        "  </div>\n" +
        "  <div class=\"countdown-number\" style=\"display: flex; flex-direction: column; justify-content: space-between\">\n" +
        "    <span class=\"hours countdown-time\">2</span>\n" +
        "    <span class=\"countdown-text\">Hours</span>\n" +
        "  </div>\n" +
        "  <div class=\"countdown-number\" style=\"display: flex; flex-direction: column; justify-content: space-between\">\n" +
        "    <span class=\"minutes countdown-time\">3</span>\n" +
        "    <span class=\"countdown-text\">Minutes</span>\n" +
        "  </div>\n" +
        "  <div class=\"countdown-number\" style=\"display: flex; flex-direction: column; justify-content: space-between\">\n" +
        "    <span class=\"seconds countdown-time\">4</span>\n" +
        "    <span class=\"countdown-text\">Seconds</span>\n" +
        "  </div>\n";
    div.style.cssText = "font-family: sans-serif; color: #88d; display: flex; justify-content: space-around;font-weight: 100; text-align: center; font-size: 30px;";
    div.id = 'countdown';
    document.body.prepend(div);

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var daysSpan = clock.querySelector('.days');
        var hoursSpan = clock.querySelector('.hours');
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            daysSpan.innerHTML = t.days;
            hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline="January 01 2021 00:00:00 GMT+0300";
    setTimeout(() => {initializeClock('countdown', deadline);}, 1000) ;