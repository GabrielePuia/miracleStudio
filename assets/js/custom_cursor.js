var cursorOutline = document.querySelector('.cursor_outline');
var cursor = document.querySelector('.cursor');
var a = document.querySelectorAll('a');
var projectLinks = document.querySelectorAll('a.project');

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

projectLinks.forEach(item => {
  item.addEventListener('mouseover', () => {
    cursor.classList.add('cursor--bigHover');
  });
  item.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--bigHover');
  });
})