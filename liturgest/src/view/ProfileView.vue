<template>
    <div>
      <el-form :model="form">
        <el-form-item label="Nom">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="Prénom">
          <el-input v-model="form.firstname" />
        </el-form-item>
        <el-form-item label="Téléphone">
          <el-input v-model="form.phoneNumber" />
        </el-form-item>
        <el-form-item label="Mail">
          <el-input v-model="form.mail" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Enregistrer</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>

  export default {
    name: "ProfileView",
    data(){
      return {
        form: {}
      }
    },
    methods:{
      onSubmit(){
        /** TODO */
        console.log(this.form);
      }
    },
    beforeMount(){
      this.form = {
        name:"",
        firstname:"",
        phoneNumber:"",
        mail:""
      }
    }
  }
  </script>
  
  <style>
  
  </style>