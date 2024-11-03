//Зміна розміру зображення code start
const img_upload_preview = document.querySelector(".img-upload__preview");
const effect_level_value = document.querySelector(".effect-level__value");
const scale_control_smaller = document.querySelector(
  ".scale__control--smaller"
);
const scale_control_bigger = document.querySelector(".scale__control--bigger");
const scale_control = document.querySelector(".scale__control--value");
let scale_control_value_index = 25;
let scale_control_value = parseInt(scale_control.value);
const effects_list = document.querySelector(".effects__list");
let picture_load = '';


//увеличение масштаба
function increaseScaleControlValue() {
  if (scale_control_value < 100) {
    scale_control_value += scale_control_value_index;
    scale_control.value = String(scale_control_value) + "%";
    img_upload_preview.style.cssText += `scale: 0.${scale_control_value};`;
  }
  if (scale_control_value === 100) {
    img_upload_preview.style.cssText += `scale: 1;`;
  }
}

//уменьшение масштаба
function decreaseScaleControlValue() {
  if (scale_control_value > 25) {
    scale_control_value -= scale_control_value_index;
    scale_control.value = String(scale_control_value) + "%";
    img_upload_preview.style.cssText += `scale: 0.${scale_control_value};`;
  }
}

//обработчики событий для масштаба
scale_control_bigger.addEventListener("click", increaseScaleControlValue);
scale_control_smaller.addEventListener("click", decreaseScaleControlValue);

// обьект эффекты
const effects = {
  "effect-none": "effects__preview--none",
  "effect-chrome": "effects__preview--chrome",
  "effect-sepia": "effects__preview--sepia",
  "effect-marvin": "effects__preview--marvin",
  "effect-phobos": "effects__preview--phobos",
  "effect-heat": "effects__preview--heat",
};

//функция получает выбранный эффект, убирает предыдущий и добавляет новый
function switchEffect(effect) {
  img_upload_preview.classList.remove(
    effects["effect-none"],
    effects["effect-chrome"],
    effects["effect-sepia"],
    effects["effect-marvin"],
    effects["effect-phobos"],
    effects["effect-heat"]
  );
  img_upload_preview.classList.add(effect);
}

// функция определяет какой эффект выбран, вызывает функция что применяет данный эффект и передает эффект далее
function chooseEffect(event) {
  switchEffect(effects[event.target.id]);
  slideEffect(effects[event.target.id]);
}

effects_list.addEventListener("click", chooseEffect);

//Зміна розміру зображення  code end

//слайдер - редактирование загруженной картинки
const slider = document.getElementById("slider");

//переменные для слайдера
let step = 0;
let min = 0;
let max = 0;
let effectName = "";

//удаление слайдера если он уже был создан
function destroyExistingSlider() {
  if (slider && slider.noUiSlider) {
    slider.noUiSlider.destroy();
  }
}

// создание слайдера
function createSlider(step, min, max, effectName) {
  destroyExistingSlider();
  noUiSlider.create(slider, {
    start: [0],
    step: step,
    tooltips: true,
    connect: true,
    range: {
      min: min,
      max: max,
    },
  });
  slider.noUiSlider.on("update", function (values) {
    if (effectName === "invert") {
      img_upload_preview.style.cssText += `filter: ${effectName}(${values[0]}%);`;
      effect_level_value.value = values;
    } else if (effectName === "blur") {
      img_upload_preview.style.cssText += `filter: ${effectName}(${values[0]}px);`;
      effect_level_value.value = values;
    } else {
      img_upload_preview.style.cssText += `filter: ${effectName}(${values[0]});`;
      effect_level_value.value = values;
    }
  });
}

// функция для определения какой эффект выбран, настроек слайдера и вызов функции создание слайдера
function slideEffect(effect) {
  if (effect === effects["effect-none"]) {
    step = 0;
    min = 0;
    max = 0;
    effectName = "";
    destroyExistingSlider();
    img_upload_preview.style.removeProperty("filter");
  } else {
    if (effect === effects["effect-chrome"]) {
      step = 0.1;
      min = 0;
      max = 1;
      effectName = "grayscale";
    }
    if (effect === effects["effect-sepia"]) {
      step = 0.1;
      min = 0;
      max = 1;
      effectName = "sepia";
    }
    if (effect === effects["effect-marvin"]) {
      step = 1;
      min = 0;
      max = 100;
      effectName = "invert";
    }
    if (effect === effects["effect-phobos"]) {
      step = 0.1;
      min = 0;
      max = 3;
      effectName = "blur";
    }
    if (effect === effects["effect-heat"]) {
      step = 0.1;
      min = 1;
      max = 3;
      effectName = "brightness";
    }
    createSlider(step, min, max, effectName);
  }
}

