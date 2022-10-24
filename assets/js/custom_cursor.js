const cursorOutline = document.querySelector('.cursor_outline');
const cursor = document.querySelector('.cursor');
const a = document.querySelectorAll('a');
const projectLinks = document.querySelectorAll('a.project');

const magnets = document.querySelectorAll('.magnetic');

if(window.innerWidth >= $lg) {
  console.log("You are not on mobile; customCursor active");

  /* MAGNETIC EFFECT */
  magnets.forEach( (magnet) => {
    let magnetStrength = magnet.dataset.magnetStrength;
    magnet.addEventListener('mousemove', function(event) {
      moveMagnet(event, magnetStrength);
    });
    magnet.addEventListener('mouseout', function(event) {
      gsap.to( event.currentTarget, 1, {x: 0, y: 0, ease: Power4.easeOut})
    } );
  });
  function moveMagnet(event, magnetStrength) {
    let magnetButton = event.currentTarget;
    let bounding = magnetButton.getBoundingClientRect();
    gsap.to( magnetButton, 1, {
      x: ((( event.clientX - bounding.left)/magnetButton.offsetWidth) - 0.5) * magnetStrength,
      y: ((( event.clientY - bounding.top)/magnetButton.offsetHeight) - 0.5) * magnetStrength,
      ease: Power4.easeOut
    })
  }

  //Track mouse movement
  document.addEventListener('mousemove', function(e){
    var x = e.clientX;
    var y = e.clientY;
    cursorOutline.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    /*cursor.style.transform = `translate3d(calc(${e.clientX}px), calc(${e.clientY}px), 0)`;*/
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  });
  //Click
  document.addEventListener('mousedown', function(){
    cursor.classList.add('cursor--clicked')
  });

  document.addEventListener('mouseup', function(){
    cursor.classList.remove('cursor--clicked')
  });

  //Hover effect
  a.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursorOutline.classList.add('cursor_outline--hover');
    });
    item.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('cursor_outline--hover');
    });
  })

  menuToggle.addEventListener('mouseover', () => {
    cursorOutline.classList.add('cursor_outline--hover');
  });
  menuToggle.addEventListener('mouseleave', () => {
    cursorOutline.classList.remove('cursor_outline--hover');
  });


  projectLinks.forEach(item => {
    item.addEventListener('mouseover', () => {
      cursor.classList.add('cursor--bigHover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor--bigHover');
    });
  })

} else {
  console.log("You are on mobile; customCursor NOT active");
}