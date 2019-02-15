let horseArray = new Array();
let places = ['zero', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eigth', 'ninth', 'tenth'];

function addHorse(i) {
    // let thisHorse = {   id: `horse${i}`,
    //                     name: `Horse ${i}`,
    //                     time: 0,
    //                     place: 0};
    // horseArray [i] = thisHorse;
    horseArray[i] = {
        id: `horse${i}`,
        name: `Horse ${i}`,
        time: 0,
        place: 0
    };
}

$(".selection").change(function() {
    $(".selection").prop("disabled", true);
    let noOfHorses = $(".selection").val();
    noOfHorses++;
    for (i = 1; i < noOfHorses; i++) {
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
    $('#raceInfoContainer').show();
    console.log(JSON.stringify(horseArray, undefined, 2));
    //    console.log (horseArray.length);
});

// Click the GO button
$('#go').click(function() {

    $("#go").prop("disabled", true);

    place = 0;

    console.log(`About to race`);

    for (i = 1; i < horseArray.length; i++) {
        // get the width of the horse
        let horseWidth = $('.horse-container').width();

        // get the width of the racetrack
        let raceTrackWidth = $(window).width() - horseWidth - 20; // remember the border is 20px

        // generate a random # between 10 and 20 seconds

        let max = 4000;
        let min = 2000;

        horseArray[i].time = Math.floor(Math.random() * (max - min + 1)) + min;
        let timeTaken = horseArray[i].time;
        let horseName = horseArray[i].name;
        // animate the horse
        let thisHorse = `#horse-container${i}`;
        console.log(`About to animate ${thisHorse}`);
        console.log(`Race track width: ${raceTrackWidth}`);
        $(thisHorse).animate({
            // move the horse width of the racetrack
            left: raceTrackWidth
        }, timeTaken, function(i) {
            // give some text feedback in the race info box
            place++;
            let horseTimeInfo = `${horseName} finished in ${place} place and checked in at ${timeTaken/1000} seconds!`;
            console.log(horseTimeInfo);
            horseInfo = `<div class=\"raceInfo\">${horseName} finished in ${places[place]} place in a time of ${timeTaken/1000} seconds!</div>`;
            $("#raceInfoContainer").append(horseInfo);

            //        $('#raceInfo1 span').text(horseTimeInfo);
        });
    }
});

// reset the race
$('#reset').click(function() {
    location.reload();
});
