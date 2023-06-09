

var uiFormSlide = {
init: function() {
this.steps = $(".ui-formSlide > [data-step]");
this.currentStep = 0;
$(this.steps[0])
  .addClass("active")
  .find(".ui-step-content")
  .addClass("in");
},
goTo: function(index) {
this.play(index);
},
next: function() {
this.nextStep = this.getNext(this.currentStep);
this.animateHeight($(this.steps[this.nextStep]).outerHeight());
this.currentStep = this.getNext(this.currentStep);
this.play(this.currentStep, 'forward');
},
prev: function() {
this.prevStep = this.getPrev(this.currentStep);
this.animateHeight($(this.steps[this.prevStep]).outerHeight());
this.currentStep = this.getPrev(this.currentStep);
this.play(this.currentStep, 'backward');
},
getNext: function(currentStep) {
return currentStep + 1 >= this.steps.length ? 0 : currentStep + 1;
},
getPrev: function(currentStep) {
return currentStep - 1 < 0 ? this.steps.length - 1 : currentStep - 1;
},
play: function(currentStep, direction) {
var _self = this;
$('.ui-formSlide').removeClass('forward backward').addClass(direction);
$(this.steps[currentStep])
  .addClass("active")
  .siblings("[data-step]")
  .removeClass("active");
setTimeout(function() {
  $(_self.steps[currentStep])
    .find(".ui-step-content")
    .addClass("in")
    .end()
    .siblings("li")
    .find(".ui-step-content")
    .removeClass("in");
}, 300);
},
animateHeight: function(targetHeight) {
$(".ui-formSlide").animate(
  {
    height: targetHeight + "px"
  },
  300,
  function() {
    $(".ui-formSlide").css("height", "auto");
  }
);
}
};

$(document).ready(function() {
uiFormSlide.init();

$("#btnNext").click(function() {
uiFormSlide.next();
});
$("#btnPrev").click(function() {
uiFormSlide.prev();
});
});


function skip() {
  var x = document.getElementById("skip");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
