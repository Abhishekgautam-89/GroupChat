// const { Json } = require("sequelize/types/utils");

// const { json } = require("body-parser");

const nameInitials = document.getElementById('nameInitials');
const email = document.getElementById('email');
const logout = document.getElementById('logout');
const sendInput = document.getElementById('sendMessage')
const sentInput = document.getElementById('sentMessage')
const receiveMessage = document.getElementById('incomingMessage')


window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    const tokenValue = parseJwt(token);
    // console.log(tokenValue)
    nameInitials.innerText = tokenValue.name
    email.innerText = tokenValue.email
    loadMessage()
    // getNewMessages()
})

sendInput.addEventListener('keypress', async (e) => {
    if (e.key == "Enter") {
        try {
            const token = localStorage.getItem('token')
            // console.log(token);
            const sendMsg = sendInput.value;
            const obj = {
                Message: sendMsg
            }
            const msg = await axios.post(`http://localhost:3000/message/new`, obj, {
                headers: { Authorization: token }
            })
            // console.log(msg)
            displayOnScreen(sendMsg, null)
            sendInput.value = "";
            // console.log('send')
        }
        catch (err) {
            console.log(err);
        }

    }


})

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = './login.html'
    // console.log('clicked')
})

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function displayOnScreen(outMessage, inMessage) {
    // console.log(outMessage)
    if (outMessage != null) {
        const sendDiv = document.createElement('div');
        sendDiv.innerText = outMessage
        sendDiv.classList = "mr-2 py-3 px-4 block bg-blue-400 w-[50%] break-words float-right rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
        sentInput.appendChild(sendDiv);
    }
    if (inMessage != null) {
        const getDiv = document.createElement('div');
        getDiv.innerText = inMessage
        getDiv.classList = "ml-2 py-3 block px-4 bg-gray-400 w-[50%] break-words float-left rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
        sentInput.appendChild(getDiv);

    }

}

const loadMessage = async () => {
    const token = localStorage.getItem('token');
    const tokenValue = parseJwt(token);
    // localStorage.removeItem('messages')
    const localMessage = localStorage.getItem('messages');
    // console.log("Localstorage", localMessage);
    if (localMessage === null) {

        const messages = await axios.get('http://localhost:3000/message/get', { headers: { Authorization: token } })
        // console.log(messages.data.message);
        const listOfMessages = messages.data.message
        const sliceMessage = listOfMessages.slice(listOfMessages.length - 10, listOfMessages.length)
        console.log("loadmessage", JSON.stringify(sliceMessage))
        if (listOfMessages.length > 0) {
            localStorage.setItem("messages", JSON.stringify(sliceMessage))
        }

        for (let i = 0; i < sliceMessage.length; i++) {
            const userDetails = sliceMessage[i].user
            const message = sliceMessage[i].Message

            if (tokenValue.id === userDetails.Sr_no) {
                displayOnScreen(message, null)
                // console.log(true)
            }
            else {
                displayOnScreen(null, message)
            }

        }
    }
    else {
        getNewMessages(token);
        const fetchedMessage = JSON.parse(localStorage.getItem('messages'))
        console.log("after adding>>", fetchedMessage)
        for (let i = 0; i < fetchedMessage.length; i++) {
            const userDetails = fetchedMessage[i].user
            const message = fetchedMessage[i].Message

            if (tokenValue.id === userDetails.Sr_no) {
                displayOnScreen(message, null)
                // console.log(true)
            }
            else {
                displayOnScreen(null, message)
            }

        }
    }


}

const getNewMessages = async (token) => {
    const message = JSON.parse(localStorage.getItem('messages'));
    // console.log("messagein getnewmessages", message[0].Sr_no)
    const msgID = (message[message.length - 1].Sr_no) || 0;
    // console.log(msgID)
    const messages = await axios.get(`http://localhost:3000/message/get?msgId=${msgID}`, { headers: { Authorization: token } })
    console.log("getNewMessages>>", messages)
    const updatedMessages = message.concat(messages.data.message)
    const slicedMessage = updatedMessages.slice(updatedMessages.length - 10, updatedMessages.length)
    // localStorage.removeItem("messages")
    localStorage.setItem("messages", JSON.stringify(slicedMessage))
    console.log("updatedMessages>>", slicedMessage)
    // console.log("msgId>",msgID);
}

// setInterval(() => {
//     while (sentInput.hasChildNodes())
//         sentInput.removeChild(sentInput.firstChild)
//     loadMessage()
// }, 3000)