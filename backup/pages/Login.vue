
<template>
    <main-layout>
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" src="images/login.png" alt="Card image cap">
            <div class="card-body">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter username" />
                    <small id="loginHelp" class="form-text text-muted">(First time? Your username will be your 5 + 2)</small>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" placeholder="Enter password" />
                    <small class="form-text text-muted">
                        <v-link href="/reset" class="nav-link">Need help signing in?</v-link>
                    </small>
                </div>
                <a href="#" class="btn btn-primary">Login</a>
            </div>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'
    import VLink from '../components/VLink.vue'

    export default {
        components: {
            MainLayout,
            VLink
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