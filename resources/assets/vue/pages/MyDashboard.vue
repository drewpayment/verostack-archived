
<template>
    <main-layout>
        <h3>Here is the dashboard page.</h3>
    </main-layout>
</template>

<script>
    import { store } from '../store'
    import MainLayout from '../layouts/Main'
    import service from '../common-service'
    import _ from 'lodash'

    export default {

        data() {
            return {
                client: '',
                user: ''
            }
        },

        components: {
            MainLayout
        },

        created() {

            // set the user to use on this page as our session user
            this.user = store.getters.currentUser;

            // set current client
            service.getClientByUser(this.user.id)
                .then(client => {
                    // if we don't find a client, this means that the user doesn't have one
                    // assigned and they shouldn't actually be logged in.
                    if(_.isEmpty(client)){
                        this.$router.push('/');

                    // set the page's client object to the returned client from api
                    } else {
                        this.client = client;
                    }
                })
                // if we get an error, print to the console for now and redirect the user to the
                // home page.
                .catch(error => {
                    // console.dir(error);

                    // we should do this when we go to production
                    // service.handleLogout();
                });
        }

    }
</script>