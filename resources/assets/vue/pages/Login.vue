
<template>
    <div>
        <div class="d-flex justify-content-center p-5">
            <div v-if="!hideLogin">
                <div v-if="!loading" class="card" style="width: 20rem;">
                    <img class="card-img-top" src="images/login.png" alt="Card image cap">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" class="form-control" id="username" v-model="username" placeholder="Enter username" />
                            <small id="loginHelp" class="form-text text-muted">(First time? Your username will be your 5 + 2)</small>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" id="password" v-model="password" placeholder="Enter password" />
                            <small class="form-text text-muted">
                                <router-link to="/reset" class="nav-link">Need help signing in?</router-link>
                            </small>
                        </div>
                        <a href="#" class="btn btn-primary" @click="attemptLogin">Login</a>
                    </div>
                </div>
            </div>
            <div v-if="loading">
                <div class="card" style="width: 20rem;">
                    <div class="card-body text-center">
                        <div class="card-title">
                            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
                        </div>
                        <div class="card-text">
                            <h3>Logging in...</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '../store'
    import axios from 'axios'
    import apiService from '../common-service'
    import _ from 'lodash'

    export default {
        data() {
            return {
                // attribute that hides the login card box when the user attempts login
                loading: false,
                // hide login card box when the user successfully authenticates
                hideLogin: false,
                username: '',
                password: '',
                user: ''
            }
        },

        components: {
        },

        computed: {
            token: function() {
                return store.getters.token;
            }
        },

        methods: {

            attemptLogin() {
                this.loading = true;

                apiService.authenticate(username.value, password.value, this.afterSuccess);
            },

            afterSuccess(response) {
                this.hideLogin = true;
                axios.defaults.headers.common[response.data.token_type] = response.data.access_token;

                store.dispatch('SET_AUTH_RESULT', response.data)
                    .then(() => {
                        if(this.token) {
                            store.dispatch('SET_AUTHORIZED_BOOL');

                            /**
                             * Get current user once we know they are authenticated and store
                             * in vuex for use.
                             */
                            apiService.getUserInfo(this.username).then((user) => {
                                // store user object in vuex store
                                store.dispatch('SET_USER_OBJECT', user).then(() => {
                                    this.$nextTick(() => {
                                        this.user = store.getters.currentUser;

                                        // route user to the appropriate dashboard based on their level
                                        // of authentication
                                        if(!_.isEmpty(this.user)){
                                            if(this.user.role != null && this.user.role.role > apiService.userRoles.companyAdmin) {
                                                // send user to admin dashboard
                                                this.$router.push('sys-admin-dashboard');
                                            } else if (this.user.role.role === apiService.userRoles.companyAdmin) {
                                                // page('/admin-dashboard');
                                                this.$router.push('admin-dashboard');
                                            } else {
                                                // where we redirect the user after successfully logging into the application.
                                                // page('/my-dashboard');
                                                this.$router.push('my-dashboard');
                                            }
                                        }
                                        this.loading = false;
                                    });
                                });

                            });
                        }
                    });

            }
        }

    }
</script>

<style scoped>
    .card {
        margin: 5rem 0 0 0;
    }

    .card-img-top {
        margin: auto;
        width: 50%;
        padding: 10px 5px 0 5px;
    }
</style>