<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>{{ event.title }}</span>
            </div>
        </template>
    </el-card>
</template>

<script>
import Event from "../assets/Event"
export default {
    name:"EventCard",
    components:{
    },
    props:{
        event:{
            type: Event
        }
    },
    data(){
        return {
        }
    },
    methods:{
    }
}
</script>

<style>
.box-card{
    
}
</style>