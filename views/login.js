const register = document.getElementById('register');
const login = document.getElementById('login');
const username = document.getElementById('username');
const password = document.getElementById('password');


register.addEventListener('click', ()=>{
    window.location.href="./register.html"
})

login.addEventListener('click',async (e)=>{
    e.preventDefault();
    const object = {
        email :username.value,
        password: password.value
    }
    try{
        const loginTo = await axios.post('http://localhost:3000/user/login', object);
        console.log(loginTo);
    }
    catch(err){
        alert()
    }
})