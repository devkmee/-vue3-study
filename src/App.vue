<template>
    <input 
           type="text" 
           v-model="name"
     />
    <button
           class="btn btn-primary" 
           @click="onSubmit"
     >Click
    </button>
</template>                         

<script>

    //import { reactive } from 'vue'; // 객체
    import { ref } from 'vue';    // 원시타입

    export default {
        setup() {
            const name = ref('HOME');

            const onSubmit = () => {
                console.log(name.value);
            };

            return {
                 name
                , onSubmit
            };
        }
    }
</script>

<style>
    .name {
        color: dodgerblue;
    }
</style>
