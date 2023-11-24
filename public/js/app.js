const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg_1 = document.querySelector("#msg-1");
const msg_2 = document.querySelector("#msg-2");

msg_1.innerHTML = "";
msg_2.innerHTML = "";

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  msg_1.textContent = "loading ...";
  msg_2.textContent = "";
  fetch(`http://localhost:5000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg_1.innerHTML = data.error;
        } else {
          const html = data.data.reduce((total, ele) => {
            total += `<p>${ele.biDanh}</p>`;
            return total;
          });
          msg_1.innerHTML = html;
        }
      });
    }
  );
});
