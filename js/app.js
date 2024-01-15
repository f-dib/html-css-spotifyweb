const element = document.getElementById("myBtn");
element.addEventListener("click", function() {
    document.querySelector(".timer").style.width = "100%";
    document.getElementById("myBtn").classList.toggle('fa-circle-play');
    document.getElementById("myBtn").classList.toggle('fa-circle-pause');
});

const celltime = document.getElementById("myBtn-j");
celltime.addEventListener("click", function() {
    document.querySelector(".timer-j").style.width = "100%";
    document.getElementById("myBtn-j").classList.toggle('fa-circle-play');
    document.getElementById("myBtn-j").classList.toggle('fa-circle-pause');
});