const signup = document.getElementById('signup');
const fullName = document.getElementById('name');
const phonenumber = document.getElementById('phonenumber');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rePassword = document.getElementById('re-password');
const login = document.getElementById('login');
// const signup = document.querySelectorAll('button') !;

signup.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = fullName.value;
    const number = phonenumber.value;
    const emailId = email.value;
    const password1 = password.value;
    const password2 = rePassword.value;

    const object = {
        name: name,
        phone: number,
        email: emailId,
        password: password1
    }
    try {
        if (password1 === password2) {
            const newUser = await axios.post('http://localhost:3000/user/new', object)
            if (newUser.data.data.userStatus === true && newUser.data.data.message === "New-User Created") {
                window.location.href = './login.html'
            }
        }
        else { throw ("Password Mis-match") }
    }
    catch (err) {
        // console.log(err)
        alert(err.response.data.message)
    }
})

login.addEventListener('click',()=>{
    window.location.href = './login.html'
})