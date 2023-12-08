<template>
    <v-container>
        <h1 type= "button" style="color:white;" class="text-center" @click="dashBoard()">
            DashBoard
        </h1>
        <v-top-navigation>
                <button type="button" class="ma-1" @click= "updateGraph(0);">
                  <v-btn color="white">
                    January
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(1);">
                  <v-btn color="white">
                    Feburary
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(2);">
                  <v-btn color="white">
                    March
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(3);">
                  <v-btn color="white">
                    April
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(4);">
                  <v-btn color="white">
                    May
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(5);">
                  <v-btn color="white">
                    June
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(6);">
                  <v-btn color="white">
                    July
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(7);">
                  <v-btn color="white">
                    Aguest
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(8);">
                  <v-btn color="white">
                    September
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(9);">
                  <v-btn color="white">
                    October
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(10);">
                  <v-btn color="white">
                    November
                  </v-btn>
                </button>
                <button type="button" class="ma-1" @click= "updateGraph(11);">
                  <v-btn color="white">
                    December
                  </v-btn>
                </button>
        </v-top-navigation>
        <h2>2023</h2>
        <p class="ma-2"> <Line ref="lineChart" :data="lineChartData" :options="lineChartOptions" /> </p>
    </v-container>
</template>

<script>
import {
  //generateMonth,
  getTotalTransactionAmountInDays,
  getTotalTransactionAmountInMonths,
} from '@/api/api.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "DashBoard",
  components: {
    Line,
  },
  if(){

  },
  data() {
    return {
      lineChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Percentage of Debt Paid",
            backgroundColor: "#85bb65",
            data: [0.5, 0.2, 0.28, 0.42, 0.55, 0.6, 0.7, 0.36, 0.14, 0.83, 0.01, 0.43],
            borderColor: 'rgb(255, 255, 255)',
            pointHoverBackgroundColor: 'rgb(255, 255, 255)',
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
      },
    };
  },
  async mounted() {
     
  },
  methods:{
    async dashBoard(){
      const transactionResponseMonths = await getTotalTransactionAmountInMonths("fakeperson", "4563 2456 4216 4322", 2023);

      if (!('error' in transactionResponseMonths)) {
      console.error('Error fetching doubles:');

      let totalLabelMonths = [];
      let totalDataMonths = [];

      for(let i = 0; i < transactionResponseMonths.data.length; i++){
        totalDataMonths.push(transactionResponseMonths.data[i]);

        if(i == 0){
          totalLabelMonths.push("Jan");
        }
        else if(i == 1){
          totalLabelMonths.push("Feb");
        }
        else if(i == 2){
          totalLabelMonths.push("Mar");
        }
        else if(i == 3){
          totalLabelMonths.push("Apr");
        }
        else if(i == 4){
          totalLabelMonths.push("May");
        }
        else if(i == 5){
          totalLabelMonths.push("Jun");
        }
        else if(i == 6){
          totalLabelMonths.push("Jul");
        }
        else if(i == 7){
          totalLabelMonths.push("Aug");
        }
        else if(i == 8){
          totalLabelMonths.push("Sep");
        }
        else if(i == 9){
          totalLabelMonths.push("Oct");
        }
        else if(i == 10){
          totalLabelMonths.push("Nov");
        }
        else if(i == 11){
          totalLabelMonths.push("Dec");
        }
        console.log(totalLabelMonths);
        console.log(totalDataMonths);
      }

      this.$refs.lineChart.chart.data.labels = totalLabelMonths;
      this.$refs.lineChart.chart.data.datasets[0].data = totalDataMonths;

      this.$refs.lineChart.chart.update();
      }
    },

    async updateGraph(month) {
      const transactionResponseDays = await getTotalTransactionAmountInDays("fakeperson", "4563 2456 4216 4322", month, 2023);

    if (!('error' in transactionResponseDays)) {
      console.error('Error fetching doubles:');

       let doublePair = transactionResponseDays.data;
       let labelsNew = [];
       let dataNew = [];

       doublePair.forEach(element => {
         let integerPart = element.first;
         let doublePart = element.second;
        
         labelsNew.push(element.first);
         dataNew.push(element.second);
         console.log("Integer: " + integerPart + ", Double: " + doublePart);
       });
      this.$refs.lineChart.chart.data.labels = labelsNew;
      this.$refs.lineChart.chart.data.datasets[0].data = dataNew;

      this.$refs.lineChart.chart.update();
    }
    },
  },
};
</script>
