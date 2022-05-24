/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
    this.deleteRows();
  }

  createTable() {
    let table = document.createElement("table");
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    table.append(thead);
    thead.innerHTML = '<tr> <th>Имя</th> <th>Возраст</th> <th>Зарплата</th> <th>Город</th> <th></th> </tr>';

    table.append(tbody);
    for (let current of this.rows) {
      let rowTable = document.createElement('tr');

      let button = ''
      rowTable.insertAdjacentHTML('beforeend',
        `<td>${current.name}</td>
        <td>${current.age}</td>
        <td>${current.salary}</td>
        <td>${current.city}</td>
        <td><button>X</button></td>`);
      tbody.append(rowTable);
    }

    return table;
  }

  deleteRows() {
    let buttons = this.elem.querySelectorAll('button');

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', (e) => {
        let tableRow = e.target.closest('tr');
        tableRow.parentNode.removeChild(tableRow);
      })
    }
  }
}
