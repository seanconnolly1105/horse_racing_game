// The main wrapper function - when page id ready
//===============================================
$(function() {

  let numberOfHorsesFinished = 0;
  let noOfHorses = 0;
  let horseArray = new Array();
  const PLACES = ['zero', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth'];
  const FRAMES = 80;
  const MAX = 25000;
  const MIN = 1000;
  const SHOW_RESULTS_BUTTON = false;

  //===========================================
  // Add a single horse to the horse objects
  //===========================================
  function addHorse(i) {
      horseArray[i] = {
          id: `horse${i}`,
          name: `Horse ${i}`,
          horseContainer: `#horse-container${i}`,
          time: 0,
          totalTime: 0,
          place: 0
      };
  }

 //===========================================================
 // Move the race results into into view if it's off the screen
 //============================================================
  function bringResultsIntoFocus () {
    $('#raceInfoContainer').show();
    let pos = $('#raceInfoContainer').position();
    let top = pos.top;
    let height = $('#raceInfoContainer').height();
    let devHeight = $(window).height();
    let moveUp = devHeight - (top + height);
//    console.log (`moveUp: ${moveUp}`)
    if (moveUp < 0) {
      moveUp -= 100;
      $('#raceInfoContainer').animate({top: moveUp}, 1000);
    }
  }

  //===========================================
  // animate the horse
  //===========================================
//  let animateHorse = function (thisHorseObj) {
  function animateHorse (thisHorseObj) {
    thisHorseObj.time = (Math.floor(Math.random() * (MAX - MIN + 1)) + MIN) / FRAMES;
    thisHorseObj.totalTime += thisHorseObj.time;
    let timeTaken = thisHorseObj.time;
    let horseContainer = thisHorseObj.horseContainer;
    let horseWidth = $(horseContainer).width();
    let pos = $(horseContainer).position();
    let horsePosition = pos.left - 8;
//    let horseWidth = $('.horse-container').width();
    let raceTrackWidth = $(window).width() - (horseWidth + 20); // remember the border is 20px
    $(horseContainer).animate({
        left: horsePosition + (raceTrackWidth / FRAMES),      // move the horse width of the racetrack
        easing: "linear"
    }, timeTaken, function() {
        let pos = $(horseContainer).position();
        let horsePosition = pos.left - 8;       // starting position is 8
        if (horsePosition >= raceTrackWidth) {
        // give some text feedback in the race info box
        place++;
        let horseName = thisHorseObj.name;
        let horseInfo = `<div class=\"raceInfo\">${horseName} finished in ${PLACES[place]} place in a time of ${(thisHorseObj.totalTime/1000).toFixed(3)} seconds!</div>`;
        $("#raceInfoContainer").append(horseInfo);
        numberOfHorsesFinished++;
        if (numberOfHorsesFinished === noOfHorses - 1) {    // Every horse is in
          if (SHOW_RESULTS_BUTTON) {
            $('#results').show();
            return;
          }
          bringResultsIntoFocus();
        }
      } else {
        animateHorse (thisHorseObj);
      }
    });
  }

  //===========================================
  // Build the array of horse objects
  //===========================================
  $(".selection").change(function() {
      $(".selection").prop("disabled", true);
      noOfHorses = $(".selection").val();
//      noOfHorses++;
      for (i = 1; i <= noOfHorses; i++) {
          currentHorse = i;
          addHorse(i);
          let appendString = `<div id="horse-container${i}" class="horse-container">
      <img id="horse${i}" class="horse" src="img/transparent-horse.png">
      <div class="after">${i}</div>
      </div>`
          $('#racetrack').append(appendString);

          //      $('#racetrack').append($('<img>',{id:`horse${i}`, class:'horse', src:'img/transparent-horse.png'}));
          // let horseInfo = `<div class=\"raceInfo\"></div>`;
          // $("#raceInfoContainer").append(horseInfo);
      }
//      $('#raceInfoContainer').show();
  });

  //===========================================
  // Main logic - when the GO button is clicked
  //===========================================
  $('#go').click(function() {

      $("#go").prop("disabled", true);
      $('#go').css('opacity', '0.6');

      place = 0;

      for (i = 1; i < horseArray.length; i++) {
          animateHorse (horseArray[i]);
      }

  });
  //===========================================
  // End of Main logic
  //===========================================

  //===========================================
  // reset the race
  //===========================================
  $('#reset').click(function() {
      location.reload();
  });

  //===========================================
  // display results when button clicked
  //===========================================
  $('#results').click(function() {
    bringResultsIntoFocus();
  });

});
