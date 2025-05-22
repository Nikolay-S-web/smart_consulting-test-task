import './style.css';

document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value.toLowerCase();
    const userFamily = document.getElementById('userFamily').value.toLowerCase();
    const userPatronym = document.getElementById('userPatronym').value.toLowerCase();

    const userFullName = `${userName} ${userFamily} ${userPatronym}`;

    const userDateOfBirth = document.getElementById('userDateOfBirth').value;
    const userPhone = document.getElementById('userPhone').value;
    const password = document.getElementById('password').value;
    const identityDocument = {
        series: document.getElementById('documentIdentitySeries').value,
        number: document.getElementById('documentIdentityNumber').value,
        issueDate: document.getElementById('documentIssueDate').value,
    };
    const workInfo = {
        companyName: document.getElementById('workCompanyName').value,
        phone: document.getElementById('workPhone').value,
        address: document.getElementById('workAddress').value,
    };

    try {
        const response = await fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userFullName,
                userDateOfBirth,
                userPhone,
                password,
                identityDocument,
                workInfo,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.message) {
                alert(data.message);
                return;
            }
        } else {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.message}`);
        }
    } catch (error) {
        alert('Ошибка при регистрации');
    }
});

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const userFullName = document.getElementById('loginUserFullName').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userFullName, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Успешный вход! Здравствуйте ${data.userFullName}! \nВаш код авторизации: ${data.authKey}`);
        } else {
            const errorData = await response.json();
            alert(`Ошибка: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при авторизации');
    }
});
