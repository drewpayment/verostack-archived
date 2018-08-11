
<template>
    <div>
        <div class="d-flex flex-row p-5">
            <h1 class="display-4">Welcome, {{user.firstName}} {{user.lastName}}.</h1>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div id="sidebar" class="col-lg-2">
                    <div class="card">
                        <div class="card-body">
                            <div class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="i in 10">Link {{i}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="dash-content" class="col">
                    <div class="d-flex flex-row justify-content-start p-2">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">
                                    Active Clients
                                    <small class="float-right">
                                        <router-link
                                                :to="{ name: 'newClient' }"
                                                class="text-dark"
                                        >
                                            <i class="fa fa-plus-square-o"></i>
                                        </router-link>
                                    </small>
                                </h4>
                                <div class="card-text">
                                    <div class="list-group" v-if="clients.length">
                                        <router-link
                                                v-for="client in clients"
                                                :key="client.id"
                                                :to="{ name: 'clientDetail', params: { clientId: client.clientId} }"
                                                class="list-group-item list-group-item-action flex-column align-items-start"
                                        >
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{{client.name}}</h5>
                                                <small class="pl-5">Joined: {{formatDate(client.createdAt.date)}}</small>
                                            </div>
                                            <p class="mb-1 text-muted">Phone: {{client.phone}}</p>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex flex-row justify-content-start p-2">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">
                                    Users
                                    <small class="float-right">
                                        <router-link
                                                :to="{ name: 'newUser' }"
                                                class="text-dark"
                                        >
                                            <i class="fa fa-plus-square-o"></i>
                                        </router-link>
                                    </small>
                                </h4>
                                <div class="card-text" v-if="loadingUsers">
                                    <div class="text-center" style="width:332px;">
                                        <i class="fa fa-spin fa-cogs fa-fw fa-3x"></i>
                                    </div>
                                </div>
                                <div class="card-text" v-if="!loadingUsers">
                                    <div class="list-group" v-if="resultUsers.length">
                                        <router-link
                                                v-for="user in resultUsers"
                                                :key="user.id"
                                                :to="{ name: 'userDetail', params: { userId: user.id } }"
                                                class="list-group-item list-group-item-action flex-column align-items-start"
                                        >
                                            <div class="d-flex w-100 justify-content-between">
                                                <h5 class="mb-1">{{user.firstName}} {{user.lastName}}</h5>
                                                <small class="pl-5">Joined: {{formatDate(user.createdAt.date)}}</small>
                                            </div>
                                            <p></p>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { store } from '../store'
    import service from '../common-service'
    import _ from 'lodash'
    import { mapGetters } from 'vuex'
    import moment from 'moment'

    export default {

        data() {
            return {
                clients: '',
                resultUsers: [],
                loadingUsers: false
            }
        },

        computed: Object.assign({},
            // vuex computed getters
            mapGetters({
                user: 'currentUser'
            }),
            // normal computed properties
            {
                // add custom computed props here
            }
        ),

        components: {
        },

        methods: {
            formatDate(date) {
                return moment.parseZone(date).format('MMM YYYY');
            }
        },

        created() {
            // set clients to the user's list of clients
            this.clients = this.user.clients;
            this.loadingUsers = true;
            service.getUsersByRole(this.user.id, this.user.role.role)
                .then(data => {
                    this.loadingUsers = false;
                    this.resultUsers = data;
                })
                .catch(err => {
                    console.dir(err);
                });
        }

    }
</script>