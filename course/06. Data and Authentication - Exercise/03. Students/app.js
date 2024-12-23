const url = 'http://localhost:3030/jsonstore/collections/students';

const form = document.querySelector('#form');
form.addEventListener('click', submitForm);

async function submitForm(e) {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData);

  if (!data.firstName || !data.lastName || !data.facultyNumber || !data.grade) {
    return;
  }

  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      facultyNumber: data.facultyNumber,
      grade: data.grade
    })
  })

  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(i => i.value = '');
}

async function getStudents() {
  const tableEl = document.querySelector('#results tbody');

  const res = await fetch(url);
  const data = await res.json();

  const students = Object.values(data);
  students.forEach(s => {
    const firstName = s.firstName;
    const lastName = s.lastName;
    const facultyNumber = s.facultyNumber;
    const grade = Number(s.grade);

    const tr = document.createElement('tr');
    tr.id = s._id;

    const firstNameCell = tr.insertCell(0);
    firstNameCell.textContent = firstName;

    const lastNameCell = tr.insertCell(1);
    lastNameCell.textContent = lastName;

    const facultyNumberCell = tr.insertCell(2);
    facultyNumberCell.textContent = facultyNumber;

    const gradeCell = tr.insertCell(3);
    gradeCell.textContent = grade.toFixed(2);

    tableEl.appendChild(tr);
  });
}
getStudents();