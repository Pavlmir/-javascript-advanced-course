"use strict";

Vue.component('error', {
    props: ['visibility'],

    data() {
        return {
            errorStr: 'Ошибка сервера!',
        }
    },

    template: `<div class="error" v-show="visibility">{{errorStr}}</div>`,

    mounted() {
        console.log('error', this);
    }
})

