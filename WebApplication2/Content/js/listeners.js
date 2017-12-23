// Select listeners
function drawLisener() {
    layerContext.globalCompositeOperation = 'source-over'
    layerContext.beginPath();
    layerContext.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, true);
    layerContext.fillStyle = "#FF0000";
    layerContext.fill();
    layerContext.closePath();
    mouseCanvas.addEventListener("mousemove", drawOnMove);
    mouseCanvas.onmouseup = function () {
        mouseCanvas.removeEventListener("mousemove", drawOnMove)
    }
}

function drawOnMove() {
    layerContext.beginPath();
    layerContext.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, true);
    layerContext.fillStyle = "#FF0000";
    layerContext.fill();
    layerContext.closePath();
}

function mouseRedCircle() {
    mouseContext.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
    mouseContext.beginPath();;
    mouseContext.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, true);
    mouseContext.fillStyle = "#FF6A6A";
    mouseContext.fill();
}


//Cleat listeners 
function clearListener() {
    layerContext.globalCompositeOperation = 'destination-out'
    layerContext.beginPath();
    layerContext.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, true);
    layerContext.fillStyle = "#FF6A6A";
    layerContext.fill();
    layerContext.closePath();
    mouseCanvas.addEventListener("mousemove", drawOnMove);
    mouseCanvas.onmouseup = function () {
        mouseCanvas.removeEventListener("mousemove", drawOnMove)
    }
}

function mouseBlueCircle() {
    mouseContext.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
    mouseContext.beginPath();;
    mouseContext.arc(mousePos.x, mousePos.y, 20, 0, 2 * Math.PI, true);
    mouseContext.fillStyle = "#0000ff";
    mouseContext.fill();
}

//Choose color listener

function selecHoverColorListener() {
    var color = imageContext.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    selectedColor = { R: color[0], G: color[1], B: color[2] }
    $("#selected-color").backgroundColor = "rgb" + selectedColor.R + "," + selectedColor.G + "," + selectedColor.B
}

function showHoverColorListener() {
    mouseContext.clearRect(0, 0, mouseCanvas.width, mouseCanvas.height);
    mouseContext.beginPath();
    mouseContext.arc(mousePos.x - 50, mousePos.y - 50, 50, 0, 2 * Math.PI, true);
    var color = imageContext.getImageData(mousePos.x, mousePos.y, 1, 1);
    mouseContext.lineWidth = 17;
    mouseContext.strokeStyle = "black";
    mouseContext.stroke();
    mouseContext.fillStyle = "rgb(" + color.data[0] + "," + color.data[1] + "," + color.data[2] + ")";
    mouseContext.fill();
}

// 
function returnControllBarListener() {
    mouseDown = 0;
    $("#controll-bar").css('z-index', 100);
    $("#controll-bar").animate({
        opacity: 1
    }, 300);
}