import {defineStore} from 'pinia';
export const useCustomerStore = defineStore('customer', {
    state: () => ({
        loggedIn: false,
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        email: ''
    }),
    actions: {
        customerLogIn(customer) {
            this.username = customer.username;
            this.password = customer.password;
            this.firstName = customer.firstName;
            this.lastName = customer.lastName;
            this.phoneNumber = customer.phoneNumber;
            this.address = customer.address;
            this.email = customer.email;
            this.loggedIn = true;
        },
        customerLogOut() {
            this.username = '';
            this.password = '';
            this.firstName = '';
            this.lastName = '';
            this.phoneNumber = '';
            this.address = '';
            this.email = '';
            this.loggedIn = false;
        }
    }
})