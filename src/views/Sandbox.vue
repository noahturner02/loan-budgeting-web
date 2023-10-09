<template>
  <v-container>
    <Bar :data="barChartData" :options="barChartOptions" />
    <Line :data="lineChartData" :options="lineChartOptions" />
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
  name: "SandBox",
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
