
<template>
    <main-layout>
        <div class="card" style="width: 20rem;">
            <img class="card-img-top" src="images/login.png" alt="Card image cap">
            <div class="card-body">
                <p>
                    Please submit your assigned username and we will send you an email with instructions on how to reset your password.
                </p>
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" placeholder="Enter username" />
                    <small id="loginHelp" class="form-text text-muted">(Your username will be your 5 + 2)</small>
                </div>
                <a href="#" class="btn btn-primary">Submit</a>
            </div>
        </div>
    </main-layout>
</template>

<script>
    import MainLayout from '../layouts/Main.vue'

    export default {
        components: {
            MainLayout
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