const birthDayHandler = async (req, res) => {
  if (req.session.loggedIn) {
    const userID = req.session.user_id.value;
    const user = await User.findOne({ where: { id: `${userID}` } });
    if (user === null) {
      console.log("No user found!");
    } else {
      console.log(user instanceof User); // true
      const birthDay = user.birthday;
      console.log(birthDay);
    }
  }
};

const startBtn = document.getElementById("start-btn");
const countdownClock = document.querySelector(".hide-countdown");

startBtn.addEventListener("click", function () {
  countdownClock.classList.remove("hide-countdown");
});

// NEW CLOCK FUNCTION---------------------------------
window.initializeClock = function (clockId, dateId) {
  var getTimeRemaining = function (endtime) {
    var t = Date.parse(endtime) - new Date().getTime();
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  var clock = document.getElementById(clockId);
  var deadline = document.getElementById(dateId).value;
  var timeinterval = setInterval(function () {
    var t = getTimeRemaining(deadline);

    document.getElementById("days").innerText = t.days;
    document.getElementById("hours").innerText = t.hours;
    document.getElementById("minutes").innerText = t.minutes;
    document.getElementById("seconds").innerText = t.seconds;

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }, 1000);
};
