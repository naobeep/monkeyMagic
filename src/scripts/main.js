const targets = document.querySelectorAll('.monkey-magic');

targets.forEach(target => {
  console.log(target.children[0]);
  target.children[0].style.opacity = 0;
  const thumbnail = document.createElement('div');
  thumbnail.className = 'monkey-magic-thumbnail';

  const imgSrc = target.children[0].getAttribute('src');

  target.append(thumbnail);

  for (let i = 1; i <= 6; i++) {
    setTimeout(() => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = `monkey-magic-thumbnail`;
      figure.append(img);
      thumbnail.append(figure);
    }, i * 200);
  }

  setTimeout(() => {
    target.children[0].style.opacity = 1;
    thumbnail.style.opacity = 0;
  }, 1400);
});
