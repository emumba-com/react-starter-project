export default {
    name: 'production',
    mysql: {
        username: 'root',
        password: '',
        multiStatement: false,
        dbName: 'react-starter',
        host: 'localhost',
        enableLogging: false
    },
    app: {
        host: 'localhost'
    }
}
