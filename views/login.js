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
        if(loginTo.data.Message === "Login Successful"){
            document.cookie = `token=${loginTo.data.token}`
            localStorage.setItem('token', loginTo.data.token);
            alert(loginTo.data.Message)
            window.location.href="./main.html"
        }
    }
    catch(err){
        alert(err.response.data.message)
    }
})