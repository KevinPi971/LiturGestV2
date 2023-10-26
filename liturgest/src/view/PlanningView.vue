<template>
    <div>
      
    </div>
  </template>
  
  <script>
  export default {
    name: "PlanningView",
    data(){
      return {
        dateFocused: new Date()
      }
    },
    methods:{
      changeDate(){
        console.log(this.dateFocused)
      }
    }
  }
  </script>
  
  <style>
  
  </style>