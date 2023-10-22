<template>
  <div>
    <el-button class="mt-4" style="width: 100%" @click="onAddUser" >
      Ajouter un utilisateur
    </el-button>
    <el-table :data="filterTableData" style="width: 100%">
        <el-table-column prop="name" label="Nom" width="180" />
        <el-table-column prop="firstname" label="Prénom" width="180" />
        <el-table-column prop="mail" label="Mail" width="180" />
        <el-table-column prop="phoneNumber" label="Téléphone" />
        <el-table-column fixed="right" label="Actions" width="180">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Rechercher" />
          </template>
          <template #default="scope">
            <el-button type="primary" size="small" @click="onEditUser(scope.row)">Editer</el-button>
            <el-button type="primary" size="small" @click="onRemoveUser(scope.row)">Supprimer</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import users from "../TestData/users.json"
export default {
  name:"UsersView",
  data(){
    return {
      users:[],
      search:""
    }
  },
  computed:{
    filterTableData(){
      const search = this.search;
      return this.users.filter(
        function (data) {
          return !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.firstname.toLowerCase().includes(search.toLowerCase())
        }
      )
    }
  },
  mounted(){
    this.users = users;
  },
  methods:{
    onEditUser(info){
      console.log("onEditUser");
      console.log(info);
    },
    onAddUser(){
      console.log("onAddUser");
    },
    onRemoveUser(){
      console.log("onRemoveUser");
    }
  }
}
</script>

<style>

</style>