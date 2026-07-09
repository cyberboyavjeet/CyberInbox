import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

function SpamKeywordsChart({ analysis }) {

    const keywords = analysis?.top_keywords || [];

    const data = {

        labels: keywords.map(item => item.word),

        datasets: [

            {

                label: "Keyword Frequency",

                data: keywords.map(item => item.count),

                backgroundColor: "#3b82f6",

                borderRadius: 8,

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

                }

            }

        },

        scales: {

            x: {

                ticks: {

                    color: "white",

                }

            },

            y: {

                beginAtZero: true,

                ticks: {

                    color: "white",

                    precision: 0,

                }

            }

        }

    };

    return (

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-6">

                Current Email Keywords

            </h2>

            {

                keywords.length === 0

                ?

                (

                    <p className="text-slate-400 text-center">

                        Analyze an email to view detected keywords.

                    </p>

                )

                :

                (

                    <div className="h-72">

                        <Bar

                            data={data}

                            options={options}

                        />

                    </div>

                )

            }

        </div>

    );

}

export default SpamKeywordsChart;