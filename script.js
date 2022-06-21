
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


//Global Variables
let rootContainer = document.getElementsByClassName('mainContainer')[0];
let leftContainer = document.getElementsByClassName('leftColumnContainer')[0];
let rightContainer = document.getElementsByClassName('rightColumnContainer')[0];

let titleName = "Vertical Circular Motion";
let questionHTMLArray = ["<span class='semiBold'>Which force(s) here is acting as the centripetal force ?</span>&nbsp;&nbsp;[The force that causes a body to move in a circular path]",
    "<span class='semiBold'>At which point on the circle, the Tension Force is opposite to the Gravitaional Force?",
    "<span class='semiBold'>The speed of the ball is ______?</span>"];
let optionArray = [["Tension", "Gravity", "Tension and Gravity"]
    , ["Top", "Bottom", "Nowhere"]
    , ["Constant", "Changing"]];
let correctOptionIndex = [2, 1, 1];


//Controlls - Global Variables
let checkboxArray = ["Show  Gravity", "Show  Tension", "Show  Velocity"];
let sliderArray = ["Set Total Energy🚀", "Set Mass"];
let sliderParameters = [[7, 9, 0.01, 7], [3, 6, 0.1, 6]];  //[min, max, step, value];
let isPlaying = false;
let animSpeed = 1;
let answerShown = false;


class QuestionColumn {
    constructor(questionNumber) {
        //Title
        let rootElement = this;
        this.titleDiv = document.createElement('DIV');
        leftContainer.appendChild(this.titleDiv);
        this.titleDiv.classList.add('titleSim');
        this.titleDiv.innerText = titleName;

        //Question
        this.QuestionDiv = document.createElement('DIV');
        leftContainer.appendChild(this.QuestionDiv);
        this.QuestionDiv.classList.add('questionText');
        this.QuestionDiv.innerHTML = questionHTMLArray[questionNumber];

        //Options + Label
        let n = optionArray[questionNumber].length;
        this.optionContainer = [];
        this.optionDivArray = [];
        this.optionLabelArray = [];

        for (let i = 0; i < n; i++) {
            //Option Container Div(for each option)
            this.optionContainer[i] = document.createElement('DIV');
            leftContainer.appendChild(this.optionContainer[i]);
            this.optionContainer[i].classList.add('optionsContainerClass');

            //Option
            this.optionDivArray[i] = document.createElement('input');
            this.optionContainer[i].appendChild(this.optionDivArray[i]);
            this.optionDivArray[i].setAttribute('type', 'radio');
            this.optionDivArray[i].setAttribute('value', optionArray[questionNumber][i]);
            this.optionDivArray[i].setAttribute('name', "options");
            this.optionDivArray[i].setAttribute('id', questionNumber + i.toString());
            this.optionDivArray[i].classList.add('radioButton');

            //Label
            this.optionLabelArray[i] = document.createElement('label');
            this.optionContainer[i].appendChild(this.optionLabelArray[i]);
            this.optionLabelArray[i].setAttribute('for', questionNumber + i.toString());
            this.optionLabelArray[i].innerText = optionArray[questionNumber][i];
            this.optionLabelArray[i].classList.add('radioLabel');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);

        }

        // Correct✔ , Wrong Answer ✖
        this.answerPopup = document.createElement('DIV');
        leftContainer.appendChild(this.answerPopup);
        this.answerPopup.classList.add('answerPopupClass');
        this.answerPopup.innerText = "Good Job!! 🥳";
        // this.answerPopup.innerText = "🔍 Incorrect";
        this.answerPopup.style.opacity = "0";

        //break
        this.break2 = document.createElement('br');
        leftContainer.appendChild(this.break2);

        // Submit Button Container
        this.submitButtonContainer = document.createElement('DIV');
        leftContainer.appendChild(this.submitButtonContainer);
        this.submitButtonContainer.style.display = "flex";
        this.submitButtonContainer.style.flexDirection = "row";
        this.submitButtonContainer.style.justifyContent = "space-evenly";

