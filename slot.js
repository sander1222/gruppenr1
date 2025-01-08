var options = {
  click2Spin: false,
  sounds: {
    reelsBegin: "audio/reelsBegin.mp3",
    reelsEnd: "audio/reelsEnd.mp3",
  },
};

var reels = [
  {
    imageSrc: "../Image/reel-strip1.png",
    symbols: [
      {
        title: "cherry",
        position: 100,
        weight: 2,
      },
      {
        title: "plum",
        position: 300,
        weight: 6,
      },
      {
        title: "orange",
        position: 500,
        weight: 5,
      },
      {
        title: "bell",
        position: 700,
        weight: 1,
      },
      {
        title: "cherry",
        position: 900,
        weight: 3,
      },
      {
        title: "plum",
        position: 1100,
        weight: 5,
      },
    ],
  },
  {
    imageSrc: "../Image/reel-strip2.png",
    symbols: [
      {
        title: "orange",
        position: 100,
        weight: 6,
      },
      {
        title: "plum",
        position: 300,
        weight: 5,
      },
      {
        title: "orange",
        position: 500,
        weight: 3,
      },
      {
        title: "plum",
        position: 700,
        weight: 5,
      },
      {
        title: "cherry",
        position: 900,
        weight: 2,
      },
      {
        title: "bell",
        position: 1100,
        weight: 1,
      },
    ],
  },
  {
    imageSrc: "../Image/reel-strip3.png",
    symbols: [
      {
        title: "cherry",
        position: 100,
        weight: 4,
      },
      {
        title: "bell",
        position: 300,
        weight: 1,
      },
      {
        title: "orange",
        position: 500,
        weight: 6,
      },
      {
        title: "plum",
        position: 700,
        weight: 5,
      },
      {
        title: "plum",
        position: 900,
        weight: 3,
      },
      {
        title: "cherry",
        position: 1100,
        weight: 2,
      },
    ],
  },
];

window.onload = function () {
  var credits = document.querySelector("#slot-credits strong");
  var winnings = parseInt(credits.innerText, 10);

  var callback = function (payLine) {
    // Pay lines consist of an array of symbols[], first payline being 0 → ∞
    console.log(
      payLine[0].title + " | " + payLine[1].title + " | " + payLine[2].title
    );

    // If all three symbols match..
    if (
      payLine[0].title === payLine[1].title &&
      payLine[0].title === payLine[2].title
    ) {
      new Audio("audio/winner.mp3").play();

      // .. payout winnings
      switch (payLine[0].title) {
        case "bell":
          winnings += 50;
          break;

        case "cherry":
          winnings += 25;
          break;

        case "orange":
          winnings += 10;
          break;

        case "plum":
          winnings += 5;
          break;
      }

      credits.innerText = winnings;
    }

    button.disabled = false;
  };

  var container = document.getElementById("slot-machine");

  //   var slot = slotMachine(container, reels, callback, options);

  var button = document.getElementById("play-button");

  button.addEventListener("click", () => {
    if (button.disabled || winnings === 0) {
      return;
    }

    credits.innerText = winnings -= 1;

    slot.play();

    button.disabled = true;
  });
};
