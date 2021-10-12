prediction = "";

Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90,
});

camera = document.getElementById("webcam");

Webcam.attach("#webcam");

function takeSnapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='caputuredImg' src='"+data_uri+"'>";
    });
}

console.log("ml5 version:", ml5.version);

classifer = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/0KhNGJBUU/model.json", modelReady);

function modelReady()
{
    console.log("Model Ready!");
}

function speaking()
{
    synth = window.speechSynthesis;
    speaker = "Your hand gesture is " + prediction;
    utterThis = new SpeechSynthesisUtterance(speaker);
    synth.speak(utterThis);
}

function findEmoji()
{
    img = document.getElementById("caputuredImg");
    classifer.classify(img, gotResult);
}

function gotResult(error, result)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("handGesture").innerHTML = result[0].label;
        prediction = result[0].label;
        speaking();
    }
}

