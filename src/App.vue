<template>
    <div class="name">
        <h1>{{ name }}</h1>
    </div>
    <button class="btn btn-primary" v-on:click="updateName">Click</button>
</template>

<script>

    //import { ref } from 'vue';    // 원시타입
    import { reactive } from 'vue'; // 객체

    export default {
        setup() {
            //const name = ref('HONE');
            const name = reactive({
                id : 'user11'
            });

            const updateName = () => {
                //name.value = 'Dodam';     // ref 사용
                name.id = 'userRabbit';     // reactive 사용
                console.log(name);
            };

            return {
                name,
                updateName,
            };
        }
    }
</script>

<style>
    .name{
        color : sienna
    }
</style>
