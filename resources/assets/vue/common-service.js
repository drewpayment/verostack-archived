import {router} from './router'
import axios from 'axios'
import * as Store from './store'

const store = new Store;

const service = {

    client: {
        name: null,
        street: null,
        city: null,
        state: null,
        zip: null,
        phone: null,
        taxId: null,
        modifiedBy: null,
        deletedAt: null,
        createdAt: null,
        updatedAt: null
    },

    userRoles: {
        user: 1,
        supervisor: 2,
        manager: 3,
        regionalManager: 4,
        humanResources: 5,
        companyAdmin: 6,
        systemAdmin: 7
    },

    authenticate: (user, pass, cb) => {
        /**
         * HOW DO I SECURE THIS?
         */
        axios.post('/oauth/token', {
            grant_type: 'password',
            client_id: 3,
            client_secret: 'qHZzQxduSU92Vgb0hBwLcx4W4jjKWf5lykM0bxnm',
            username: user,
            password: pass,
            scope: ''
        }).then(response => {

            if (typeof cb === 'function') cb(response);

        });
    },

    /**
     * Logout service
     */
    handleLogout: () => store.dispatch('SET_LOGOUT').then(() => {
        router.push('/');
    }),

    /**
     * Get user information from the API, the headers should already
     * be set after the user has been logged in.
     *
     * @param username
     */
    getUserInfo: (username) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/users/' + username)
                    .then((response) => {
                        resolve(response.data);
                    }).catch((error) => {
                    reject(error.response);
                });
            }
        )
    },

    /**
     * Find a list of clients by the user's name.
     *
     * @param userId
     * @returns {Promise<any>}
     */
    getClientByUser: (userId) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/clients/users/' + userId)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error.response);
                    });
            }
        )
    },

    /**
     * Returns one client by the client id.
     *
     * @param id
     * @returns {Promise<any>}
     */
    getClientById: (id) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/clients/' + id)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    },

    /**
     * Save client, if there isn't a client in the DB we will save
     * a new client for the user.
     *
     * @param client
     * @returns {Promise<any>}
     */
    saveClient: (client) => {

        client.modifiedBy = store.getters.currentUser.id;
        client.clientId = (client.clientId === undefined) ? -1 : client.clientId;
        client.active = (client.active === undefined) ? true : client.active;

        return new Promise(
            (resolve, reject) => {
                axios.post('/api/clients/' + client.clientId, client)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    },

    /**
     * Save user
     *
     * @param user
     * @returns {Promise<any>}
     */
    saveUser: (user) => {
        user.active = true;
        user.username = user.lastName.substring(0, 4) + user.firstName.substring(0, 1);

        return new Promise(
            (resolve, reject) => {
                axios.post('/api/users/' + user.id, user)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    },

    /**
     * Get a list of users that are related to the client.
     *
     * @param id
     * @returns {Promise<any>}
     */
    getUsersByClient: (id) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/users/clients/' + id)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    },

    /**
     * Register a new user from admin client dashboard
     *
     * @param user
     * @param clientId
     * @returns {Promise<any>}
     */
    registerNewUserRelatedClient: (user, clientId) => {
        return new Promise(
            (resolve, reject) => {
                axios.post('/api/users/register',
                    {
                        user: user,
                        clientId: clientId
                    })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    },

    /**
     * Get users by the current logged in user's role.
     *
     * @param userId
     * @param roleId
     * @returns {Promise<any>}
     */
    getUsersByRole: (userId, roleId) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/users/' + userId + '/roles/' + roleId)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    },

    getUserById: (id) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/users/' + id)
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    })
            }
        )
    },

    setSelectedClient: (userId, clientId) => {
        return new Promise(
            (resolve, reject) => {
                axios.get('/api/users/' + userId + '/client-selector/' + clientId)
                    .then(response =>{
                        resolve(response.data);
                    })
                    .catch(err => {
                        reject(err.response);
                    });
            }
        )
    }

};

export default service;