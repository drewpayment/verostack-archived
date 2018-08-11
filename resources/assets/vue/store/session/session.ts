import { ActionContext, Store } from 'vuex'
import { getStoreAccessors } from 'vuex-typescript'
import { UserState } from './sessionState'
import { State as RootState } from '../state';
import _ from 'lodash'

type sessionContext = ActionContext<UserState, RootState>;

export const session = {
    namespaced: true,

    state: {
        user: {},
        authenticated: false
    },

    getters: {
        token: state => {
        
            // if(state.apiToken.length === 0) {
            //     state.apiToken = JSON.parse(window.localStorage.getItem('token'));
            // }

            return state.apiToken;
        },

        isAuthorized: state => {

            // let localAuth = JSON.parse(window.localStorage.getItem('isAuthorized'));
            // if(localAuth !== undefined) {
            //     state.isAuthorized = localAuth;
            // }

            return state.isAuthorized;
        },

        currentUser: state => {

            // if(_.isEmpty(state.user)) {
            //     state.user = JSON.parse(window.localStorage.getItem('user'));
            // }

            return state.user;
        },

        getClientById: state => id => {
            // if(_.isEmpty(state.user)){
            //     state.user = JSON.parse(window.localStorage.getItem('user'));
            // }

            return state.user.clients.find(c => c.clientId === id);
        },

        client: state => {
            // if(_.isEmpty(state.client)) {
            //     state.client = JSON.parse(window.localStorage.getItem('client'));
            // }

            return state.client;
        },

        getClients: state => {
            if (!_.isEmpty(state.user)) {
                return state.user.clients.map(clientId => state.user.clients[clientId]);
            }
            return null;
        }
    },

    mutations: {
        /**
         * Internal setter that stores API token result object
         * to the Vuex store.
         *
         * @param state
         * @param apiResult
         * @constructor
         */
        SET_AUTH_RESULT_MUTATION: (state, apiResult) => {
            state.apiToken = apiResult;
            // window.localStorage.setItem('token', JSON.stringify(apiResult));
        },

        SET_AUTHORIZED_BOOL_MUTATION: (state) => {
            if(state.apiToken !== undefined) {
                state.isAuthorized = true;
                // window.localStorage.setItem('isAuthorized', "true");
            }
        },

        SET_USER_OBJECT_MUTATION: (state, user) => {
            state.user = user;
            // let userJson = JSON.stringify(user);
            // window.localStorage.setItem('user', userJson);
        },

        SET_CURRENT_CLIENT_MUTATION: (state, client) => {
            state.client = client;
            let clientJson = JSON.stringify(client);
            // window.localStorage.setItem('client', clientJson);
        },

        LOG_OUT_MUTATION: (state) => {
            state.apiToken = {};
            state.isAuthorized = false;
            state.user = {};

            // window.localStorage.removeItem('user');
            // window.localStorage.removeItem('token');
            // window.localStorage.removeItem('isAuthorized');
        }
    },

    actions: {
        // add actions here
    }
};

const { commit, read, dispatch } = 
    getStoreAccessors<UserState, RootState>("session");

const getters = session.getters;

export const readToken = read(getters.token);
export const readIsAuthorized = read(getters.isAuthorized);
export const readUser = read(getters.currentUser);
export const readClient = read(getters.client);

const actions = session.actions;

// add action exports here

const mutations = session.mutations;

export const commitAuthResult = commit(mutations.SET_AUTH_RESULT_MUTATION);
export const commitAuthBool = commit(mutations.SET_AUTHORIZED_BOOL_MUTATION);
export const commitUser = commit(mutations.SET_USER_OBJECT_MUTATION);
export const commitClient = commit(mutations.SET_CURRENT_CLIENT_MUTATION);
export const commitClearSession = commit(mutations.LOG_OUT_MUTATION);

