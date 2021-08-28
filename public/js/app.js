
// document.querySelector("#input-form").addEventListener("submit", (e) => {
//     // e.preventDefault();

//     const book = document.querySelector("#bookname").value;

//     fetch('http://localhost:3000/books/newbook', {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		name: book
// 	}),
// 	headers: {
// 		'Content-type': 'application/json; charset=UTF-8'
// 	}
// }).then(function (response) {
// 	if (response.ok) {
// 		return response.json();
// 	}
// 	return Promise.reject(response);
// }).then(function (data) {
// 	console.log(data);
// }).catch(function (error) {
// 	console.warn('Something went wrong.', error);
// });
// })

function Hello() {
    console.log(document.querySelector("#bookname").value);
}