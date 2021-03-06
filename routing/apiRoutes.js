function apiGet(array) {
// need to get the data from the array that is passed in, then print out each object's name, picture to the page
}

function apiPost() {
    var userResponses = getInputs();
    var user = {
      name: $("#user-name").val().trim(),
      picture: $("#user-image").val().trim(),
      scores: userResponses
    };
    var bestMatch = determineBestMatch(friends, user.scores);
    fillInResults(bestMatch);

    $.post("/api/friends", user)
    .done(function(data) {
      console.log(data);
    });
}


// Get user scores
function getInputs(){
  var scores = [];
  scores.push($('.question-one :selected').attr('value'));
  scores.push($('.question-two :selected').attr('value'));
  scores.push($('.question-three :selected').attr('value'));
  scores.push($('.question-four :selected').attr('value'));
  scores.push($('.question-five :selected').attr('value'));
  scores.push($('.question-six :selected').attr('value'));
  scores.push($('.question-seven :selected').attr('value'));
  scores.push($('.question-eight :selected').attr('value'));
  scores.push($('.question-nine :selected').attr('value'));
  scores.push($('.question-ten :selected').attr('value'));
  return scores;
}


//Determine Best Partner Logic
function determineScore(scoresArray) {
  var total = 0;
  for(let i = 0; i < scoresArray.length; i++){
    total += parseInt(scoresArray[i]);
  }
  return total;
}

function compareArrays(array1, array2) {
  var comparedArray = [];
  for (var i = 0; i < array1.length; i++) {
    var comparison = Math.abs(parseInt(array1[i]) - parseInt(array2[i]));
    if (comparison == 4) {
      comparison = comparison * 1.5;
    }
    else if(comparison == 3 || comparison == 2) {
      comparison = comparison * 1.25;
    }
    else if(comparison === 0){
      comparison = -8;
    }
    comparedArray.push(comparison);
  }
  return comparedArray;
}

function determineBestMatch(array, userArray) {
  var bestMatch = {
    name: null,
    picture: null,
    compatibility: 5000
  };
  for(let i = 0; i < array.length; i++){
    var compArray = compareArrays(userArray, array[i].scores);
    var compatibility = determineScore(compArray);
    if(bestMatch.compatibility > compatibility){
      bestMatch.name = array[i].name;
      bestMatch.picture = array[i].picture;
      bestMatch.compatibility = compatibility;
    }
  }
  return bestMatch;
};

function fillInResults(person) {
  $('.results').css('visibility', 'visible');
  $('.results > h1').text('Your Lab Partner Is...')
  $('#best-match-name').text(person["name"]);
  $('#best-match-picture').attr('src', person["picture"]);
}


$('#submit-btn').on('click', function(event) {
  event.preventDefault();
  apiPost();
})
