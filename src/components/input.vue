<template>
    <div class="form-group">
        <label>{{  label }}</label>
        <input 
            :value="subject"
            @input="onInput"
            type="text" 
            class="form-control"
        >
        <div v-if="subjectError" class="text-red"> 
            {{ error }}
        </div>
    </div>
</template>

<script>

export default {
    props: {
        label: {
            type: String,
            required: true
        },
        error: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        }
    },
    setup(props, { emit }){
        const onInput = (event) => {
            //컴포넌트에 올릴 이름 update:props속성이름
            emit('update:subject', event.target.value)
        }

        return{
            onInput
        }
    }
}
</script>

<style scoped>
  .text-red {
    color: red;
  }
</style>