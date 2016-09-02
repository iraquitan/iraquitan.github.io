/**
 * Created by iraquitan on 9/2/16.
 */
var scrollTimer;
var scrollLinks = document.querySelectorAll("#navbar-scrollspy a, .navbar-brand");
for (var i = 0; i < scrollLinks.length; i++) {
    var obj = scrollLinks[i];
    obj.addEventListener("click", function (event) {
        var hashElem = document.querySelectorAll(this.hash);
        if (hashElem.length) {
            event.preventDefault();
            clearInterval(scrollTimer);
            scrollTo(document.body, hashElem[0].offsetTop, 1250);
        }
    }, false);
}

if (window.scrollY !== 0) {
    if (document.querySelectorAll("nav")[0].classList.contains("transp")) {
        document.querySelectorAll("nav")[0].classList.remove("transp");
    }
}

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        if (document.querySelectorAll("nav")[0].classList.contains("transp")) {
            document.querySelectorAll("nav")[0].classList.remove("transp");
        }
    } else {
        document.querySelectorAll("nav")[0].classList.add("transp");
    }
});

function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        increment = 20;

    var animateScroll = function(elapsedTime) {
        elapsedTime += increment;
        var position = easeInOut(elapsedTime, start, change, duration);
        element.scrollTop = position;
        if (elapsedTime < duration) {
            scrollTimer = setTimeout(function() {
                animateScroll(elapsedTime);
            }, increment);
        }
    };

    animateScroll(0);
}

function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}