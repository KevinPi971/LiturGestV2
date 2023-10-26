<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{ dateInMonth }}</span>
            </div>
        </template>
        <div v-for="event in events" :key="event" class="text item">
            <EventCard
                :event="event"
            />
        </div>
    </el-card>
</template>

<script>
import EventCard from "./EventCard.vue"
import Event from "../assets/Event"
export default {
    name:"CalenderCard",
    components:{
        EventCard
    },
    props:{
        dateInMonth : {
            type:Number
        }
    },
    data(){
        return {
            events : []
        }
    }
}
</script>

<style>

</style>