        //submit button
        this.submitButton = document.createElement('DIV');
        this.submitButtonContainer.appendChild(this.submitButton);
        this.submitButton.classList.add('submitButtonClass');
        this.submitButton.innerText = "Submit";

        this.hintButton = document.createElement('DIV');
        this.submitButtonContainer.appendChild(this.hintButton);
        this.hintButton.classList.add('hintButtonClass');
        this.hintButton.innerText = "Hint ?";
        let answerShown = false;

        this.submitButton.onclick = function () {
            if (rootElement.submitButton.innerText == "Okay") {
                console.log("Okay");

                leftContainer.replaceChildren();
                new ControlsColumn();
                nextid.style.display = 'block';
                if (quesNo == (questionHTMLArray.length - 1)) {
                    nextid.style.display = 'none';
                    //Finish Simulation Here
                }

                //delete left container contents
                // leftContainer.replaceChildren();
                // if (popuptextid1.style.display != "none") {
                //     fadeOutElement("popuptextid1");
                // }
                // if (popuptextid2.style.display != "none") {
                //     fadeOutElement("popuptextid2");
                // }
                // if (popuptextid3.style.display != "none") {
                //     fadeOutElement("popuptextid3");
                // }
                // if (popuptextid4.style.display != "none") {
                //     fadeOutElement("popuptextid4");
                // }
                // if (popuptextid5.style.display != "none") {
                //     fadeOutElement("popuptextid5");
                // }
                // if (quesNo < questionHTMLArray.length - 1) { quesNo++; }
                // new QuestionColumn(quesNo);
                // // new ControlsColumn();
                // // new LoadGameAssets();
                // // new GameScene();
                // this.style.display = 'none';
            }

            let optionClicked = -1;
            let isAnswerCorrect = false;
            for (let i = 0; i < n; i++) {
                if (rootElement.optionDivArray[i].checked && correctOptionIndex[questionNumber] == i) {
                    isAnswerCorrect = true;
                    //Show correct answer dialogs etc
                    rootElement.answerPopup.innerText = "Good Job!! 🥳";
                    rootElement.answerPopup.style.opacity = "1";

                    //disable the options
                    rootElement.submitButton.classList.add('unclickable');
                    for (let i = 0; i < n; i++) {
                        rootElement.optionContainer[i].classList.remove('optionsContainerClass');
                        rootElement.optionContainer[i].classList.add('optionsContainerClassNoHover');
                        rootElement.optionDivArray[i].classList.add('unclickable');
                        rootElement.optionLabelArray[i].classList.add('unclickable');
                    }

                }
                if (rootElement.optionDivArray[i].checked) {
                    optionClicked = i;
                }
            }

            if (!isAnswerCorrect & optionClicked > -1) {
                rootElement.answerPopup.innerText = "🔍 Incorrect";
                rootElement.answerPopup.style.opacity = "1";

                //disable the options
                rootElement.optionDivArray[optionClicked].classList.add('fadeDisabled');
                rootElement.optionLabelArray[optionClicked].classList.add('fadeDisabled');
                rootElement.submitButton.classList.add('unclickable');
                for (let i = 0; i < n; i++) {
                    rootElement.optionContainer[i].classList.remove('optionsContainerClass');
                    rootElement.optionContainer[i].classList.add('optionsContainerClassNoHover');
                    rootElement.optionDivArray[i].classList.add('unclickable');
                    rootElement.optionLabelArray[i].classList.add('unclickable');
                }

            }
            if (optionClicked > -1) {
                //Option Selected and Submitted
                rootElement.optionContainer[correctOptionIndex[questionNumber]].style.background = "#11111122";
                //Change labels of Submit and Hint button
                rootElement.submitButton.innerText = "Okay";
                rootElement.submitButton.classList.remove('unclickable');
                rootElement.hintButton.innerText = "Explanation";

                //show Correct Option TICK
                if (answerShown == false) {
                    rootElement.tickMark = document.createElement('IMG');
                    rootElement.optionContainer[correctOptionIndex[questionNumber]].appendChild(rootElement.tickMark);
                    rootElement.tickMark.src = `./assets/Checkbox.png`;
                    rootElement.tickMark.classList.add('tickmark');
                    answerShown = true;
                }

            }

        }
        this.hintButton.onclick = function () {
            //show explanation
            if (quesNo == 0) {
                fadeInElement("popuptextid3");
            }
            if (quesNo == 1) {
                fadeInElement("popuptextid4");

            }
            if (quesNo == 2) {
                fadeInElement("popuptextid5");
            }

        }
    }
}

