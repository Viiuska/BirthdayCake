document.addEventListener('DOMContentLoaded', function() {
let yesBtnCount=0;
let noBtnCount=0;
let yesBtn = document.getElementById('yesBtn');
let noBtn = document.getElementById('noBtn');
let gifContainer =document.getElementById("gifContainer")


yesBtn.addEventListener('click', function() {
  if (yesBtnCount === 0) {
    this.classList.toggle('shrink');
  }else if (yesBtnCount === 1) {
    this.classList.toggle('moveLeft');
  }else if(yesBtnCount === 2){
    this.classList.toggle('moveRight');
  } else if(yesBtnCount === 3){
    this.classList.toggle('moveDown');
  } else {
    yesBtn.style.display='none';
  }
  yesBtnCount++;
});

noBtn.addEventListener('click', function() {
  noBtnCount++;
  if(noBtnCount === 1){
    document.querySelector('h1').textContent = "That's what I thought.";
    yesBtn.style.display='none';
    noBtn.textContent="Continue";
  }else if(noBtnCount === 2){
    document.querySelector('h1').textContent = "Happy birthday!!!!!!!!!!";
    noBtn.style.display='none';
    gifContainer.style.display = 'block';
    confetti();
  }
  
});

});