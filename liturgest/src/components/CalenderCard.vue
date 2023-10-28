<template>
    <el-card :class="activeClassMng">
        <template #header>
            <div class="card-header">
                <span>{{ calDay.date.getDate() }}</span>
            </div>
        </template>
        <div v-for="event in calDay.events" :key="event" class="text-item">
            <EventCard
                :event="event"
            />
        </div>
    </el-card>
</template>

<script>
import EventCard from "./EventCard.vue"
//import Event from "../assets/Event"
import CalenderDay from "@/assets/CalenderDay";
export default {
    name:"CalenderCard",
    components:{
        EventCard
    },
    props:{
        calDay:{
            type:CalenderDay
        }
    },
    data(){
        return {
            events : [],
            activeClassMng:""
        }
    },
    beforeMount(){
        if(!this.calDay.isActive){
            this.activeClassMng = "disactive";
        }else{
            this.activeClassMng = "active";
        }
    },
    mounted(){
    },
    methods : {
    }
}
</script>

<style>
.disactive{
    background-color: lightgrey;
}
.card-header{
    
}
.text-item{
    display: inline-block;
}
</style>