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
<!-- onclick="alert('Hello!')"-->
<template>
    <v-container>
        <h1 style="color:white;" class="text-center">
            DashBoard
        </h1>
        <v-top-navigation>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardjan'">
                  <v-btn color="white">
                    January
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardfeb'">
                  <v-btn color="white">
                    Feburary
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardmar'">
                  <v-btn color="white">
                    March
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardapr'">
                  <v-btn color="white">
                    April
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardmay'">
                  <v-btn color="white">
                    May
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardjun'">
                  <v-btn color="white">
                    June
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardjul'">
                  <v-btn color="white">
                    July
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardaug'">
                  <v-btn color="white">
                    Aguest
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardsep'">
                  <v-btn color="white">
                    September
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardoct'">
                  <v-btn color="white">
                    October
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboardnov'">
                  <v-btn color="white">
                    November
                  </v-btn>
                </button>
                <button type="button" class="ma-1" onclick="window.location.href = 'http://localhost:8080/dashboarddec'">
                  <v-btn color="white">
                    December
                  </v-btn>
                </button>
        </v-top-navigation>
        <h2>2023</h2>
        <p class="ma-2"> <Line :data="lineChartData" :options="lineChartOptions" /> </p>
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
export default {
  name: "DashBoard",
  components: {
    Line,
  },
  data() {
    return {
      lineChartData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
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
    };
  },
};
</script>

<!--barChartData: {
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
  },-->