function ExecuteScript(strId)
{
  switch (strId)
  {
      case "5qHix8oHll8":
        Script1();
        break;
      case "6P9t1Yfmqak":
        Script2();
        break;
      case "5bJAhDJpZ8W":
        Script3();
        break;
  }
}

function Script1()
{
  var player = GetPlayer();
var scrollbarBtn = document.querySelector('.scrollarea-btn');
var slideContainer = document.querySelector('.slide-container');

var btnPos = 0;
var slideContainerPos = 0;
var posCalc = 0;

var checkScrollbarPosition = function() {
 //DETERMINE THE AMOUNT OF WHITESPACE ABOVE THE SLIDE (OFFSET)
 var offset = slideContainer.getBoundingClientRect().top;
 
 //GET POSITION OF SCROLLBAR AND SLIDE CONTAINER
 btnPos = scrollbarBtn.getBoundingClientRect().bottom - offset;
 slideContainerPos = slideContainer.getBoundingClientRect().bottom - offset;
 
 //CALCULATE DISTANCE BETWEEN BOTTOM OF SCROLLBAR AND SLIDE CONTAINER AS PERCENTAGE
 posCalc = (btnPos / slideContainerPos) * 100;
 
 //FOR DEBUGGING ONLY IN CONSOLE
 //console.log('btn btm pos: ' + pos);
 //console.log('slide btm pos: ' + slideContainerPos);
 //console.log('pos calc: ' + posCalc);
 
 //IF POSITION OF SCROLLBAR BUTTON IS MORE THAN 80% FROM TOP OF SLIDECONTAINER SET SL VARIABLE TO TRUE
 //Adapt 80% as necessary to accomodate where you want the detection to be
 if (posCalc > 70) {
 player.SetVar('Scroll1HitBottom', true);
 document.removeEventListener('mousemove', checkScrollbarPosition);
 }
}

document.addEventListener('mousemove', checkScrollbarPosition);
}

function Script2()
{
  GetPlayer().SetVar("resume_data_length", lmsAPI.GetDataChunk().length);
}

function Script3()
{
  GetPlayer().SetVar("resume_data_length", lmsAPI.GetDataChunk().length);
}

