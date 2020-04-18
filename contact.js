// capture enquiry and send to the DB
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('CookingEnquiries').add({
    Name: createForm.name.value,
    Email: createForm.email1.value,
    Telephone: createForm.mobile1.value
  }).then(() => {
    // close the create modal & reset form
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});