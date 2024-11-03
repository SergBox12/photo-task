const pictures_url = "http://localhost:5000/api/pictures";
let response = await fetch(pictures_url);
export const photos = await response.json();
