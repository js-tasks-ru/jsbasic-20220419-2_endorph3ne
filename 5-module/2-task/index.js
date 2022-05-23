function toggleText() {
  let button = document.querySelector('.toggle-text-button');

  button.addEventListener('click', () => {
    let div = button.nextElementSibling;
    div.hidden = !div.hidden;
  });
}
