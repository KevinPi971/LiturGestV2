<template>
    <el-button :color="event.color">
        {{ event.titleTypeEvt }}
    </el-button>
</template>

<script>
//import Event from "../assets/Event"
export default {
    name:"EventCard",
    components:{
    },
    props:{
        event:{
            type: Object
        }
    },
    data(){
        return {
        }
    },
    beforeMount(){
        console.log(this.event);
    },
    methods:{
    }
}
</script>

<style>
</style>