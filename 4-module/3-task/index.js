function highlight(table) {
  for (let currentRow of table.rows) {
    for (let currentCell of currentRow.cells) {
      if (currentCell.hasAttribute('data-available')) {
        let className = currentCell.getAttribute('data-available') === 'true' ? 'available' : 'unavailable';
        currentRow.classList.add(className);
      } else {
        currentRow.setAttribute('hidden', 'true');
      }

      let classNameGender = currentCell.textContent === 'm' ? 'male' : 'female';
      currentRow.classList.add(classNameGender);

      if (+currentCell.textContent < 18) {
        currentRow.style.textDecoration = 'line-through';
      }
    }
  }
}
