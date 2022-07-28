const contextMenu = document.querySelector('.wrapper');
const shareMenu = document.querySelector('.share-menu');

function getClickedPosition(e) {
  let x = e.offsetX;
  let y = e.offsetY;
  return [x, y];
}

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  let positions = getClickedPosition(e);
  let positionX = positions[0];
  let positionY = positions[1];
  const windowWidth = window.innerWidth;
  const windowHeihgt = window.innerHeight;
  const menuWidth = contextMenu.offsetWidth;
  const menuHeight = contextMenu.offsetHeight;

  if (positionX > windowWidth - menuWidth - shareMenu.offsetWidth) {
    shareMenu.style.left = '-200px';
  } else {
    shareMenu.style.left = '';
    shareMenu.style.right = '-200px';
  }

  positionX =
    positionX > windowWidth - menuWidth ? windowWidth - menuWidth : positionX;

  positionY =
    positionY > windowHeihgt - menuHeight
      ? windowHeihgt - menuHeight
      : positionY;

  contextMenu.style.left = `${positionX}px`;
  contextMenu.style.top = `${positionY}px`;

  contextMenu.style.visibility = 'visible';
});

document.addEventListener('click', () => {
  contextMenu.style.visibility = 'hidden';
});
