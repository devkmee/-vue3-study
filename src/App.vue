<template>
    <!--네비게이션-->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">devKmee</a>

        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Todos <span class="sr-only">(current)</span></a>
            </li>
        </ul>
    </nav>

    <!--라우터-->
    <router-view/>
</template>                    

<script>
    export default {
        
    }
</script>

<style>
</style>