//слайдер - редактирование загруженной картинки -- конец

const uploadPictureForm = document.getElementById("upload-select-image");
const configPictureForm = document.querySelector(".img-upload__overlay");
const fileInput = document.getElementById("upload-file");
const text_hashtags = document.querySelector(".text__hashtags");
const text_description = document.querySelector(".text__description");

//удаляем дефолную картинку и вставляем свою
function createImg(img) {
  while (img_upload_preview.firstChild) {
    //Список является ссылкой, то есть он будет переиндексирован перед каждым вызовом
    img_upload_preview.removeChild(img_upload_preview.firstChild);
  }
  img_upload_preview.appendChild(img);
}

//загружаем только одну картинку и проверяем!
function pictureFileValidation(event) {
  
  const pictureFile = event.target.files[0];
  const pictureType = event.target.files[0].type;
  if (pictureType == "image/jpeg" || pictureType == "image/png") {
    configPictureForm.classList.remove("hidden");
  } else alert("It is not a Picture, please try again!");

  const img = document.createElement("img");
  createImg(img);

  const reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target.result;
    picture_load = e.target.result;
  };
  reader.readAsDataURL(pictureFile);
}
fileInput.addEventListener("change", pictureFileValidation);

//проверяем значение инпута хештега на пустую строку (пробелы)
function isEmpty(str) {
  if (str.trim().length === 0) {
    return true;
  }
  return false;
}
//возвращаем значение по умолчанию для инпута хеш-тега
function defaultValue(field) {
  field.value = "";
}
//отображение ошибки
function validationError(field, errorText) {
  field.setCustomValidity(errorText);
}
//проверяем с регулярным выражением
function isCorrectHash(str) {
  const regExpr = /^#[0-9A-ZА-ЯЁ]+$/i;
  return regExpr.test(str);
}
//проверка на дубликаты
function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

function hashtagsValidation(event) {
  //значение инпут
  const inputValue = event.target.value;
  const inputValueArray = inputValue.toLowerCase().split(" ");
  const maxHashTagsAmount = 5;
  const hashTagLenght = 20;
  let correctTagLenght = true;
  let correctHash = true;

  const error = {
    error_empty: "Field is empty, add some letters",
    error_limit: "no more than 5 hastags",
    error_letter_limit: "no more that 20 letters per hastag",
    error_regular: "regulae expression error",
    error_diplicates: "delete diplicates",
  };

  if (isEmpty(inputValue)) {
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_empty);
    return console.log(error.error_empty);
  }

  if (inputValueArray.length > maxHashTagsAmount) {
    // проверка на колличество хештегов не более 5
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_limit);
    return console.log(error.error_limit);
  }

  inputValueArray.forEach((hashTag) => {
    if (hashTag.length > hashTagLenght) {
      correctTagLenght = false;
    }
  });

  if (!correctTagLenght) {
    // проверка на длину хештега не более 20 символов
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_letter_limit);
    return console.log(error.error_letter_limit);
  }

  inputValueArray.forEach((hashTag) => {
    if (!isCorrectHash(hashTag)) {
      correctHash = false;
    }
  });
  // проверяем по регулярному выражению
  if (!correctHash) {
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_regular);
    return console.log(error.error_regular);
  }
  if (hasDuplicates(arr)) {
    defaultValue(text_hashtags);
    validationError(text_hashtags, error.error_diplicates);
    return console.log(error.error_diplicates);
  }
}
text_hashtags.addEventListener("change", hashtagsValidation);

//coomment validation

function commentValidation(event) {
  const maxlenght = 140;
  const comment = event.target.value;
  const error = "no more than 140 symbl";

  if (comment.length > maxlenght) {
    defaultValue(text_description);
    validationError(text_description, error);
  }
}
text_description.addEventListener("change", commentValidation);

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.querySelector("#upload-select-image");
  const form_data = new FormData(form);
  form_data.set('filename', picture_load);

  //fields for sending to server
  const url = 'http://localhost:5000/api/add-picture';
  const response = await fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(Object.fromEntries(form_data))
  });
  const result = await response.json();
}

uploadPictureForm.addEventListener("submit", handleFormSubmit);
