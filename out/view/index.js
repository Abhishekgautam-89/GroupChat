"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const signup = document.getElementById('signup');
const fullName = document.getElementById('name');
const phonenumber = document.getElementById('phonenumber');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rePassword = document.getElementById('re-password');
// const signup = document.querySelectorAll('button') !;
signup.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
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
    };
    try {
        if (password1 === password2) {
            console.log("registered");
        }
        else {
            throw ("Password Mis-match");
        }
    }
    catch (err) {
        console.log(err);
        alert(err);
    }
}));
