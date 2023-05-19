
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
// const nav = document.querySelector('nav');

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    // nav.classList.toggle("active");
}


const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    // nav.classList.remove("active");
}


// TypeWriter Logic
const dynamicText = document.querySelector('.dynamic-text');
const words = ['Front end developer', 'SpringBoot developer', 'Problem Solver'];
let wordIndex = 0;

function typeWriter(text, i, callback) {
  if (i < text.length) {
    dynamicText.textContent += text.charAt(i);
    setTimeout(function () {
      typeWriter(text, i + 1, callback);
    }, 40 + Math.random() * 60); // Adjust typing speed with random variation
  } else {
    setTimeout(function () {
      deleteWriter(text, i, callback);
    }, 800); // Delay before deleting text
  }
}

function deleteWriter(text, i, callback) {
  if (i >= 0) {
    dynamicText.textContent = text.substring(0, i);
    setTimeout(function () {
      deleteWriter(text, i - 1, callback);
    }, 30 + Math.random() * 40); // Adjust deleting speed with random variation
  } else {
    setTimeout(callback, 500); // Delay before next word
  }
}

function changeText() {
  const currentWord = words[wordIndex];
  typeWriter(currentWord, 0, function () {
    setTimeout(changeText, 2000); // Delay before starting next word
  });

  wordIndex = (wordIndex + 1) % words.length;
}

changeText();


// Projects Section Logic

const categories = document.querySelectorAll('.category');
const images = document.querySelectorAll('.image');
const underline = document.querySelector('.underline');

images.forEach(image => {
  image.classList.add('show');
})

categories.forEach((category) => {
  category.addEventListener('click', () => {
    // Remove active class from all categories
    categories.forEach((c) => c.classList.remove('active'));

    // Add active class to the clicked category
    category.classList.add('active');

    const filter = category.getAttribute('data-filter');

    // Update underline position
    const categoryWidth = category.offsetWidth;
    const categoryOffsetLeft = category.offsetLeft;

    underline.style.width = `${categoryWidth}px`;
    underline.style.transform = `translateX(${categoryOffsetLeft}px)`;

    // Filter images based on the selected category
    images.forEach((image) => {
      const imageCategories = image.classList;

      if (filter === 'all' || imageCategories.contains(filter)) {
        image.classList.remove('hidden');
        image.classList.add('show');
      } else {
        image.classList.remove('show');
        image.classList.add('hidden');
      }
    });
  });
});


// Map Logic

var defaultLocation = ol.proj.fromLonLat([82.9980, 25.3315]);
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: defaultLocation,
    zoom: 12
  })
});

// Create a pointer feature
var pointerFeature = new ol.Feature({
  geometry: new ol.geom.Point(defaultLocation)
});

// Style the pointer
var pointerStyle = new ol.style.Style({
  image: new ol.style.Icon({
    src: './placeholderS.png' // Default pointer icon
  })
});
pointerFeature.setStyle(pointerStyle);

// Create a vector layer and add the pointer feature to it
var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [pointerFeature]
  })
});
map.addLayer(vectorLayer);
