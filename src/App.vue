<template>
<!--<div v-on:class="nameClass"> 바인딩 할 때 v-on 생략 가능-->
    <div :class="nameClass">
        <h1>{{ name }}</h1>
    </div>
    <input :type="text" :value="name" />
    <button class="btn btn-primary" @click="updateName">Click</button>
</template>                         

<script>

    //import { reactive } from 'vue'; // 객체
    import { ref } from 'vue';    // 원시타입

    export default {
        setup() {
            /*const name = reactive({
            id : 'user11'
            });*/
            const name = ref('HOME');
            const type = ref('number');
            const nameClass = ref('');

            const updateName = () => {
                //name.id = 'userRabbit';     // reactive 사용
                name.value = 'Dodam';         // ref 사용
                type.value = 'text';
                nameClass.value = 'name';
            };

            return {
                name,
                updateName,
                type,
                nameClass
            };
        }
    }
</script>

<style>
    .name {
        color: dodgerblue;
    }
</style>
