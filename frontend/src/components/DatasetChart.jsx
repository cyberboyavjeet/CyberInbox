import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DatasetChart({ analysis }) {

  const spam = analysis?.spam_probability || 0;
  const ham = analysis?.ham_probability || 0;

  const data = {

    labels: ["Ham", "Spam"],

    datasets: [

      {

        data: [ham, spam],

        backgroundColor: [

          "#22c55e",
          "#ef4444",

        ],

        borderWidth: 0,

      },

    ],

  };

  const options = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        labels: {

          color: "white",

        },

      },

      tooltip: {

        callbacks: {

          label: function (context) {

            return `${context.label}: ${context.raw}%`;

          },

        },

      },

    },

  };

  return (

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

      <h2 className="text-xl font-bold text-white mb-6">

        Current Email Probability

      </h2>

      <div className="h-72">

        <Doughnut
          data={data}
          options={options}
        />

      </div>

    </div>

  );

}

export default DatasetChart;