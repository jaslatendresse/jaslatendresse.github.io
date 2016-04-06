function showRemaining() {
            var end = new Date('09/10/2016 9:00 PM');
            var _second = 1000;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;
            var timer;
            var now = new Date();
            var distance = end - now;
            if (distance < 0) {

                clearInterval(timer);
                document.getElementById('countdown').innerHTML = 'EXPIRED!';

            return;
            }
        var days = Math.floor(distance / _day);
        var hours = Math.floor((distance % _day) / _hour);
        var minutes = Math.floor((distance % _hour) / _minute);
        var seconds = Math.floor((distance % _minute) / _second);

        document.getElementById('countdown').innerHTML = days + 'days ';
        document.getElementById('countdown').innerHTML += hours + 'hrs ';
        document.getElementById('countdown').innerHTML += minutes + 'mins ';
        document.getElementById('countdown').innerHTML += seconds + 'secs';
    }
    timer = setInterval(showRemaining, 1000);


        function displayDate(){
            var d = new Date(),
            year = d.getFullYear(),
            months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'],
            days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

            document.getElementById("date").innerHTML = months[d.getMonth()]+' '+d.getDate()+', '+year;
        }


        var dailyPhotos;
        var today, img;

        dailyPhotos = function(){
            today = new Date();
            weekday = today.getDay();
            showImages = [];
            myPhotos = ["./pic5.jpg", "./pic6.png","./pic1.png","./pic2.png","./pic3.png","./pic4.png"];

            if(document.images) {
                for(var i = 0; i<myPhotos.length; i++){
                    showImages[i] = new Image();
                    showImages[i].src = myPhotos[i];
                } img = ((document.getElementById) ? document.getElementById("picoftheday"): document.images.picoftheday);
                         img.src = showImages[weekday].src;
                         img.alt = myPhotos[weekday];
            }return false;
        };