class ControlsColumn {
    constructor() {
        //Title
        let rootElement = this;
        this.titleDiv = document.createElement('DIV');
        leftContainer.appendChild(this.titleDiv);
        this.titleDiv.classList.add('titleSim');
        this.titleDiv.innerText = titleName;

        //break
        this.break1 = document.createElement('br');
        leftContainer.appendChild(this.break1);

        //Checkbox + Label
        let chkBoxCount = checkboxArray.length;
        this.controlContainer = [];
        this.checkboxes = [];
        this.checkboxLabel = [];

        for (let i = 0; i < chkBoxCount; i++) {
            //Checkbox Container Div(for each Checkbox)
            this.controlContainer[i] = document.createElement('DIV');
            leftContainer.appendChild(this.controlContainer[i]);
            this.controlContainer[i].classList.add('controllsContainerClass');

            //Checkbox
            this.checkboxes[i] = document.createElement('input');
            this.controlContainer[i].appendChild(this.checkboxes[i]);
            this.checkboxes[i].setAttribute('type', 'checkbox');
            this.checkboxes[i].setAttribute('value', checkboxArray[i]);
            this.checkboxes[i].setAttribute('name', "chkbox");
            this.checkboxes[i].setAttribute('id', "chkbox" + i.toString());
            this.checkboxes[i].classList.add('checkboxClass');

            //Label
            this.checkboxLabel[i] = document.createElement('label');
            this.controlContainer[i].appendChild(this.checkboxLabel[i]);
            this.checkboxLabel[i].setAttribute('for', "chkbox" + i.toString());
            this.checkboxLabel[i].innerText = checkboxArray[i];
            this.checkboxLabel[i].classList.add('checkboxLabel');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);

        }
        //Slider + Label
        let sliderCount = sliderArray.length;
        // this.controlContainer = [];
        this.sliders = [];
        this.sliderLabel = [];

        for (let i = chkBoxCount; i < sliderCount + chkBoxCount; i++) {
            //Control Container Div(for each option)
            this.controlContainer[i] = document.createElement('DIV');
            leftContainer.appendChild(this.controlContainer[i]);
            this.controlContainer[i].classList.add('controllsContainerClassSlider');

            //Slider
            this.sliders[i] = document.createElement('input');
            this.controlContainer[i].appendChild(this.sliders[i]);
            this.sliders[i].setAttribute('type', 'range');
            this.sliders[i].setAttribute('min', sliderParameters[i - chkBoxCount][0].toString());
            this.sliders[i].setAttribute('max', sliderParameters[i - chkBoxCount][1].toString());
            this.sliders[i].setAttribute('step', sliderParameters[i - chkBoxCount][2].toString());
            this.sliders[i].setAttribute('value', sliderParameters[i - chkBoxCount][3].toString());
            this.sliders[i].setAttribute('name', "slider");
            this.sliders[i].setAttribute('id', "sliderNo" + (i - chkBoxCount).toString());
            this.sliders[i].classList.add('slider');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);

            //Label
            this.sliderLabel[i] = document.createElement('DIV');
            this.controlContainer[i].appendChild(this.sliderLabel[i]);
            // this.sliderLabel[i].setAttribute('for', "slider" + i.toString());
            this.sliderLabel[i].innerText = sliderArray[i - chkBoxCount];
            this.sliderLabel[i].classList.add('sliderLabel');

