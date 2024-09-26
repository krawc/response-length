var browser = (function() {
    var test = function(regexp) {return regexp.test(window.navigator.userAgent)}
    switch (true) {
        case test(/edg/i): return "Microsoft Edge";
        case test(/trident/i): return "Microsoft Internet Explorer";
        case test(/firefox|fxios/i): return "Mozilla Firefox";
        case test(/opr\//i): return "Opera";
        case test(/ucbrowser/i): return "UC Browser";
        case test(/samsungbrowser/i): return "Samsung Browser";
        case test(/chrome|chromium|crios/i): return "Google Chrome";
        case test(/safari/i): return "Apple Safari";
        default: return "Other";
    }
})();
console.log(browser);

if(browser != "Google Chrome")alert("This demonstrator is only compatible with Chrome Browser. You will not be able to interact with it. Please open in Chrome.");

var answerOptions;
var questionContainer;
var synthesis = window.speechSynthesis;
var Asking = document.querySelector('button.button');
var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

function listen() {
    Asking.disabled = true;
    Asking.textContent = '...';

    recognition.lang = 'en-UK';
  	recognition.interimResults = false;
  	recognition.maxAlternatives = 1;

  	recognition.start();

  	recognition.onresult = function(event) {
      var speechResult = event.results[0][0].transcript.toLowerCase();
      console.log(event.results[0][0].transcript.toLowerCase());
      respond(speechResult);
  	}

    recognition.onspeechend = function() {
	    recognition.stop();
	    Asking.textContent = 'Click to ask.';
	    Asking.disabled = false;
    }

    recognition.onerror = function(event) {
	    Asking.textContent = 'Click to ask.';
	    Asking.disabled = false;
	    if (browser != "Google Chrome") {
			speak ("Error. Try opening in Chrome browser.");
		}
	    else {
			speak("Recognition error. Please try again.");
		}
    }
}

function speak(utterance){
  var utterThis = new SpeechSynthesisUtterance(utterance);
  var voiceList = synthesis.getVoices();
  var i;
  for (i = 0; i < voiceList.length; i++) {
  	if(voiceList[i].name=="Google UK English Female"){
      console.log(voiceList[i].name);
      break;
    }
  }

  utterThis.voice = voiceList[i];

  utterThis.onend = function (event) {
    console.log("Finished speaking.");
  }

  utterThis.onerror = function (event) {
    console.log("Error: "+event.name);
  }

  utterThis.lang = 'en-UK';
  synthesis.speak(utterThis);
  console.log("Speaking started:"+utterance);
}

function speakMusic(utterance){
  var utterThis = new SpeechSynthesisUtterance(utterance);
  var voiceList = synthesis.getVoices();
  var i;
  for (i = 0; i < voiceList.length; i++) {
  	if(voiceList[i].name=="Google UK English Female"){
      console.log(voiceList[i].name);
      break;
    }
  }

  utterThis.voice = voiceList[i];

  utterThis.onend = function (event) {
    console.log("Finished speaking.");
    play();
  }

  utterThis.onerror = function (event) {
    console.log("Error: "+event.name);
  }

  utterThis.lang = 'en-UK';
  synthesis.speak(utterThis);
  console.log("Speaking started.");
}

function respond(question){
  var response_style;
  var radioButtons = document.getElementsByName("response_style");
    for(var i = 0; i < radioButtons.length; i++)
    {
        if(radioButtons[i].checked == true)
        {
            response_style = i;
        }
    }
  if(question.includes('weather')) task = 0;
  else if(question.includes('play')) task = 1;
  else if(question.includes('timer')){
    task = 2;
    minutes = question.match(/\d+/);
	if(minutes == null){
	switch(response_style) {
        case 0:
          speak("Minutes missing.");
          break;
        case 1:
          speak("Timer: minutes missing.");
          break;
        case 2:
          speak("The minutes were missing for your timer. Please try again.");
          break;
      }    
      return;
    }
  }
  else if(question.includes('remind')){
    task = 3;
    hour = null;
    hour = question.match(/\d+/);
    if(hour == null){
	switch(response_style) {
        case 0:
          speak("Time missing.");
          break;
        case 1:
          speak("Reminder: Time missing.");
          break;
        case 2:
          speak("The time was missing for your reminder. Please try again.");
          break;
      }    
      return;
    }
    if(question.includes("a.m.")) AMPM = "AM";
    else if (question.includes("p.m.")) AMPM ="PM";
  	else AMPM = "o'clock";
  }
  else if(question.includes('calendar')||question.includes('schedule')) task = 4;
  else if(question.includes('background')||question.includes('blue')) task = 5;
  else if(question.includes('news')) task = 6;
  else if(question.includes('population')||question.includes('how many')) task = 7;
  else task = -1;

  switch (task) {
	case 0:
      switch(response_style) {
        case 0:
          speak("sunny, 5 to -3 degrees.");
          break;
        case 1:
          speak("Weather tomorrow: sunny, 5 to -3 degrees.");
          break;
        case 2:
          speak("The weather tomorrow is gonna be sunny with a high of 5 degrees and a low of -3 degrees.");
          break;
      }
      break;
    case 1:
      switch(response_style) {
        case 0:
          play();
          break;
        case 1:
          speakMusic("Rafael - Ukulele song.");
          break;
        case 2:
          speakMusic("Sure, playing Ukulele song by Rafael for you.");
          break;
      }
      break;
    case 2:
      switch(response_style) {
        case 0:
          speak("Okay.");
          break;
        case 1:
          speak("Timer "+minutes+" minutes.");
          break;
        case 2:
          speak("Okay, your timer is set to "+ minutes +" minutes. Starting now.");
          break;
      }
      break;
    case 3:
      switch(response_style) {
        case 0:
          speak("Okay.");
          break;
        case 1:
          speak("Get Cake," + hour + AMPM + ".");
          break;
        case 2:
          speak("Okay, I'll remind you to Get Cake at "+ hour + AMPM + ".");
          break;
      }
      break;
    case 4:
      switch(response_style) {
        case 0:
          speak("Lunch with Steven, 12PM. Dinner with Ann, 7PM.");
          break;
        case 1:
          speak("Meetings tomorrow: Lunch with Steven, 12PM. Dinner with Ann, 7PM.");
          break;
        case 2:
          speak("You have two appointments. At 12 PM there is Lunch with Steven and at 7 PM dinner with Ann.");
          break;
      }
      break;
    case 5:
      switch(response_style) {
        case 0:
          break;
        case 1:
          speak("Background color blue.");
          break;
        case 2:
          speak("Okay, your background color is set to blue.");
          break;
      }
      document.body.style.backgroundColor = 'lightblue';
      setTimeout(function() {
        // Code, der erst nach 2 Sekunden ausgeführt wird
        document.body.style.backgroundColor = 'white';
      }, 3000);
      break;
    case 6:
      switch(response_style) {
        case 0:
          speak("BBC. Australia not intimidated by Facebook news ban.");
          break;
        case 1:
          speak("News today. BBC. Australia not intimidated by Facebook news ban.");
          break;
        case 2:
          speak("Here is what I found. CNNs latest headline is: Australia not intimidated by Facebook news ban.");
          break;
      }     
      break;
    case 7:
        switch(response_style) {
        case 0:
          speak("328 million.");
          break;
        case 1:
          speak("US population: 328 million.");
          break;
        case 2:
          speak("The total size of the US population amounts to 328 million.");
          break;
      }  
      break;
    default:
	switch(response_style) {
        case 0:
          speak("Did not understand.");
          break;
        case 1:
          speak("Did not understand. Try again.");
          break;
        case 2:
          speak("Sorry, I did not understand. Please repeat your request.");
          break;
	}
  }
}

function play(){
  var audio = new Audio('UkuleleSong_short.mp3');
  audio.play();
}

Asking.addEventListener('click', listen);
