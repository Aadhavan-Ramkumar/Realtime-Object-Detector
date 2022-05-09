var Img = ""
var Status = ""
var Objects = []

function preload() {
}

function setup() {
    Canvas = createCanvas(380, 380)
    Canvas.center()
    Video = createCapture(VIDEO)
    Video.hide()
    ObjectDetector = ml5.objectDetector("cocossd", ModelLoaded)
    document.getElementById("Status").innerHTML = "Status: Detecting Objects"
}

function draw() {
    image(Video, 0, 0, 380, 380)
    if (Status != "") {
        Red = random(255)
        Green = random(255)
        Blue = random(255)
        ObjectDetector.detect(Video, GetResults)
        for (let i = 0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status: Objects Detected"
            document.getElementById("Objects").innerHTML = "Number of Objects Detected: " + Objects.length
            fill(Red, Green, Blue)
            Percent = floor(Objects[i].confidence * 100)
            text(Objects[i].label.toUpperCase() + " " + Percent + "%", Objects[i].x + 15, Objects[i].y + 15)
            noFill()
            stroke(Red, Green, Blue)
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)
        }
    }
}

function ModelLoaded() {
    console.log("Model Loaded!")
    Status = true
}

function GetResults(Error, Results) {
    if (Error) {
        console.error(Error)
    }
    console.log(Results)
    Objects = Results
}