            //break
            this.break1 = document.createElement('br');
            leftContainer.appendChild(this.break1);
        }
        //NEXT button
        // let NextBtnDiv;
        // this.NextBtnDiv = document.createElement("DIV");
        // rightContainer.appendChild(this.NextBtnDiv);
        // this.NextBtnDiv.innerText = ">";
        // this.NextBtnDiv.classList.add('nextBtnSymbol');
    }
}

class LoadGameAssets {
    constructor() {
        // ball
        this.ball = document.createElement("img");
        rightContainer.appendChild(this.ball);
        this.ball.setAttribute('src', `./assets/ball.png`);
        this.ball.setAttribute('id', "ballred");
        this.ball.setAttribute('width', `40`);
        this.ball.setAttribute('height', `40`);
        this.ball.style.opacity = '0.5';

        // T vector label
        // v vector Label
        // g vector label

    }
}

class GameScene {
    constructor() {
        //create Canvas - FILLS RIGHT CONTAINER
        // let canvas, ball;
        let rootElement = this;
        this.canvas = document.createElement('canvas');
        rightContainer.appendChild(this.canvas);
        this.canvas.classList.add('CanvasId');
        this.canvas.setAttribute('width', rightContainer.clientWidth.toString());
        this.canvas.setAttribute('height', rightContainer.clientHeight.toString());
        const ctx = this.canvas.getContext("2d");
        const circle = {
            centreX: rightContainer.clientWidth / 2,
            centreY: rightContainer.clientHeight / 2,
            radius: rightContainer.clientWidth / 5
        };

        const ballPixel = {
            widthAdjust: -56 / 2,
            heightAdjust: -56 / 2
        };

        const circleDashed = (ctx, thickness) => {
            ctx.beginPath();
            ctx.setLineDash([25 * thickness, 25 * thickness]);
            ctx.lineWidth = 2 * thickness;
            ctx.strokeStyle = "#999999";
            ctx.beginPath();
            ctx.arc(circle.centreX, circle.centreY, circle.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
        }

        const pointOnCircle = (theta, r) => {
            let x = circle.centreX + Math.cos(theta) * r;
            let y = circle.centreY + Math.sin(theta) * r;
            return [x, y];
        }

        //create ball, arrows
        const drawBall = (ctx, xyArray, scalefactor) => {
            // xyArray = [x,y]

            let img = document.getElementById("ball");
            ctx.drawImage(img, xyArray[0] + ballPixel.widthAdjust * scalefactor, xyArray[1] + ballPixel.heightAdjust * scalefactor, ballPixel.widthAdjust * -2 * scalefactor, ballPixel.widthAdjust * -2 * scalefactor);
        }



        //Increment the speed of ball based on total energy
        //if slider is not visible in the screen then use the last known value of the slider
        const incrementedT = (time_and_Theta, energySliderValue, massSliderValue) => {
            if (isPlaying) {
                return (time_and_Theta + animSpeed * (- 0.005 * massSliderValue + 1 * (0.02 * energySliderValue + 0.01 * massSliderValue * Math.cos(- Math.PI / 2 + time_and_Theta))));
            }
            else {
                return t;
            }

        }
        const VeloctiyTangentialCalculator = (time_and_Theta, energySliderValue, massSliderValue) => {
            return (time_and_Theta - 0.005 * massSliderValue + 1 * (0.02 * energySliderValue + 0.01 * massSliderValue * Math.cos(- Math.PI / 2 + time_and_Theta)));
        }


        function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color, headsize) {
            //variables to be used when creating the arrow
            var headlen = headsize;
            var angle = Math.atan2(toy - fromy, tox - fromx);

            ctx.save();
            ctx.setLineDash([]);
            ctx.strokeStyle = color;

            //starting path of the arrow from the start square to the end square
            //and drawing the stroke

            ctx.beginPath();
            ctx.moveTo(fromx, fromy);
            ctx.lineTo(tox, toy);
            ctx.lineWidth = arrowWidth;
            ctx.stroke();

            //starting a new path from the head of the arrow to one of the sides of
            //the point
            ctx.beginPath();
            ctx.moveTo(tox, toy);
            ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
                toy - headlen * Math.sin(angle - Math.PI / 7));

            //path from the side point of the arrow, to the other side point
            ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7),
                toy - headlen * Math.sin(angle + Math.PI / 7));

            //path from the side point back to the tip of the arrow, and then
            //again to the opposite side point
            ctx.lineTo(tox, toy);
            ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7),
                toy - headlen * Math.sin(angle - Math.PI / 7));

            //draws the paths created above
            ctx.stroke();
            ctx.restore();
        }

        function drawSmoothingDot(ctx, centerX, centerY, radius, color) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.setLineDash([]);
            ctx.strokeStyle = color;
            ctx.fill();
            ctx.lineWidth = 0;
            ctx.strokeStyle = color;
            ctx.stroke();
        }




        let secondsPassed;
        let oldTimeStamp;
        let fps;
        let t = 0;
        let sliderValueHolder, sliderValueHolder2;
        let checkBoxValue0, checkBoxValue1, checkBoxValue2;

        // The proper game loop
        window.requestAnimationFrame(gameLoop);
        function gameLoop(timeStamp) {
            //nice coding Bruh
            try {
                sliderValueHolder = document.getElementById("sliderNo0").value;
                sliderValueHolder2 = document.getElementById("sliderNo1").value;
                //if the slider isnt present in the left side of the scrren then take the default values provided at the top of the screen.
                checkBoxValue0 = chkbox0.checked;
                checkBoxValue1 = chkbox1.checked;
                checkBoxValue2 = chkbox2.checked;
            }
            catch (err) {
                sliderValueHolder = sliderParameters[0][3];
                sliderValueHolder2 = sliderParameters[1][3];
                checkBoxValue0 = true;
                checkBoxValue1 = true;
                checkBoxValue2 = true;
            }


            //clear screen
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, rightContainer.clientWidth, rightContainer.clientHeight);

            // Calculate the number of seconds passed since the last frame
            secondsPassed = (timeStamp - oldTimeStamp) / 1000;
            oldTimeStamp = timeStamp;
            // Calculate fps
            // fps = Math.round(1 / secondsPassed);
            // // Draw number to the screen
            // ctx.font = '25px Arial';
            // ctx.fillStyle = 'black';
            // ctx.fillText("FPS: " + fps, 10, 30);

            let scalefactor = rightContainer.clientHeight / 1160;

            //draw dashesd circle
            circleDashed(ctx, scalefactor);
            //draw ball
            drawBall(ctx, pointOnCircle(t, circle.radius), scalefactor);
            if (t > 2 * Math.PI) {
                t -= 2 * Math.PI;
            }

            //-------------------vector Drawing------------------------
            // Gravity Arrow
            if (checkBoxValue0) {
                let scaleUnit = circle.radius * (sliderValueHolder2 / 15);
                let magnitudeG = 1 * scaleUnit; //0.5 for half the radius
                drawArrow(ctx, pointOnCircle(t, circle.radius)[0], pointOnCircle(t, circle.radius)[1], pointOnCircle(t, circle.radius)[0], pointOnCircle(t, circle.radius)[1] + magnitudeG, 8 * scalefactor, "#999999", 20 * scalefactor);
            }

            // Tension Arrow
            if (checkBoxValue1) {
                let magnitudeT = 0.3 + 0.04 * sliderValueHolder2 * Math.cos(- Math.PI / 2 + t) + 0.02 * sliderValueHolder; //0.5 for half the radius
                drawArrow(ctx, pointOnCircle(t, circle.radius)[0], pointOnCircle(t, circle.radius)[1], pointOnCircle(t, circle.radius)[0] - circle.radius * Math.cos(t) * magnitudeT, pointOnCircle(t, circle.radius)[1] - circle.radius * Math.sin(t) * magnitudeT, 8 * scalefactor, "#7777ff", 20 * scalefactor);
            }

            //-------------Vector Arrow----------------
            if (checkBoxValue2) {
                let magnitudeV = scalefactor * 1000 * (VeloctiyTangentialCalculator(t, sliderValueHolder, sliderValueHolder2) - t);
                let x = pointOnCircle(t, circle.radius)[0];
                let y = pointOnCircle(t, circle.radius)[1]
                drawArrow(ctx, x, y, x - magnitudeV * Math.cos(Math.PI / 4 - t + Math.PI / 4), y + magnitudeV * Math.sin(Math.PI / 4 - t + Math.PI / 4), 8 * scalefactor, "#ff6666", 20 * scalefactor);
                //smooting dot in the JUnction of all arrows
                drawSmoothingDot(ctx, pointOnCircle(t, circle.radius)[0], pointOnCircle(t, circle.radius)[1], 1, '#ff6666');
            }

            // console.log("masss", sliderValueHolder2);
            // console.log("Tot Energy", sliderValueHolder);


            t = incrementedT(t, sliderValueHolder, sliderValueHolder2);
            window.requestAnimationFrame(gameLoop);
        }
    }
}

