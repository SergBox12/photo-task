import { photos } from "./main.js";

// определяем поля
const body = document.querySelector(".body");
//const pictures = document.querySelectorAll(".picture");
const pictures = document.querySelector(".pictures");
const big_picture = document.querySelector(".big-picture");
const picture_wrapper = document.querySelector(".big-picture__img");
const picture_likes = document.querySelector(".likes-count");
const picture_comments = document.querySelector(".comments-count");
const picture_cancel = document.querySelector("#picture-cancel");
const template_comment = document.querySelector("#social__comment");
const social_comments = document.querySelector(".social__comments");
const def_comment = document.querySelector(".social__comment");
const social_comments_loader = document.querySelector(".social__comments-loader");
const comments_shown = document.querySelector(".comments-shown");
let picture_id = 0;
let comment_index = 5;

// создаем клон одного комментария
function getComment(data) {
  //делаем клон и определяем поля
  const comment = template_comment.content.cloneNode(true);
  const social_author = comment.querySelector(".social__author");
  const social_text = comment.querySelector(".social__text");
  const social_picture = comment.querySelector(".social__picture");
  //указываем значения переданные в функцию
  social_author.textContent = data.name;
  social_text.textContent = data.message;
  social_picture.src = data.avatar;
  return comment;
}

// получаем список комментариев из пришедшего массива

function increaseCommentsIndex() {
  social_comments.replaceChildren('');
  comment_index += 5;
  getPictureInfo(picture_id);
}

social_comments_loader.addEventListener('click', increaseCommentsIndex);

function getComments(dataArr) {
  let comments = new DocumentFragment();
  if (dataArr.length - comment_index <= 0) {
    comment_index = dataArr.length;
    social_comments_loader.classList.add("hidden");
  }
  for (let index = 0; index < comment_index; index++) {
    comments.append((getComment(dataArr[index])));
  }
  comments_shown.textContent = comment_index;
  return comments;
}



//получаем нужный обьект из массива данных и перезаписываем переменные согласно полученному id
function getPictureInfo(id) {
  for (let index = 0; index < photos.length; index++) {
    if (photos[index].id === +id) {
      for (const child of picture_wrapper.children) {
        child.src = photos[index].url;
      }
      picture_likes.textContent = photos[index].likes;
      picture_comments.textContent = photos[index].comments.length;
      social_comments.append(getComments(photos[index].comments));
    }
  }
}

//открывем картику, проверяем наличие класса hidden, затем убирем класс hidden, после чего обновляем данные по id
/*pictures.forEach((pic) => {
  pic.addEventListener("click", (e) => {
    if (big_picture.classList.contains("hidden")) {
      big_picture.classList.remove("hidden");
      body.classList.add("modal-open");
      def_comment.remove();
      getPictureInfo(e.target.dataset.id);
    }
  });
});
*/

function handler(event) {
  if (event.target.className === "picture__img") {
    if (big_picture.classList.contains("hidden")) {
      big_picture.classList.remove("hidden");
      body.classList.add("modal-open");
      def_comment.remove();
      picture_id = event.target.dataset.id;
      getPictureInfo(picture_id);
    }
  }
}

function backToDefault() {
  big_picture.classList.add("hidden");
  body.classList.remove("modal-open");
  social_comments.replaceChildren('');
  comment_index = 5;
  social_comments_loader.classList.remove("hidden");
}

function closeWindow() {
  backToDefault();
}

function closeWindowESC(KeyboardEvent) {
  if (KeyboardEvent.code.match("Escape")) {
    backToDefault();
  }
}
//открываем картинку
pictures.addEventListener("click", handler);
//закрываем окно по клику на крестик
picture_cancel.addEventListener("click", closeWindow);
//закрываем окно по нажатию на esc
document.addEventListener("keydown", closeWindowESC);
