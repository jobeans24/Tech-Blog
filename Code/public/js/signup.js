const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // Save account information to JSON file
            const accountData = { username, password };
            const json = JSON.stringify(accountData);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'account.json';
            a.click();

            // Log in the user
            document.location.replace('/');
        } else {
            alert('Failed to sign up');
        }
    } else {
        alert('Please enter a valid username and password');
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);
    