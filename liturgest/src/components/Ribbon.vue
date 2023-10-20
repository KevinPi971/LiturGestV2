<template>
    <div id="ribbonContainer">
        <h1 id="appTitle">LiturGest</h1>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <router-link to="/"><el-menu-item index="home">Accueil</el-menu-item></router-link>
            <router-link to="/planning"><el-menu-item index="planning">Planning</el-menu-item></router-link>
            <router-link to="/profile"><el-menu-item index="profile">Profil</el-menu-item></router-link>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "RibbonNav",
    model:{
        prop : "activeIndex",
        event: "select"
    },
    props:{
        activeIndex : {
            type:String
        },
    },
    data(){
        return {
        }
    },
    methods:{
        handleSelect (key) {
            this.$emit("select", key);
        }
    }
    
}
</script>

<style>
#appTitle{
    text-align: left;
}
</style>