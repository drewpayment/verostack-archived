
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
                        <v-link href="/" class="nav-link">Home</v-link>
                    </li>
                    <li class="nav-item">
                        <v-link href="/login" class="nav-link">Login</v-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container">
            <div class="row justify-content-center">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    import VLink from '../components/VLink.vue'

    export default {
        components: {
            VLink
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