function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  for (let current of friends) {
    ul.insertAdjacentHTML('beforeend', `<li>${current.firstName} ${current.lastName}</li>`);
  }

  return ul;
}
