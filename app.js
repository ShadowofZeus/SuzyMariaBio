// Auth Firebase Section
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        // console.log(user);
      db.collection('CookingEnquiries').get().then(snapshot => {
        // console.log(snapshot.docs);
        setupList(snapshot.docs);
      });
    } 
    else 
    {
        setupList([]);
    }
  });


  //logout
  const logout = document.querySelector('#LogOutBtn');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
        .then(() => {
            const overlayStatus = document.getElementById("overlay")
            overlayStatus.style.display = "block"; 
        })
  });

  // login
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['emailLabel'].value;
    const password = loginForm['password5'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      // close the signIn form & reset it
      const overlayStatus = document.getElementById("overlay")
      overlayStatus.style.display = "none";
      loginForm.reset();
    });

  });

  //DOM Manipulations

// Render DB Data in the Page 
const setupList = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
        //data() method lets you see the actual data
      const enquiry = doc.data();
      const li = `
            <li class="list-group-item">
                <div class="row d-flex">
                    <div class="flex-column">
                        <p>Name: ${enquiry.Name} </p>
                        <p>Email: ${enquiry.Email} </p>
                        <p>Telephone: ${enquiry.Telephone} </p>
                    
                    </div>
                </div>
        </li>
      `;
      html += li;
    });
    enquiryList.innerHTML = html
  } else {
    enquiryList.innerHTML = '<h5 class="center-align">No Data could be found from the DB as yet</h5>';
  }
};
