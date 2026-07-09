import { useEffect, useState } from "react";
import API from "../services/api";

function ModelInfo() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const loadStats = async () => {

            try {

                const response = await API.get("/stats");

                setStats(response.data);

            } catch (error) {

                console.error(error);

            }

        };

        loadStats();

    }, []);

    if (!stats) {

        return (

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

                <p className="text-white">
                    Loading Model Information...
                </p>

            </div>

        );

    }

    const totalEmails =
        stats.dataset.ham + stats.dataset.spam;

    return (

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-6">

                🧠 Model Information

            </h2>

            <div className="space-y-3">

                <div className="flex justify-between">
                    <span className="text-slate-400">Algorithm</span>
                    <span className="text-white font-semibold">
                        Logistic Regression
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Vectorizer</span>
                    <span className="text-white font-semibold">
                        TF-IDF
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Backend</span>
                    <span className="text-white font-semibold">
                        FastAPI
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Frontend</span>
                    <span className="text-white font-semibold">
                        React + Vite
                    </span>
                </div>

                <hr className="border-slate-700 my-4" />

                <h3 className="text-lg font-semibold text-blue-400">

                    📊 Model Performance

                </h3>

                <div className="flex justify-between">
                    <span className="text-slate-400">Accuracy</span>
                    <span className="text-green-400 font-bold">
                        {stats.model.accuracy}%
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Precision</span>
                    <span className="text-green-400 font-bold">
                        {stats.model.precision}%
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Recall</span>
                    <span className="text-green-400 font-bold">
                        {stats.model.recall}%
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">F1 Score</span>
                    <span className="text-green-400 font-bold">
                        {stats.model.f1_score}%
                    </span>
                </div>

                <hr className="border-slate-700 my-4" />

                <h3 className="text-lg font-semibold text-blue-400">

                    📁 Training Dataset

                </h3>

                <div className="flex justify-between">
                    <span className="text-slate-400">Total Emails</span>
                    <span className="text-white font-semibold">
                        {totalEmails}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Ham Emails</span>
                    <span className="text-green-400 font-bold">
                        {stats.dataset.ham}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Spam Emails</span>
                    <span className="text-red-400 font-bold">
                        {stats.dataset.spam}
                    </span>
                </div>

                <hr className="border-slate-700 my-4" />

                <div className="flex justify-between">

                    <span className="text-slate-400">
                        API Status
                    </span>

                    <span className="text-green-400 font-bold">
                        🟢 Connected
                    </span>

                </div>

            </div>

        </div>

    );

}

export default ModelInfo;