let quesNo = -1;
window.onload = function () {
    // new QuestionColumn(quesNo);
    new ControlsColumn();
    // new LoadGameAssets();
    new GameScene();
}

pauseid.onclick = function () {
    this.style.display = "none";
    playid.style.display = "block";
    isPlaying = false;
}

playid.onclick = function () {
    this.style.display = "none";
    pauseid.style.display = "block";
    isPlaying = true;
}

playSpeedid1.onclick = function () {
    this.style.display = 'none';
    playSpeedid5.style.display = "block";
    animSpeed = 0.5;
}

playSpeedid5.onclick = function () {
    this.style.display = 'none';
    playSpeedid25.style.display = "block";
    animSpeed = 0.25;
}

playSpeedid25.onclick = function () {
    this.style.display = 'none';
    playSpeedid1.style.display = "block";
    animSpeed = 1;
}

cross1.onclick = async function () {
    // popuptextid1.style.display = 'none';
    fadeOutElement("popuptextid1");
    await sleep(1000);
}
cross2.onclick = async function () {
    // popuptextid2.style.display = 'none';
    fadeOutElement("popuptextid2");
    await sleep(1000);
}
cross3.onclick = async function () {
    // popuptextid3.style.display = 'none';
    fadeOutElement("popuptextid3");
    await sleep(1000);
}
cross4.onclick = async function () {
    // popuptextid4.style.display = 'none';
    fadeOutElement("popuptextid4");
    await sleep(1000);
}
cross5.onclick = async function () {
    // popuptextid5.style.display = 'none';
    fadeOutElement("popuptextid5");
    await sleep(1000);
}


