
  Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

  camera = document.getElementById("camera");

Webcam.attach( '#camera' );

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/xQRttb4CE/model.json',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
      
  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
    document.getElementById("result_object_name").innerHTML = results[0].label;

    gesture = results[0].label;
    
    toSpeak = "";
    
    if(gesture == "amazing")
    {
      toSpeak = "The detected gesture is amazing. I say, When you have confidence, you can have a lot of fun. And when you have fun, you can do amazing things.";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128076;";
    }
    else if(gesture == "best")
    {
      toSpeak = "The detected gesture is All the best. I am  Wishing you the best for every step in your journey. Go and conquer your dreams";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;";
    }
    else if(gesture == "victory")
    {
      toSpeak = "The detected gesture is victory. “I accept  that If you believe in yourself and have dedication and pride – and never quit, you'll be a winner. The price of victory is high but so are the rewards.”";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#9996;";
    }

    speak();
  }
}


function speak(){
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}