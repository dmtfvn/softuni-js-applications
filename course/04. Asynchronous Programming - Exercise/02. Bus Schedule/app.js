function solve() {
  const infoBox = document.querySelector('.info');

  const departBtn = document.querySelector('#depart');
  const arriveBtn = document.querySelector('#arrive');

  let stopId = {
    next: 'depot'
  }

  async function depart() {
    departBtn.disabled = true;
    arriveBtn.disabled = false;

    const url = `http://localhost:3030/jsonstore/bus/schedule/${stopId.next}`;
    const res = await fetch(url);

    if (res.status !== 200) {
      departBtn.disabled = true;
      arriveBtn.disabled = true;

      infoBox.textContent = 'Error';
    }

    stopId = await res.json();

    infoBox.textContent = `Next stop ${stopId.name}`;
  }

  function arrive() {
    departBtn.disabled = false;
    arriveBtn.disabled = true;

    infoBox.textContent = `Arriving at ${stopId.name}`;
  }

  return {
    depart,
    arrive
  };
}

const result = solve();