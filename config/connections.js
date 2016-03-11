module.exports.connections = {
    disk: {
        module: 'sails-disk'
    },
    postgresql: {
        user: 'postgres',
        password: 'tamran@1101681',
        database: 'postgres',
        dialect: 'postgres',
        options: {
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            logging: true
        }
    },
};
