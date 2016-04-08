function showRemaining() {
    "use strict";
    var end = new Date('09/10/2016 9:00 PM'),
        second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        timer,
        now = new Date(),
        distance = end - now;
    
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'EXPIRED!';

        return;
    }
    var days = Math.floor(distance / day),
        hours = Math.floor((distance % day) / hour),
        minutes = Math.floor((distance % hour) / minute),
        seconds = Math.floor((distance % minute) / second);

    document.getElementById('countdown').innerHTML = days + 'days ';
    document.getElementById('countdown').innerHTML += hours + 'hrs ';
    document.getElementById('countdown').innerHTML += minutes + 'mins ';
    document.getElementById('countdown').innerHTML += seconds + 'secs';
}
timer = setInterval(showRemaining, 1000);


function displayDate() {
    "use strict";
    var d = new Date(),
        year = d.getFullYear(),
        months = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    document.getElementById("date").innerHTML = months[d.getMonth()] + ' ' + d.getDate() + ', ' + year;
}

var dailyPhotos, today, img;

    dailyPhotos = function () {
    "use strict";
    today = new Date();
    weekday = today.getDay();
    showImages = [];
    myPhotos = ["./pic5.jpg", "./pic6.png", "./pic1.png", "./pic2.png", "./pic3.png", "./pic4.png"];

        if(document.images) {
            for(var i = 0; i<myPhotos.length; i++){
                showImages[i] = new Image();
                showImages[i].src = myPhotos[i];
            } img = ((document.getElementById) ? document.getElementById("picoftheday"): document.images.picoftheday);
                         img.src = showImages[weekday].src;
                         img.alt = myPhotos[weekday];
            }return false;
        };