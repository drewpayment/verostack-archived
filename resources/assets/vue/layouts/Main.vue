
<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary px-5 py-3 landing-navbar">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Verostack</a>

            <div class="collapse navbar-collapse" id="navbarToggle">
                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <router-link :to="{path:'/'}" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item" v-if="(!authorized)">
                        <router-link :to="{path:'/login'}" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="((authorized && user != null) && user.role.role < roles.companyAdmin)">
                        <router-link :to="{path:'/my-dashboard'}" class="nav-link">Dashboard</router-link>
                    </li>
                    <li class="nav-item" v-if="((authorized && user != null) && user.role.role === roles.companyAdmin)">
                        <router-link :to="{path:'/admin-dashboard'}" class="nav-link">Dashboard</router-link>
                    </li>
                    <li class="nav-item" v-if="((authorized && user != null) && user.role.role === roles.systemAdmin)">
                        <router-link :to="{path:'/sys-admin-dashboard'}" class="nav-link">Dashboard</router-link>
                    </li>
                </ul>
                <span class="navbar-text" v-if="(authorized && user != null)">
                    Hello, {{user.firstName}}. <small style="display:inline;"><a href="#" class="nav-link" style="display:inline;" @click="logout">logout</a></small>
                    <span class="py-2">
                        <span v-if="hasClient">Working as:</span>
                        <b-btn v-b-modal.client-selector size="sm" variant="default" v-if="!hasClient">Pick Client</b-btn>
                        <b-btn v-b-modal.client-selector size="sm" variant="default" v-if="hasClient">{{selectedClient.name}}</b-btn>
                    </span>
                </span>
            </div>
        </nav>
        <div id="mainContent">
            <slot></slot>
            <router-view></router-view>
        </div>
        <b-modal
                id="client-selector"
                title="Select a Client"
                size="sm"
                :ok-only="okOnly"
                ok-title="Change Client"
                :no-close-on-backdrop="staticBackdrop"
                :lazy="lazyLoad"
                @ok="changeClient(user.id, optionClient)"
        >
            <p class="font-weight-bold m-0">Current Client:</p>
            <p class="bg-info text-white rounded my-1 p-1" v-if="hasClient">{{selectedClient.name}}</p>
            <p>Pick a new client:</p>
            <b-form-select :options="availableClients" v-model="optionClient" />
        </b-modal>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import * as Vuex from 'vuex'
    import { mapGetters } from 'vuex'
    import Component from 'vue-class-component'
    import { Prop, Watch } from 'vue-property-decorator'
    import { createStore, State } from '../store'
    import { default as service } from '../common-service'

    import vBModal from 'bootstrap-vue/es/directives/modal/modal'
    import bBtn from 'bootstrap-vue/es/components/button/button'
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select'

    import roles from '../models/enums.model'
    import { User } from '../models/user.model'
    
    @Component({
        computed: mapGetters({                
            user: 'currentUser',
            authorized: 'isAuthorized'
        })
    })
    export default class MainLayout extends Vue {
        service: any;
        store: Vuex.Store<State>;
        user: any
        authorized: boolean

        constructor() {
            super();
            this.store = createStore();
            this.service = service;
        }

        okOnly: boolean = true;
        staticBackdrop: boolean = true;
        lazyLoad: boolean = true;
        hasClient: boolean = false;
        selectedClient: any = {};
        availableClients: any = [
            { text: '-- Select a Client --', value: null }
        ];
        optionClient: any = {};

        directives: {
            'b-modal': vBModal
        }

        components: {
            bBtn,
            bModal,
            bFormSelect
        }

        get roles(): roles {
            return service.userRoles;
        }

        created() {
            if (this.user != null && this.user.selectedClient) {
                this.hasClient = true;
                this.selectedClient = this.user.selectedClient;
                this.user.clients.forEach((obj) => {
                    if (obj.clientId !== this.selectedClient.client_id) {
                        this.availableClients.push({
                            text: obj.name,
                            value: obj.clientId
                        });
                    }
                });
            }
        }

        logout() {
            return service.handleLogout();
        }

        changeClient(userId: number, clientId: number) {
            return this.service.setSelectedClient(userId, clientId)
                    .then(user => {
                        this.user = user;

                        this.store.dispatch('SET_USER_OBJECT', user)
                            .then(() => {
                                this.user = this.store.getters.currentUser;

                                // router user to the appropriate dashboard based on their role
                                if(this.user.length) {
                                    if(this.user.role != null && this.user.role.role > this.service.userRoles.companyAdmin) {
                                        this.$router.push('sys-admin-dashboard');
                                    } else if (this.user.role.role > this.service.userRoles.humanResources) {
                                        this.$router.push('admin-dashboard');
                                    } else {
                                        this.$router.push('my-dashboard');
                                    }
                                }
                            })
                    })
        }
    }

</script>

<style scoped>
    .content {
        max-width: 600px;
        margin: 0 auto;
        padding: 15px 30px;
        background: #f9f7f5;
    }
</style>