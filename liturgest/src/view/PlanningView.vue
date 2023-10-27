<template>
    <div>
      <div id="DateButtons">
        <el-button class="monthYear" @click="changeMonthOrYear('prevMonth')">Précédent</el-button>
        <el-select
          class="monthYear"
          :options="monthsOfYear" 
          v-model="month"
          @change="updateMonth"
        >
          <el-option
            v-for="(monthOfYear, index) in monthsOfYear"
            :key="index"
            :label="monthOfYear"
            :value="index"
          />
        </el-select>
        <el-button class="monthYear" @click="changeMonthOrYear('nextMonth')">Suivant</el-button>
        <el-button class="monthYear" @click="changeMonthOrYear('prevYear')">Précédent</el-button>
        <el-text class="monthYear">{{ year }}</el-text>
        <el-button class="monthYear" @click="changeMonthOrYear('nextYear')">Suivant</el-button>
      </div>
      <div id="PlanningGrid">
        <div 
          class="PlanningRow"
          v-for="w in nbWeek"
          :key="w"
        >
          <div
            class="PlanningCell"
            :key="w + ',' + d"
            v-for="d in 7"
          >
            <CalenderCard
              class="card"
              :date="getCalenderDay(w, d).date"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CalenderCard from "../components/CalenderCard.vue"
  import CalenderDay from "@/assets/CalenderDay";
  import {getUserByMail} from "../assets/db"
  export default {
    name: "PlanningView",
    components:{
      CalenderCard
    },
    data(){
      return {
        today: new Date(),
        month: null,
        year: null,
        firstDayOfMonth: null,
        lastDayOfMonth:null,
        firstDateOfSchedule: null,
        calenderDays: [],
        nbWeek:4,
        monthsOfYear:["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"],
        daysOfWeek:["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"]
      }
    },
    async beforeMount(){
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();

      this.setDayOnCardDay();

      console.log(await getUserByMail("kevin.pi@mail.com"));
    },
    methods:{
      changeMonthOrYear(mode){
        switch(mode){
          case "prevMonth":
            this.month--;
            if(this.month < 0){
              this.month = 11;
              this.year--;
            }
            break;
          case "nextMonth":
            this.month++;
            if(this.month > 11){
              this.month = 0;
              this.year++;
            }
            break;
          case "prevYear":
            this.year--;
            break;
          case "nextYear":
            this.year++;
            break;
        }
        this.setDayOnCardDay();
      },
      setDayOnCardDay(){
        this.calenderDays = [];
        this.firstDayOfMonth = new Date(this.year, this.month, 1);
        this.lastDayOfMonth = new Date(this.year, this.month + 1, 0);
        const firstDay = this.firstDayOfMonth.getDay();
        const lastDay = this.lastDayOfMonth.getDate();
        const lastDayNum = this.lastDayOfMonth.getDay();
        const lastDayOfLastMonth = new Date(this.year, this.month, 0);
        const firstDayOfNextMonth = new Date(this.year, this.month + 1, 1);
        
        this.firstDateOfSchedule = new Date(
          firstDay == 0 ? this.year : lastDayOfLastMonth.getFullYear(),
          firstDay == 0 ? this.month : lastDayOfLastMonth.getMonth(),
          firstDay == 0 ? 1 : lastDayOfLastMonth.getDate() - firstDay + 1
        );

        this.lastDateOfSchedule = lastDayNum == 6 ? this.lastDayOfMonth : new Date(
          firstDayOfNextMonth.getFullYear(),
          firstDayOfNextMonth.getMonth() + 1,
          7 - lastDayNum
        );

        for(let i = 0; i <= firstDay - 1; i++){
          this.calenderDays.push(
            new CalenderDay(
              i,
              new Date(
                lastDayOfLastMonth.getFullYear(),
                lastDayOfLastMonth.getMonth(),
                lastDayOfLastMonth.getDate() + i - firstDay + 1
              ),
              false
            )
          );
        }

        for(let i = firstDay; i < lastDay + firstDay; i++){
          this.calenderDays.push(
            new CalenderDay(
              i,
              new Date(
                this.year,
                this.month,
                i - firstDay + 1
              ),
              false
            )
          );
        }
        
        for(let i = firstDay + lastDay; i < 42; i++){
          this.calenderDays.push(
            new CalenderDay(
              i,
              new Date(
                firstDayOfNextMonth.getFullYear(),
                firstDayOfNextMonth.getMonth(),
                i - lastDay - firstDay + 1
              )
            )
          );
        }

        const nbWeek = (firstDay + lastDay) / 7;
        //console.log(nbWeek);
        this.nbWeek = nbWeek <= 4 ? 4 : nbWeek <= 5 ? 5 : 6;
      },
      getCalenderDay(week, dayOfWeek){
        const id = (week-1)*7 + dayOfWeek -1;
        return this.calenderDays[id];
      },
      updateMonth(e){
        this.month = e;
        this.setDayOnCardDay();
      }
    }
  }
  </script>
  
  <style>
  #PlanningGrid{
    margin-top: 20px;
  }
  .PlanningCell{
    display: inline;
  }
  .card{
    display:inline-block;
    width: 150px;
    height: 150px;
    margin-left: 10px;
    margin-top: 5px;
  }
  .monthYear{
    margin-right: 10px;
  }
  </style>