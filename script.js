'use strict';
const drawnColumnsContainer = document.getElementsByClassName('column');
const drawnColumns = document.getElementsByClassName('column-draw');
const amountParagraph = document.getElementsByClassName('amount');

// get current day
const date = new Date();
const day = date.getDay();
const dayIndex = day === 0 ? 6 : day - 1; //make sunday index 6

// set active day to drawn columns
drawnColumns[dayIndex].classList.add('column-draw-active');

const jsonData = async () => {
  const response = await fetch('data.json');
  const data = await response.json();

  const allAmounts = [];
  const allDays = [];

  // insert JSON data
  for (let i = 0; i < data.length; i++) {
    // gathering amounts and days in outside arrays for reusability
    allAmounts.push(data[i].amount);
    allDays.push(data[i].day);

    // insert day names
    drawnColumnsContainer[i].insertAdjacentHTML(
      'afterbegin',
      `
  <p>${allDays[i]}</p>
`
    );

    // insert amount
    amountParagraph[i].innerText = `$${allAmounts[i]}`;

    // draw columns
    drawnColumns[i].style.height = `${allAmounts[i] * 2.5}px`;

    // mouse event toggling
    drawnColumns[i].addEventListener('mouseover', () => {
      amountParagraph[i].classList.toggle('amount-hiden');
    });

    drawnColumns[i].addEventListener('mouseout', () => {
      amountParagraph[i].classList.toggle('amount-hiden');
    });
  }
};

jsonData();
