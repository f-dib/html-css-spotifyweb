const element = document.querySelector(".myBtn");
element.addEventListener("click", function() {
    document.querySelector(".timer").style.width = "100%";
});

const celltime = document.querySelector(".myBtn-j");
celltime.addEventListener("click", function() {
    document.querySelector(".timer-j").style.width = "100%";
});