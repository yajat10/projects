function setup(){
  
    canvas=createCanvas(280,280)
    
    canvas.mouseReleased(clasifyCanvas);
    synth=window.speechSynthesis;
    background("white");
  }

function cc(){
    background("white")
}
function preload(){
  classifier=ml5.imageClassifier('DoodleNet')
}
function clasifyCanvas(){
  classifier.classify(canvas,gotResults)
}
array_1=['bottle',' pen','book','mobile ']
random_number=Math.floor((Math.random()*array_1.length)+1);
element_of_array=array_1[random_number];
console.log("quick draw data set!");
document.getElementById("sketch_to_be_drawn").innerHTML=element_of_array;
timer_counter=0;
timer_check="";
drawn_sketch="";
answer_string="";
sketch=""
score=0;
function check_sketch(){
  timer_counter=timer_counter++
  document.getElementById("timer").innerHTML="Timer: "+timer_counter;
  console.log("timer counter="+timer_counter);
  if(timer_counter==1500) {
    timer_counter=0;
    timer_check="done!";
  if(timer_check=="done!" || answer_string=="set"){
    timer_check="";
    answer_string="";
    setup()
  }
  }
}
function draw(){
  check_sketch()
  if(drawn_sketch==sketch){
     answer_string="set";
     score=score++
     console.log("answer is set!");  
     document.getElementById("score").innerHTML="Score: "+score
  }
}
function gotResults(error,results){
if(error){
  console.log("error "+error);
}
else{
  console.log(results);
  document.getElementById("label").innerHTML="Label: "+results[0].label;
  document.getElementById("confidence").innerHTML="Confidence: "+Math.round(results[0].confidence*100)+" % ";

  utter=new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utter)
}
}
