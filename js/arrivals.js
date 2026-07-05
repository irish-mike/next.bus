// Renders the arrivals list into the DOM.
// Rows are reused between refreshes and only changed text is touched,
// so updates don't flash the whole list.
export function renderArrivals(listEl, arrivals) {
  syncRowCount(listEl, arrivals.length);
  arrivals.forEach((arrival, i) => updateRow(listEl.children[i], arrival));
}

function syncRowCount(listEl, count) {
  while (listEl.children.length < count) {
    listEl.insertAdjacentHTML('beforeend', emptyRow());
  }
  while (listEl.children.length > count) {
    listEl.lastElementChild.remove();
  }
}

function emptyRow() {
  return (
    '<li class="arrival">' +
    '<span class="arrival-route"></span>' +
    '<span class="arrival-destination"></span>' +
    '<span class="arrival-due"></span>' +
    '</li>'
  );
}

function updateRow(row, { route, destination, minutes }) {
  setText(row.querySelector('.arrival-route'), route);
  setText(row.querySelector('.arrival-destination'), destination);
  setText(row.querySelector('.arrival-due'), minutes || '—');
}

function setText(el, value) {
  if (el.textContent !== value) {
    el.textContent = value;
  }
}
