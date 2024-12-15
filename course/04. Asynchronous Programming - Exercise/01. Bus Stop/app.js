function getInfo() {
  const idStop = document.querySelector('#stopId').value;

  const stopName = document.querySelector('#stopName');
  const buses = document.querySelector('#buses');

  const url = `http://localhost:3030/jsonstore/bus/businfo/${idStop}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      buses.innerHTML = '';

      stopName.textContent = data.name;

      const busStop = Object.entries(data.buses);
      busStop.forEach(s => {

        const li = document.createElement('li');
        li.textContent = `Bus ${s[0]} arrives in ${s[1]} minutes`;

        buses.appendChild(li);
      })
    })
    .catch(() => {
      buses.innerHTML = '';

      stopName.textContent = 'Error';
    });
}