// document.getElementsByClassName('submitButtonClass'[0]).onclick = function () {
//     console.log(quesNo, 'Okay');
// }
// document.getElementsByClassName('submitButtonClass'[0]).onclick = function () {
//     console.log(quesNo, "Hint");
// }


let tutorialStage = 1;
let istutorialStage1Shown = false;
let istutorialStage2Shown = false;
let istutorialStage3Shown = false;

nextid.onclick = function () {
    console.log(quesNo);
    //delete left container contents
    leftContainer.replaceChildren();
    if (popuptextid1.style.display != "none") {
        fadeOutElement("popuptextid1");
    }
    if (popuptextid2.style.display != "none") {
        fadeOutElement("popuptextid2");
    }
    if (popuptextid3.style.display != "none") {
        fadeOutElement("popuptextid3");
    }
    if (popuptextid4.style.display != "none") {
        fadeOutElement("popuptextid4");
    }
    if (popuptextid5.style.display != "none") {
        fadeOutElement("popuptextid5");
    }
    if (quesNo < questionHTMLArray.length - 1) {
        quesNo++;
        new QuestionColumn(quesNo);
    }
    // new ControlsColumn();
    // new LoadGameAssets();
    // new GameScene();
    this.style.display = 'none';
}



async function tutorial() {
    while (tutorialStage == 1) {
        if (!istutorialStage1Shown) {
            // ----Stage 1------
            // popup 1
            fadeInElement("tutorialSvgID1");
            await sleep(5000);
            fadeOutElement("tutorialSvgID1");
            await sleep(1000);
            // popup 2
            fadeInElement("tutorialSvgID2");
            await sleep(4000);
            fadeOutElement("tutorialSvgID2");
            await sleep(1000);
            // popup 3
            fadeInElement("tutorialSvgID3");
            await sleep(7000);
            fadeOutElement("tutorialSvgID3");
            await sleep(1000);
            // popup 3
            fadeInElement("tutorialSvgID4");
            await sleep(5000);
            fadeOutElement("tutorialSvgID4");
            await sleep(1000);
            // popup 3
            fadeInElement("tutorialSvgID5");
            await sleep(5000);
            fadeOutElement("tutorialSvgID5");
            await sleep(1000);
            // popup 3
            fadeInElement("tutorialSvgID6");
            await sleep(5000);
            fadeOutElement("tutorialSvgID6");
            await sleep(1000);
            // popup 3
            fadeInElement("tutorialSvgID7");
            await sleep(5000);
            fadeOutElement("tutorialSvgID7");
            await sleep(1000);
            // popup 3
            fadeInElement("tutorialSvgID8");
            await sleep(5000);
            fadeOutElement("tutorialSvgID8");
            await sleep(1000);
            // popup 3
            fadeInElement("popuptextid1");
            istutorialStage1Shown = true;

            // NEXT
            await sleep(10000);
            nextid.style.display = 'block';
            istutorialStage1Shown = true;
        }
        await sleep(1000);
    }
    // while (tutorialStage == 2) {
    //     if (!istutorialStage2Shown) {
    //         // ----Stage 2------
    //         // popup 1
    //         fadeInElement("popup1");
    //         await sleep(5000);
    //         fadeOutElement("popup1");
    //         await sleep(1000);
    //         // popup 2
    //         fadeInElement("popup2");
    //         await sleep(5000);
    //         fadeOutElement("popup2");
    //         await sleep(1000);
    //         // popup 3
    //         fadeInElement("popup3");
    //         await sleep(5000);
    //         fadeOutElement("popup3");
    //         await sleep(1000);
    //         istutorialStage2Shown = true;
    //     }
    //     await sleep(1000);
    //     //keep checking if tutorial stage changed
    // }
    // while (tutorialStage == 3) {
    //     if (!istutorialStage3Shown) {
    //         // ----Stage 3------
    //         // popup 1
    //         fadeInElement("popup1");
    //         await sleep(5000);
    //         fadeOutElement("popup1");
    //         await sleep(1000);
    //         // popup 2
    //         fadeInElement("popup2");
    //         await sleep(5000);
    //         fadeOutElement("popup2");
    //         await sleep(1000);
    //         // popup 3
    //         fadeInElement("popup3");
    //         await sleep(5000);
    //         fadeOutElement("popup3");
    //         await sleep(1000);
    //         istutorialStage3Shown = true;
    //     }
    //     await sleep(1000);
    //     //keep checking if tutorial stage changed
    // }
}

