
// Sign-In auth meethod
const signin = async (user) => {
    try {
        let response = await fetch('http://localhost:5000/auth/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'omit', // include default
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

// Sign-out auth method
const signout = async () => {
    try {
        let response = await fetch('http://localhost:5000/auth/signout', {
            method: 'GET'
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

export { signin, signout }