var i = 0, imgsrc = new Array(), preload = new Array();
imgsrc[0]="./pic1.png";
imgsrc[1]="./pic2.png";
imgsrc[2]="./pic3.png";
imgsrc[3]="./pic4.png";
imgsrc[4]="./pic5.png";
imgsrc[5]="./pic6.png";
for (var j=0;j<imgsrc.length;j++)
{
preload[j] = new Image;
preload[j].src = imgsrc[j];
}

function startSlideshow()
{
    document.getElementById("picoftheday").src=imgsrc[i];
    i++;
    setTimeout("startSlideshow()",86400);
    if(i==imgsrc.length)
    {
        i=0;
    }
}

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
