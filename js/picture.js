import { photos } from "./main.js";

//контейнер для отображения фото
let pictureContainer = document.querySelector(".pictures");
//шаблон picture
let template = document.querySelector("#picture");

//функция, что возвращает клон обьекта template с перезаписанными данными, по индексу массива photos
function getPicture(arr_element) {
  //делаем картинку
  let picture = template.content.cloneNode(true);
  //определяем поля
  let picture_img = picture.querySelector(".picture__img");
  let picture_comments = picture.querySelector(".picture__comments");
  let picture_likes = picture.querySelector(".picture__likes");
  // присваиваем значения из переданного элемента массива
  picture_img.dataset.id = arr_element.id;
  picture_img.src = arr_element.url;
  picture_comments.textContent = String(arr_element.comments.length);
  picture_likes.textContent = arr_element.likes;
  //возвращаем картинку
  return picture;
}

/*
  функция, что создает фрагмент, генерирует картинки согласно массиву photos, вызывая getPicture,
  помещает созданные картинки в фрагмент, добавляет данные с фрагмента в контейнер и 
  экспортируем функцию, что бы браузер ее вызвал при загрузке индекса
*/
export function getPictures() {
  let fragment = new DocumentFragment();

  for (let index = 0; index < photos.length; index++) {
    fragment.append(getPicture(photos[index]));
  }
  pictureContainer.append(fragment);
}

getPictures();