tutorial();


// async function tutorial() {
//     while (tutorialStage == 1) {
//         if (!istutorialStage1Shown) {
//             // ----Stage 1------
//             // popup 1
// fadeInElement("tutorialSvgID1");
// await sleep(5000);
// fadeOutElement("tutorialSvgID1");
// await sleep(1000);
// // popup 2
// fadeInElement("tutorialSvgID2");
// await sleep(4000);
// fadeOutElement("tutorialSvgID2");
// await sleep(1000);
// // popup 3
// fadeInElement("tutorialSvgID3");
// await sleep(7000);
// fadeOutElement("tutorialSvgID3");
// await sleep(1000);
// // popup 3
// fadeInElement("tutorialSvgID4");
// await sleep(5000);
// fadeOutElement("tutorialSvgID4");
// await sleep(1000);
// // popup 3
// fadeInElement("tutorialSvgID5");
// await sleep(5000);
// fadeOutElement("tutorialSvgID5");
// await sleep(1000);
// // popup 3
// fadeInElement("tutorialSvgID6");
// await sleep(5000);
// fadeOutElement("tutorialSvgID6");
// await sleep(1000);
// // popup 3
// fadeInElement("tutorialSvgID7");
// await sleep(5000);
// fadeOutElement("tutorialSvgID7");
// await sleep(1000);
// // popup 3
// fadeInElement("tutorialSvgID8");
// await sleep(5000);
// fadeOutElement("tutorialSvgID8");
// await sleep(1000);
// // popup 3
// fadeInElement("popuptextid1");
// istutorialStage1Shown = true;
//         }
//         await sleep(1000);
//     }
//     // while (tutorialStage == 2) {
//     //     if (!istutorialStage2Shown) {
//     //         // ----Stage 2------
//     //         // popup 1
//     //         fadeInElement("popup1");
//     //         await sleep(5000);
//     //         fadeOutElement("popup1");
//     //         await sleep(1000);
//     //         // popup 2
//     //         fadeInElement("popup2");
//     //         await sleep(5000);
//     //         fadeOutElement("popup2");
//     //         await sleep(1000);
//     //         // popup 3
//     //         fadeInElement("popup3");
//     //         await sleep(5000);
//     //         fadeOutElement("popup3");
//     //         await sleep(1000);
//     //         istutorialStage2Shown = true;
//     //     }
//     //     await sleep(1000);
//     //     //keep checking if tutorial stage changed
//     // }
//     // while (tutorialStage == 3) {
//     //     if (!istutorialStage3Shown) {
//     //         // ----Stage 3------
//     //         // popup 1
//     //         fadeInElement("popup1");
//     //         await sleep(5000);
//     //         fadeOutElement("popup1");
//     //         await sleep(1000);
//     //         // popup 2
//     //         fadeInElement("popup2");
//     //         await sleep(5000);
//     //         fadeOutElement("popup2");
//     //         await sleep(1000);
//     //         // popup 3
//     //         fadeInElement("popup3");
//     //         await sleep(5000);
//     //         fadeOutElement("popup3");
//     //         await sleep(1000);
//     //         istutorialStage3Shown = true;
//     //     }
//     //     await sleep(1000);
//     //     //keep checking if tutorial stage changed
//     // }
// }

