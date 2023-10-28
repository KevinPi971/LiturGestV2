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
        <el-text
          class="DayOfWeekTitle"
          v-for="(dow, index) in daysOfWeek"
          :key="index"
        >
          {{ dow }}
        </el-text>
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
              :key="getCalenderDay(w, d) + getCalenderDay(w, d).events"
              :cal-day="getCalenderDay(w, d)"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CalenderCard from "../components/CalenderCard.vue"
  import CalenderDay from "@/assets/CalenderDay";
  import Event from "../assets/Event"
  import { getResultForRequest } from "../assets/db"
  import { formatDateForSQL } from "../assets/fonction"
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
        daysOfWeek:["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
        listEvt: []
      }
    },
    async beforeMount(){
      this.month = this.today.getMonth();
      this.year = this.today.getFullYear();

      this.setDayOnCardDay();
      await this.setEvtOnSchedule();
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
              false,
              []
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
              true,
              []
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
              ),
              false,
              []
            )
          );
        }

        const nbWeek = (firstDay + lastDay) / 7;
        this.nbWeek = nbWeek <= 4 ? 4 : nbWeek <= 5 ? 5 : 6;
      },
      getCalenderDay(week, dayOfWeek){
        const id = (week-1)*7 + dayOfWeek -1;
        return this.calenderDays[id];
      },
      updateMonth(e){
        this.month = e;
        this.setDayOnCardDay();
      },
      async setEvtOnSchedule(){
        this.listEvt = [];
        const listShortEvt = await this.getEvtsByDates(this.firstDateOfSchedule, this.lastDateOfSchedule)
        
        for(let cd of this.calenderDays){
          const listEvents = [];
          for(let lse of listShortEvt){
            //console.log(lse);
            const lseDdeb = new Date(lse.ddeb);
            const lseDfin = new Date(lse.dfin);
            
            if(this.isDateIn(cd.date, lseDdeb) || this.isDateIn(cd.date, lseDfin)){
              listEvents.push(new Event(lse.id, lse.typeevt, lse.typeevttitle, lse.color, lse.ddeb, lse.dfin));
            }
          }
          cd.events = listEvents;
          //console.log(cd);
        }
        console.log(this.calenderDays);
      },
      async getEvtsByDates(ddeb, dfin){
        const request = "SELECT * FROM SHORTEVT WHERE DDEB > '" + formatDateForSQL(ddeb) + "' AND DFIN <= '" + formatDateForSQL(dfin) + "' ORDER BY DDEB";
        return await getResultForRequest(request);
      },
      getEvtOfDate(date){
        const list = [];
        for(let le of this.listEvts){
          if(le.ddeb.slice(0, 10) ==  formatDateForSQL(date)){
            list.push(le);
          }
        }
        return list;
      },
      isDateIn(dRef, d){
        const dRef2 = new Date(dRef.getFullYear(), dRef.getMonth(), dRef.getDate() + 1);
        return dRef <= d && d <= dRef2;
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
  .DayOfWeekTitle{
    display: inline-block;
    width: 150px;
    margin-left: 10px;
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