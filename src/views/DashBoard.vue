<!--<template>
    <v-app>
        <h1>
            Dash
        </h1>
        <container class="center">
            <p>
                <v-text-field label="Label" variant="outlined">
                </v-text-field>
            </p>
        </container>
    </v-app>
</template>-->

<template>
    <v-container>
        <h1 style="color:white;" class="text-left">
            DashBoard
        </h1>
        <v-top-navigation>
                <v-btn class="ma-10" color="white">Budget</v-btn>
                <v-btn class="ma-10" color="white">Settings</v-btn>
                <v-btn class="ma-10" color="white">Recents</v-btn>
            </v-top-navigation>
        <p class="ma-2"> <Line :data="lineChartData" :options="lineChartOptions" /> </p>
        <p2 class="ma-9"><Bar :data="barChartData" :options="barChartOptions" /></p2>
        
        <v-layout class="overflow-visible" style="height: 50px">
            
        </v-layout>
    </v-container>
</template>


<template2>
    
</template2>


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
import { Line, Bar } from "vue-chartjs";
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
    Bar,
  },
  data() {
    return {
      barChartData: {
        labels: ["Contributions", "Debt"],
        datasets: [
          {
            label: "Money",
            data: [200, 1500],
            backgroundColor: "#85bb65",
          },
        ],
      },
      barChartOptions: {
        responsive: true,
      },
      lineChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Percentage of Debt Paid",
            backgroundColor: "#85bb65",
            data: [0.12, 0.2, 0.28, 0.42, 0.55, 0.6],
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
};
</script>

