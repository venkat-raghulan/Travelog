// var today = new Date();
// var expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000); // plus 30 days

// function setCookie(name, id) {
//   var element = document.getElementById(id);
//   var elementValue = escape(element.value);

//   document.cookie =
//     name + "=" + elementValue + "; path=/; expires=" + expiry.toGMTString();
//   console.log(document.cookie);
// }

// function storeValues(form) {
//   setCookie("email", form.email - field.value);
//   return true;
// }

// function displayCookieValue(name) {
//   var value = getCookie(name);
//   var element = document.getElementById("value");
//   element.innerHTML = "Cookie name: " + name + ", value " + value;
// }

// function getCookie(name) {
//   var re = new RegExp(name + "=([^;]+)");
//   var value = re.exec(document.cookie);
//   return value != null ? unescape(value[1]) : null;
// }
