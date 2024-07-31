// SCROLL AND COUNTER ANIMATIONS

const elements = document?.querySelectorAll("[data-count]");

function updateCounter(el) {
  let counterInterval = 1700;

  let startVal = 0;
  let endVal = parseInt(el.dataset.count);
  //console.log(endVal);

  let counterDuration = Math.floor(counterInterval / endVal);

  let counter = setInterval(function () {
    startVal += 1;
    el.innerText = startVal;

    if (startVal === endVal) {
      clearInterval(counter);
    }
  }, counterDuration);
}

const animateCounterEl = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      updateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}

const counterObserver = new IntersectionObserver(animateCounterEl);
elements.forEach((el) => counterObserver.observe(el));

//console.log(elements);