// tutorial();

// //NextButton
// document.getElementById("NextBtn").onclick = async function () {
//     fadeOutElement("NextBtn");
//     await sleep(1000);

// }

// //Finish Button
// document.getElementById("FinishBtn").onclick = async function () {
//     fadeOutElement("FinishBtn");
//     await sleep(1000);

// }

// //Modal close Button
// document.getElementById("crossBtn").onclick = async function () {
//     fadeOutElement("modal1");
//     document.getElementById("blurid").style.display = "none";
//     await sleep(1000);

// }
// //Modal open Button
// document.getElementById("iButton").onclick = async function () {
//     fadeInElement("modal1");
//     document.getElementById("blurid").style.display = "block";
//     await sleep(1000);

// }


// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

//fade in element
async function fadeInElement(htmlElementid) {
    let htmlElement = document.getElementById(htmlElementid);
    console.log("Fading in-", htmlElementid);
    htmlElement.style.display = "block";
    htmlElement.classList.add("fadein");
    await sleep(1000);
    htmlElement.style.opacity = "1";
    htmlElement.classList.remove("fadein");
}
// fade out element
async function fadeOutElement(htmlElementid) {
    let htmlElement = document.getElementById(htmlElementid);
    console.log("Fade  out-", htmlElementid);
    htmlElement.classList.add("fadeout");
    await sleep(1000);
    htmlElement.style.display = "none";
    htmlElement.style.opacity = "0";
    htmlElement.classList.remove("fadeout");
}
