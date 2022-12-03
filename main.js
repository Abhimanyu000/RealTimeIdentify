result=" ";

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifi=ml5.imageClassifier("MobileNet", modelLoaded);
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifi.classify(video, gotResults);
}

function modelLoaded(){
  console.log("Model Loaded");
}

function gotResults(error, results){
  if(error){
    console.error(error);
  }
  else{
    if((results[0].confidence>0.5)&&(result!=results[0].label)){
      console.log(results);
      result=results[0].label;
      speech=window.speechSynthesis;
      speakdata="Object is"+result;
      speak=new SpeechSynthesisUtterance(speakdata);
      speech.speak(speak);
      document.getElementById("object_display").innerHTML=result;
      document.getElementById("accuracy_display").innerHTML=results[0].confidence.toFixed(2);
    }
  }
}