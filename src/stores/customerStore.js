import {defineStore} from 'pinia';
import { useLocalStorage } from '@vueuse/core';
export const useCustomerStore = defineStore('customer', {
    state: () => ({
        loggedIn: useLocalStorage('loggedIn', false),
        username: useLocalStorage('username', ''),
        password: useLocalStorage('password', ''),
        firstName: useLocalStorage('firstName', ''),
        lastName: useLocalStorage('lastName', ''),
        phoneNumber: useLocalStorage('phoneNumber', ''),
        address: useLocalStorage('address', ''),
        email: useLocalStorage('email', '')
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