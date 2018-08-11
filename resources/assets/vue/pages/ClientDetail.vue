<template>
    <div>
        <!--<div class="d-flex justify-content-center p-2">-->
        <b-alert class="m-2" :show="showMessage" dismissible :variant="messageType">{{messageContent}}</b-alert>
        <div class="card-deck m-5" :class="{ 'card-deck': true, 'm-5': true, 'd-flex justify-content-center': singleCardWidth }">
            <div :class="{ card: true, 'col-6': singleCardWidth }">
                <div class="card-body">
                    <div class="card-text" v-if="loading">
                        Loading...
                    </div>
                    <div class="card-text" v-if="error">
                        {{ error }}
                    </div>
                    <h4 class="card-title" v-if="client">
                        {{client.name}}
                        <small class="text-muted float-right pl-2 pt-2" @click="handleShowUsers"><span v-html="showUsersLabel"></span></small>
                    </h4>
                    <div class="card-text" v-if="client">
                        <div class="form-group">
                            <label for="name">Client Name</label>
                            <input type="text" class="form-control" id="name" v-model="client.name" />
                            <small class="form-text text-muted">This should not be edited unless absolutely necessary and must match Tax ID on file.</small>
                        </div>
                        <div class="form-group">
                            <label for="street">Street</label>
                            <input type="text" class="form-control" id="street" v-model="client.street" />
                        </div>
                        <div class="form-group">
                            <label for="city">City</label>
                            <input type="text" class="form-control" id="city" v-model="client.city" />
                        </div>
                        <div class="form-group">
                            <label for="state">State</label>
                            <input type="text" class="form-control" id="state" v-model="client.state" />
                        </div>
                        <div class="form-group">
                            <label for="zip">Zip</label>
                            <input type="text" class="form-control" id="zip" v-model="client.zip" />
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="text" class="form-control" id="phone" v-model="client.phone" />
                        </div>
                        <div class="form-group">
                            <label for="taxId">Tax ID</label>
                            <input type="text" class="form-control" id="taxId" v-model="client.taxId" />
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="checkbox" v-model="client.active" />
                                    Active
                                </label>
                            </div>
                        </div>
                        <button type="button" class="btn btn-primary" @click="saveClient"><i class="fa fa-save"></i> Update</button>
                        <button type="button" class="btn btn-default" @click="resetForm"><i class="fa fa-ban"></i> Reset</button>
                    </div>
                </div>
            </div>
            <!--SHOW LIST OF USERS THAT HAVE ACCESS TO THIS CLIENT-->
            <div class="card" v-if="showUsers">
                <div class="card-body">
                    <h4 class="card-title">
                        <i class="fa fa-users"></i> Users
                        <small class="float-right" v-if="!showNewUserForm">
                            <a href="#" class="text-muted" @click="handleShowNewUserForm"><i class="fa fa-plus-square-o"></i> Add</a>
                        </small>
                    </h4>
                    <div class="card-text">
                        <div class="list-group">
                            <div
                                    v-for="(clientUser, key, index) in clientUsers"
                                    class="list-group-item list-group-item-action flex-column align-items-start"
                                    :class="{
                                        'list-group-item': true,
                                        'list-group-item-action': true,
                                        'flex-column': true,
                                        'align-items-start': true,
                                        'bg-primary': hasPlus[index],
                                        'text-white': hasPlus[index]
                                    }"
                            >
                                <a href="#" :class="{ 'text-muted': !hasPlus[index], 'text-white': hasPlus[index] }" @click="handleShowUserDetail(clientUser, index)">
                                    <div class="d-flex w-100 justify-content-between">
                                        <h5 class="w-100 mb-1 ml-2 mr-2">
                                            {{clientUser.firstName}} {{clientUser.lastName}}
                                            <small
                                                    :class="{
                                                        'float-right': true,
                                                        'mt-1': true,
                                                        'ml-2': true,
                                                        'text-muted': !hasPlus[index],
                                                        'text-white': hasPlus[index]
                                                    }"
                                            >
                                                <i :class="{
                                                    'fa': true,
                                                    'fa-caret-square-o-right': !hasPlus[index],
                                                    'fa-caret-square-o-left': hasPlus[index]
                                                }"></i>
                                            </small>
                                        </h5>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--SHOW USER DETAIL-->
            <div class="card" v-if="showUserDetail">
                <div class="card-body">
                    <h4 class="card-title">
                        <i class="fa fa-user"></i> {{detailUser.firstName}} {{detailUser.lastName}}
                    </h4>
                    <div class="form-group-sm">
                        <label for="username">Username</label>
                        <input type="text" readonly class="form-control" id="username" v-model="detailUser.username" />
                    </div>
                    <div class="form-group-sm">
                        <label for="email">Email</label>
                        <input type="text" readonly class="form-control" id="email" v-model="detailUser.email" />
                    </div>
                    <div class="form-group pt-3">
                        <button type="button" class="btn btn-default" @click="hideUserDetail">Close</button>
                        <router-link
                                class="btn btn-primary float-right"
                                :to="{ name: 'userDetail', params: { userId: detailUser.id } }"
                        >Edit</router-link>
                    </div>
                </div>
            </div>
            <!--ADD NEW USER-->
            <div class="card" v-if="showNewUserForm">
                <div class="card-body">
                    <h4 class="card-title">
                        <i class="fa fa-user"></i> New User
                    </h4>
                    <div class="form-group-sm">
                        <label for="firstName">First Name</label>
                        <input type="text" class="form-control" id="firstName" v-model="newUser.firstName" />
                    </div>
                    <div class="form-group-sm">
                        <label for="lastName">Last Name</label>
                        <input type="text" class="form-control" id="lastName" v-model="newUser.lastName" />
                    </div>
                    <div class="form-group-sm">
                        <label for="newUserUsername">Username</label>
                        <input type="text" class="form-control" id="newUserUsername" v-model="newUser.username" />
                    </div>
                    <div class="form-group-sm">
                        <label for="newUserEmail">Email</label>
                        <input type="email" class="form-control" id="newUserEmail" v-model="newUser.email" />
                    </div>
                    <div class="form-group pt-3">
                        <button type="button" class="btn btn-default float-left" @click="cancelNewUser">Cancel</button>
                        <button type="button" class="btn btn-primary float-right" @click="saveNewUser">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '../store'
    import { mapGetters } from 'vuex'
    import service from '../common-service'
    import _ from 'lodash'
    import BAlert from 'bootstrap-vue/es/components/alert/alert'

    export default {

        components: {
            BAlert
        },

        data() {
            return {
                loading: false,
                showUsers: false,
                showUserDetail: false,
                error: null,
                user: null,
                client: null,
                originalClient: null,
                clientUsers: {},
                showUsersLabel: '<a href="#" class="text-muted">Show Users <i class="fa fa-caret-right"></i></a>',
                detailUser: null,
                hasPlus: {},
                showNewUserForm: false,
                newUser: {
                    firstName: null,
                    lastName: null,
                    username: null,
                    email: null
                },
                showMessage: false,
                messageType: '',
                messageContent: ''
            }
        },

        computed: Object.assign({},
            mapGetters({
                storedUser: 'currentUser',
                getClientById: 'getClientById',
                storedClient: 'client'
            }),
            {
                clientId() {
                    return this.$route.params.clientId;
                },
                singleCardWidth() {
                    let result = true;
                    if(this.showUsers) {
                        result = false;
                    } else if (this.showUserDetail) {
                        result = false;
                    } else if (this.showNewUserForm) {
                        result = false;
                    }
                    return result;
                }
            }
        ),

        created() {
            this.loading = true;
        },

        mounted() {
            const _this = this;
            this.getUser().then(() => _this.fetchData())
        },

        methods: {

            fetchData() {
                this.client = this.getClientById(this.clientId);

                if(!_.isEmpty(this.client)) {
                    store.dispatch('SET_CURRENT_CLIENT', this.client).then(() => {
                        this.originalClient = Object.assign({}, this.client);
                        this.loading = false;
                    });
                } else {
                    this.client = this.storedClient;
                    this.originalClient = Object.assign({}, this.client);
                    this.loading = false;
                }
            },

            getUser() {
                return new Promise((resolve, reject) => {
                    if(!_.isEmpty(this.storedUser)) {
                        this.user = this.storedUser;
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            },

            saveClient() {
                /**
                 * NEED TO BUILD NOTIFICATION SERVICE THAT WE CAN TAP INTO
                 */
                service.saveClient(this.client)
                    .then(data => {
                        console.dir(data);
                    })
                    .catch(err => console.dir(err));
            },

            resetForm() {
                this.$nextTick(() => {
                    this.client = this.originalClient;
                })
            },

            /**
             * We need to set these values back to their original states, because
             * if the user closes the users list before closing the last card
             * there values are not reset automatically.
             */
            resetCardElements() {
                return new Promise(
                    (resolve, reject) => {
                        this.showUserDetail = false;

                        for (const [key, value] of Object.entries(this.hasPlus)) {
                            this.hasPlus[key] = false;
                        }

                        this.showNewUserForm = false;
                        resolve();
                    }
                );
            },

            cancelNewUser() {
                this.showNewUserForm = false;
                for(let key in this.newUser) {
                    if(this.newUser.hasOwnProperty(key))
                        this.newUser[key] = null;
                }
            },

            handleShowUsers() {
                if(this.showUsers) {
                    this.showUsersLabel = '<a href="#" class="text-muted">Show Users <i class="fa fa-caret-right"></i></a>';
                    this.showUsers = !this.showUsers;

                    this.resetCardElements();
                } else {
                    // while getting data from server we show the user an animated cog
                    // icon so that they have some indication that the page is still doing something.
                    this.showUsersLabel = '<i class="fa fa-cog fa-spin fa-fw"></i>';

                    this.getUsers();
                }
            },

            handleShowUserDetail(user, idx) {
                this.resetCardElements();

                this.hasPlus[idx] = !this.hasPlus[idx];
                this.detailUser = user;
                this.showUserDetail = !this.showUserDetail;
            },

            hideUserDetail() {
                this.resetCardElements();
            },

            handleShowNewUserForm() {
                if(this.showUserDetail) {
                    this.showUserDetail = !this.showUserDetail;
                    for (const [key, value] of Object.entries(this.hasPlus)) {
                        this.hasPlus[key] = false;
                    }
                }
                this.showNewUserForm = !this.showNewUserForm;
            },

            saveNewUser() {
                service.registerNewUserRelatedClient(this.newUser, this.client.clientId)
                    .then(data => {
                        // set message information
                        this.messageContent = 'Awesome, your user has been registered. Please make sure to update their role if need be.';
                        this.messageType = 'primary';
                        this.showMessage = true;

                        // clear the form and close the new user form
                        for (const [key, value] of Object.entries(this.newUser)) {
                            this.newUser[key] = '';
                        }
                        this.handleShowNewUserForm();
                        this.handleShowUsers();
                    })
                    .catch(err => console.dir(err));
            },

            getUsers() {
                // get users and save them to clientUsers object
                service.getUsersByClient(this.client.clientId)
                    .then(data => {
                        for(let i = 0; i < data.length; i++) {
                            this.clientUsers[i] = data[i];
                            this.hasPlus[i] = false;
                        }

                        this.showUsers = !this.showUsers;
                        this.showUsersLabel = '<a href="#" class="text-muted">Hide Users <i class="fa fa-caret-left"></i></a>';
                    })
                    .catch(err => console.dir(err));
            }

        }

    }
</script>

<style scoped>

</style>