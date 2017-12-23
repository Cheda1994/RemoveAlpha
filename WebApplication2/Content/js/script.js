var currentAction = "select";
var selectedColor;
var currentMouseListener;
var currentLayerListener;
var fileName;
var alreadyLoad;
var mouseDown;

$(document).ready(function () {
    alreadyLoad = false;
    imageCanvas = document.getElementById('image');
    imageContext = imageCanvas.getContext('2d')
    layerCanvas = document.getElementById('layer');
    layerContext = layerCanvas.getContext('2d');
    mouseCanvas = document.getElementById('mouse');
    mouseContext = mouseCanvas.getContext('2d');

    $("#file")[0].onchange = function (file) {
        var tgt = file.target || window.event.srcElement,
            files = tgt.files;
        convertToCanvas(files[0])
    }

    function convertToCanvas(image) {
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = function () {
            var img = new Image();

            img.onload = function () {
                var resizedImage = resizeImage(img);
                $("#imgTest")[0].width = resizedImage.width;
                $("#imgTest")[0].height = resizedImage.height;
                $("#imgTest")[0].src = resizedImage.src;
                //$("#imgTest")[0] = resizeImage($("#imgTest")[0]);


                layerCanvas.height = $("#imgTest")[0].height
                layerCanvas.width = $("#imgTest")[0].width

                mouseCanvas.height = $("#imgTest")[0].height;
                mouseCanvas.width = $("#imgTest")[0].width;

                imageCanvas.height = $("#imgTest")[0].height;
                imageCanvas.width = $("#imgTest")[0].width
                imageContext.drawImage($("#imgTest")[0], 0, 0, $("#imgTest")[0].width, $("#imgTest")[0].height);

            }
            img.src = reader.result;
        }
    }


    function resizeImage(img) {
        var maxWidth = 1230;
        var maxHeight = 800;
        var widthRef;
        var heigthRef;
        
        if (img.width > maxWidth || img.height > maxHeight) {
            widthRef = img.width / maxWidth;
            heigthRef = img.height / maxHeight;
            if (widthRef > heigthRef) {
                img.width = img.width / widthRef
                img.height = img.height / widthRef
            } else {
                img.width = img.width / heigthRef
                img.height = img.height / heigthRef
            }
        }
        return img;
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    mouseCanvas.addEventListener('mousedown', function (evt) {
        mouseDown = 1;
        console.log("Start");
        $("#controll-bar").animate({
            opacity: 0
        }, 300, "linear", function () {
            $("#controll-bar").css('z-index', 0);
            if (mouseDown == 0) {
                console.log("End");
                returnControllBarListener();
            }
            console.log("End");
        });

    }, false);

    mouseCanvas.addEventListener("mouseup", returnControllBarListener);
    mouseCanvas.addEventListener("mouseleave", returnControllBarListener);

    mouseCanvas.addEventListener('mousemove', function (evt) {
        mousePos = getMousePos(mouseCanvas, evt);
        //writeMessage(mouseCanvas, message);
    }, false);

})

//Actions
function clearArea() {
    console.log("Clear")
    removeAllListeners()
    mouseCanvas.addEventListener("mousemove", mouseBlueCircle, false)
    mouseCanvas.addEventListener("mousedown", clearListener, false)
    currentMouseListener = clearListener;
    console.log(currentMouseListener)
}

function select() {
    console.log("Select")
    removeAllListeners()
    mouseCanvas.addEventListener("mousemove" ,  mouseRedCircle)
    mouseCanvas.addEventListener("mousedown", drawLisener, false)
    currentMouseListener = drawLisener;
    console.log(currentMouseListener)
}



function chooseColor() {
    console.log("Choose")
    removeAllListeners()
    mouseCanvas.addEventListener("mousedown", selecHoverColorListener, false)
    mouseCanvas.addEventListener("mousemove", showHoverColorListener, false)
    console.log(currentMouseListener)
}

function removeAllListeners() {
    mouseCanvas.removeEventListener("mousemove", mouseBlueCircle, false)
    mouseCanvas.removeEventListener("mousedown", selecHoverColorListener, false)
    mouseCanvas.removeEventListener("mousemove", showHoverColorListener, false)
    mouseCanvas.removeEventListener("mousemove", mouseRedCircle)
    mouseCanvas.removeEventListener("mousedown", drawLisener, false)
    mouseCanvas.removeEventListener("mousedown", clearListener, false)
}

function chooseMode(mode) {
    switch(mode){
        case "smart":
            $("#btnChooseColor").show(200)
            break;
        case "bySelectedArea":
            $("#btnChooseColor").hide(200);
            break;
    }
}

function showSnackbar(text) {
    var x = document.getElementById("snackbar")
    x.className = "show";
    x.textContent = text
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}

