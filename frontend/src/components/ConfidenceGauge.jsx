import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ConfidenceGauge({ confidence = 0, prediction = "Waiting..." }) {

    const isSpam = prediction === "Spam";

    return (

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-2">
                Confidence Score
            </h2>

            <p className="text-center text-slate-400 mb-5">
                {prediction}
            </p>

            <div className="w-44 h-44 mx-auto">

                <CircularProgressbar
                    value={confidence}
                    text={`${confidence.toFixed(2)}%`}
                    styles={buildStyles({

                        pathColor: isSpam ? "#ef4444" : "#22c55e",

                        textColor: "#ffffff",

                        trailColor: "#334155"

                    })}
                />

            </div>

            <p className="text-center text-slate-400 mt-5">

                {confidence === 0
                    ? "Analyze an email to see confidence"
                    : confidence >= 90
                    ? "Excellent Confidence"
                    : confidence >= 75
                    ? "High Confidence"
                    : confidence >= 60
                    ? "Moderate Confidence"
                    : "Low Confidence"}

            </p>

        </div>

    );

}

export default ConfidenceGauge;