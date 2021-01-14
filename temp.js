document.querySelector('#create_new_user').onsubmit = () => {

    const Username = (document.querySelector('#username').value).trim();

    if (Username !== '') {
        if (!users.includes(Username)) {
            users.append(Username);
        }

        else {
            alert(`${Username} already exists!`);
        }
    }

    document.querySelector('#username').value = '';

    return false;
};

const request = new XMLHttpRequest();
request.open('GET', `/${channel}`);

request.onload = () => {
    const response = request.responseText;;
    document.querySelector('#channel')