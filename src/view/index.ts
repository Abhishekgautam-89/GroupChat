const signup = document.getElementById('signup') as HTMLButtonElement ;
const fullName = document.getElementById('name') as HTMLInputElement ;
const phonenumber = document.getElementById('phonenumber') as HTMLInputElement ;
const email = document.getElementById('email') as HTMLInputElement ;
const password = document.getElementById('password') as HTMLInputElement ;
const rePassword = document.getElementById('re-password') as HTMLInputElement ;
// const signup = document.querySelectorAll('button') !;

signup.addEventListener('click', async (e)=>{
    e.preventDefault();
   const name = fullName.value;
   const number = phonenumber.value;
   const emailId = email.value;
   const password1 = password.value;
   const password2 = rePassword.value;

   const object = {
    name: name,
    number: number,
    email: emailId,
    password: password1
   }
    try{
        if(password1===password2){
            console.log("registered");
        }
        else {throw ("Password Mis-match")}
    }
    catch(err){
        console.log(err)
        alert(err)
    }
})