
const domain = 'https://localhost:7257'

const authheaders = {
        "Authorization": 'bearer '+window.localStorage.getItem('token'),
        "Accept": 'application/json',
        "Content-Type": "application/json"
    }

export {authheaders};
export {domain};
export default domain;


