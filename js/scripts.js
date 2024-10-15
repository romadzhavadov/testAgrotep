/*!
* Start Bootstrap - Heroic Features v5.0.6 (https://startbootstrap.com/template/heroic-features)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-heroic-features/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

// call to action random colors

const button = document.getElementById("callToAction");
const newCaption = document.getElementById("newCaption");
const animatedText = document.getElementById("animatedText");
const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

button.addEventListener('click', () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    button.style.backgroundColor = randomColor;

    const fetchCatFact = async () => {
        try {
            const res = await fetch('https://catfact.ninja/fact')
            const data = await res.json();
            console.log(data)
            newCaption.textContent = data.fact;
        } catch (err) {
            console.error('Error fact', err)
        }
    }

    animatedText.classList.add('fade-out');
    setTimeout(() => {
        animatedText.textContent = ''; 
    }, 1000);

    fetchCatFact()
})

// drag and drop

const draggableElements = document.querySelectorAll('#draggableContainer .col-lg-6');

draggableElements.forEach(element => {
    element.addEventListener('dragstart', dragStart);
    element.addEventListener('dragover', dragOver);
    element.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.outerHTML);
    e.dataTransfer.effectAllowed = 'move';
    e.target.classList.add('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggingElement = document.querySelector('.dragging');
    if (e.target.closest('.col-lg-6')) {
        const targetHtml = e.target.closest('.col-lg-6').outerHTML;
        e.target.closest('.col-lg-6').outerHTML = draggingElement.outerHTML; 
        draggingElement.outerHTML = targetHtml; 
        initDraggableElements();
        changeSquareColors();
    }
}

function changeSquareColors() {
    const squares = document.querySelectorAll('.feature'); 
    squares.forEach(square => {
        square.classList.remove('bg-primary');
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        square.style.backgroundColor = randomColor; 
    });
}

function initDraggableElements() {
    const draggableElements = document.querySelectorAll('#draggableContainer .col-lg-6');
    draggableElements.forEach(element => {
        element.addEventListener('dragstart', dragStart);
        element.addEventListener('dragover', dragOver);
        element.addEventListener('drop', drop);
        element.classList.remove('dragging'); 
    });
}

initDraggableElements();
