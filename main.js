status = "";
object = [];

function setup() {
    canvas = createCanvas(360, 360);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelloaded() {
    console.log("Model Loaded");
    status = true;
}

function getResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        object = result;
    }
}

function draw() {
    image(video, 0, 0, 360, 360);
    r = random(255);
    g = random(255);
    b = random(255);
    if (status != "") {
        objectDetector.detect(video, getResult);
        for (i = 0; i < object.length; i++) {
            strokeWeight(1);
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 22);
            textSize(25);
            noFill();
            stroke(r, g, b);
            strokeWeight(3);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            document.getElementById("numobjects").innerHTML = object.length;
            document.getElementById("status").innerHTML = "Object Detected";
        }
    }
}