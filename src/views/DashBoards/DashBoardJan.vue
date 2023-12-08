<template>
    <v-container>
        <v-top-navigation>
                <button type="button" class="ma-10" onclick="window.location.href = 'http://localhost:8080/dashboard'">
                  <v-btn color="white">
                    DashBoard
                  </v-btn>
                </button>
                <button type="button" class="ma-10">
                  <v-btn color="white">
                    Update
                  </v-btn>
                </button>
            </v-top-navigation>
        <h1 color="white">January</h1>
        <p class="ma-2"> <Line :data="lineChartData" :options="lineChartOptions" /> </p>
        <!--<p2 class="ma-9"><Bar :data="barChartData" :options="barChartOptions" /></p2>-->
    </v-container>
</template>

<script>
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
//import { getAllTransactions } from '/Users/Evian Peterson/Desktop/GitHub/loan-budgeting-web-2/loan-budgeting-web/src/api/api'
//import {useCustomerStore} from "/Users/Evian Peterson/Desktop/GitHub/loan-budgeting-web-2/loan-budgeting-web/src/api/api"
//import { defineComponent } from "vue"
export default({
  name: "DashBoard",
  components: {
    Line,
  },
  data() {
    return {
      lineChartData: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16",
    "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"],
        datasets: [
          {
            label: "Percentage of Debt Paid",
            backgroundColor: "#85bb65",
            data: [0.12, 0.2, 0.28, 0.42, 0.55, 0.6, 0.7, 0.36, 0.14, 0.83, 0.01, 0.43],
            borderColor: 'rgb(255, 255, 255)',
            pointHoverBackgroundColor: 'rgb(255, 255, 255)',
          },
        ],
      },
      lineChartOptions: {
        responsive: true,
      },
    }
 }
});
</script>
<!--async mounted() {
    const customerStore = useCustomerStore();
    console.log('calling api...');
    const transactions = await getAllTransactions(customerStore.$state.username);
    if ('error' in  transactions) {
      console.log('No Good');
    } else {
      console.log('Assigning data');
      console.log(transactions.data);
      console.log(this.barChartData.datasets[0].data);
      Object.assign(this.barChartData.datasets[0].data, transactions.data.map((tran) => tran.transAmount));
      console.log(this.barChartData.datasets[0].data);
      this.barChartData.update();
    }
  };-->
