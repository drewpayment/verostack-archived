<template>
    <div>
        <div class="d-flex justify-content-center p-2">
            <div class="card m-5">
                <div class="card-body">
                    <h4 class="card-title">New Client</h4>
                    <div class="card-text">
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
                        <button type="button" class="btn btn-primary" @click="saveClient"><i class="fa fa-save"></i> Update</button>
                        <button type="button" class="btn btn-default" @click="resetForm"><i class="fa fa-ban"></i> Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import service from '../common-service'

    export default {

        data() {
            return {
                client: {
                    name: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    phone: '',
                    taxId: ''
                }
            }
        },

        computed: Object.assign({},
            // vuex getters
            mapGetters({
                user: 'currentUser'
            }),
            {
                // normal computed props
            }
        ),

        mounted() {
        },

        methods: {

            saveClient() {
                console.dir(this.client);
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
                    this.client = {
                        name: '',
                        street: '',
                        city: '',
                        state: '',
                        zip: '',
                        phone: '',
                        taxId: ''
                    }
                })
            }

        }

    }
</script>

<style scoped>

</style>