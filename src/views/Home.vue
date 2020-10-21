<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <Myapp />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Myapp from "../components/myApp.vue";
export default {
    name: "Home",
    components: {
        HelloWorld,
        Myapp
    }
};
</script>
