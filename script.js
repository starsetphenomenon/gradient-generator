let firstColor = document.getElementById('firstColor');
let secondColor = document.getElementById('secondColor');
let gradient = document.getElementById('gradient');
let directions = document.getElementById('directions');
let randomColor = document.getElementById('randomColor');
let getCode = document.getElementById('getCode');
gradient.style.background = `linear-gradient(to bottom right, #38A2D7, #561139)`;
let linear = document.getElementById('linear');
let radial = document.getElementById('radial');
let heading = document.getElementById('heading');
let arrows = document.getElementsByClassName('arrow_wrapper');
let activeArrow = 'bottom right';
let hidePresets = document.getElementById('hidePresets');
let presetsPanel = document.getElementById('presets__wrapper');
/* let hex = document.getElementById('hex');
let rgb = document.getElementById('rgb'); */
let zero = document.querySelector('.zero');

const onInputColor = function () {
    if (linear.classList.contains('active')) {
        if (window.screen.width <= 768) {
            getCode.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
        }
        gradient.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
        /* if (hex.classList.contains('active')) {
            gradient.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
        } */
    } else if (radial.classList.contains('active')) {
        if (window.screen.width <= 768) {
            getCode.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
        }
        gradient.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    }    
    heading.style.background = `-webkit-linear-gradient(${firstColor.value}, ${secondColor.value})`;
};

const onDirection = function (e) {
    if (e.target.classList.contains('arrow_wrapper')) {
        if (document.querySelector('active-direction') === null) {
            Array.from(arrows).forEach(elem => elem.classList.remove('active-direction'));
        }
        e.target.classList.add('active-direction');
        activeArrow = e.target.getAttribute('name');
        if (linear.classList.contains('active')) {
            if (window.screen.width <= 768) {
                getCode.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
            }
            gradient.style.background = `linear-gradient(to ${e.target.getAttribute('name')}, ${firstColor.value}, ${secondColor.value})`;
        } else if (radial.classList.contains('active')) {
            if (window.screen.width <= 768) {
                getCode.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
            }
            gradient.style.background = `radial-gradient(at ${e.target.getAttribute('name')}, ${firstColor.value}, ${secondColor.value})`;
        }        
        heading.style.background = `-webkit-linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    }
};

const generateRandomColor = function () {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const onRandom = function () {
    let randomFirstColor = generateRandomColor();
    let randomSecondColor = generateRandomColor();
    let randomDirection = directions.children[Math.floor(Math.random() * directions.childElementCount)].getAttribute('name');
    if (linear.classList.contains('active')) {
        if (window.screen.width <= 768) {
            getCode.style.background = `linear-gradient(to ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;
        }
        gradient.style.background = `linear-gradient(to ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;
    } else {
        if (window.screen.width <= 768) {
            getCode.style.background = `radial-gradient(at ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;
        }
        gradient.style.background = `radial-gradient(at ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;

    }
    firstColor.value = `${randomFirstColor}`;
    secondColor.value = `${randomSecondColor}`;
    heading.style.background = `linear-gradient(to ${randomDirection}, ${randomFirstColor}, ${randomSecondColor})`;
};

/* const HexToRgb = function (c) {
    let a = c.split('');
    let r = parseInt(a[1] + a[2], 16);
    let g = parseInt(a[3] + a[4], 16);
    let b = parseInt(a[5] + a[6], 16);
    result = `rgba(${r}, ${g}, ${b}, 1)`;
    return result;
};

const RgbToHex = function (c) {
    let a = c.split(/[,()]/);
    let r = +a[1]
    let g = +a[2];
    let b = +a[3];
    result = `#${r}${g}${b}`;
    return result;
}; */

const onCopy = function () {
    if (linear.classList.contains('active')) {
        navigator.clipboard.writeText(`
        background: ${firstColor.value};
        background: ${gradient.style.background};
        background: -webkit-${gradient.style.background};
        background: -moz-${gradient.style.background};
        `);
    } else {
        navigator.clipboard.writeText(`
        background: ${firstColor.value};
        background: ${gradient.style.background};
        background: -webkit-${gradient.style.background};
        background: -moz-${gradient.style.background};
        `);
    }
    getCode.innerText = 'COPIED';
    setTimeout(() => {
        getCode.innerText = 'Get CSS';
    }, 800);
};


const onLinear = function () {
    gradient.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    getCode.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    linear.classList.add('active');
    radial.classList.remove('active');
    zero.style = `box-shadow: none;
    border-radius: none;
    cursor: default;`;
};

const onRadial = function () {
    gradient.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    getCode.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
    radial.classList.add('active');
    zero.style = `box-shadow: 0px 0px 4px black;
    border-radius: 8px;
    cursor: pointer;`;
    linear.classList.remove('active');
};

const onHex = function () {
    hex.classList.add('active');
    rgb.classList.remove('active');
};

const onRgb = function () {
    rgb.classList.add('active');
    hex.classList.remove('active');
};

const onPresetChange = function (e) {
    if (e.target.classList.contains('preset')) {
        gradient.style.background = window.getComputedStyle(e.target).backgroundImage;
        firstColor.value = e.target.getAttribute('color1');
        secondColor.value = e.target.getAttribute('color2');
        if (linear.classList.contains('active')) {
            if (window.screen.width <= 768) {
                getCode.style.background = `linear-gradient(to ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
            }
        } else {
            if (window.screen.width <= 768) {
                getCode.style.background = `radial-gradient(at ${activeArrow}, ${firstColor.value}, ${secondColor.value})`;
            }    
        }
    }
};

const onHide = function (e) {
    if (presets.classList.contains('hide_presets')) {
        presets.classList.remove('hide_presets');
        e.target.innerText = 'HIDE PRESETS';
    } else {
        presets.classList.add('hide_presets');
        e.target.innerText = 'SHOW PRESETS';
    }
}

/* hex.addEventListener('click', onHex);
rgb.addEventListener('click', onRgb); */
linear.addEventListener('click', onLinear);
radial.addEventListener('click', onRadial);
getCode.addEventListener('click', onCopy);
randomColor.addEventListener('click', onRandom);
directions.addEventListener('click', onDirection);
firstColor.addEventListener('input', onInputColor);
secondColor.addEventListener('input', onInputColor);
presets.addEventListener('click', onPresetChange);
hidePresets.addEventListener('click', onHide);