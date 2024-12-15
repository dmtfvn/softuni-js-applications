function attachEvents() {
  const locationInput = document.querySelector('#location');
  const submitBtn = document.querySelector('#submit');

  const forecast = document.querySelector('#forecast');
  const current = document.querySelector('#current');
  const upcoming = document.querySelector('#upcoming');

  function renderWeatherIcon(weather) {
    if (weather === 'Sunny') {
      return '☀';
    } else if (weather === 'Partly sunny') {
      return '⛅';
    } else if (weather === 'Overcast') {
      return '☁';
    } else if (weather === 'Rain') {
      return '☂';
    }
  }

  const url = 'http://localhost:3030/jsonstore/forecaster/locations';

  submitBtn.addEventListener('click', () => {
    fetch(url)
      .then(res => {
        if (res.status >= 500) {
          throw new Error(`HTTP error, status: ${res.status}`);
        }

        return res.json();
      })
      .then(data => {
        const cObj = data.find(c => c.name.toLowerCase() === locationInput.value.toLowerCase());

        if (cObj === undefined) {
          throw new Error('Incorrect city name or empty input field');
        }

        const today = `http://localhost:3030/jsonstore/forecaster/today/${cObj.code}`;

        fetch(today)
          .then(res => res.json())
          .then(data => {
            current.innerHTML = '';

            const tD = Object.values(data);

            const divLabel = document.createElement('div');
            divLabel.className = 'label';
            divLabel.textContent = 'Current conditions';

            const div = document.createElement('div');
            div.className = 'forecasts';

            const spanSymbol = document.createElement('span');
            spanSymbol.className = 'condition symbol';
            spanSymbol.textContent = renderWeatherIcon(tD[0].condition);

            const spanContainer = document.createElement('span');
            spanContainer.className = 'condition';

            const span1 = document.createElement('span');
            span1.className = 'forecast-data';
            span1.textContent = `${tD[1]}`;

            const span2 = document.createElement('span');
            span2.className = 'forecast-data';
            span2.textContent = `${tD[0].low}°/${tD[0].high}°`;

            const span3 = document.createElement('span');
            span3.className = 'forecast-data';
            span3.textContent = `${tD[0].condition}`;

            spanContainer.append(span1, span2, span3);
            div.append(spanSymbol, spanContainer);

            current.append(divLabel, div);
          });

        const nextDays = `http://localhost:3030/jsonstore/forecaster/upcoming/${cObj.code}`;

        fetch(nextDays)
          .then(res => res.json())
          .then(data => {
            upcoming.innerHTML = '';

            const uD = Object.values(data);

            const divLabel = document.createElement('div');
            divLabel.className = 'label';
            divLabel.textContent = 'Three-day forecast';

            const div = document.createElement('div');
            div.className = 'forecast-info';

            for (let i = 0; i < uD[0].length; i++) {
              const spanContainer = document.createElement('span');
              spanContainer.className = 'upcoming';

              const span1 = document.createElement('span');
              span1.className = 'symbol';
              span1.textContent = renderWeatherIcon(uD[0][i].condition);

              const span2 = document.createElement('span');
              span2.className = 'forecast-data';
              span2.textContent = `${uD[0][i].low}°/${uD[0][i].high}°`;

              const span3 = document.createElement('span');
              span3.className = 'forecast-data';
              span3.textContent = `${uD[0][i].condition}`;

              spanContainer.append(span1, span2, span3);
              div.appendChild(spanContainer);
            }

            upcoming.append(divLabel, div);
          });

        forecast.style.display = 'block';
      })
      .catch(err => {
        current.innerHTML = '';
        upcoming.innerHTML = '';

        const li = document.createElement('li');
        li.textContent = err.message;

        current.appendChild(li);

        forecast.style.display = 'block';
      });
  });
}

attachEvents();