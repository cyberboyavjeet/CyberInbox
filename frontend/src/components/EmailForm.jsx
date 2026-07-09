import { useState } from "react";
import API from "../services/api";
import ResultCard from "./ResultCard";
import ScanHistory from "./ScanHistory";
import SecuritySummary from "./SecuritySummary";
import generateReport from "../utils/generateReport";
import AnalysisSummary from "./AnalysisSummary";

function EmailForm({ analysis, setAnalysis }) {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    // Upload File
    const handleFileUpload = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {

            setEmail(e.target.result);

        };

        reader.readAsText(file);

    };

    // Drag Drop

    const handleDrop = (event) => {

        event.preventDefault();

        const file = event.dataTransfer.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {

            setEmail(e.target.result);

        };

        reader.readAsText(file);

    };

    const handleDragOver = (event) => {

        event.preventDefault();

    };

    // Analyze Email

    const analyzeEmail = async () => {

        if (email.trim() === "") {

            alert("Please enter an email.");

            return;

        }

        setLoading(true);

        try {

            const response = await API.post("/predict", {

                email: email,

            });

            console.log(response.data);

            setResult(response.data);

            setAnalysis(response.data);

            setHistory((prev) => [

                {

                    prediction: response.data.prediction,

                    confidence: response.data.confidence,

                    time: new Date().toLocaleTimeString(),

                },

                ...prev,

            ].slice(0, 5));

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    // Reset

    const resetAnalysis = () => {

        setEmail("");

        setResult(null);

        setHistory([]);

        setAnalysis(null);

    };

    return (

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-3xl">

            <h2 className="text-3xl font-bold text-white mb-2">

                Analyze Your Email

            </h2>

            <p className="text-slate-400 mb-6">

                Paste an email below to check whether it is Spam or Ham.

            </p>

            {/* Sample Emails */}

            <div className="mb-6">

                <p className="text-slate-400 mb-3">

                    Try Sample Emails

                </p>

                <div className="flex flex-wrap gap-3">

                    <button
                        onClick={() =>
                            setEmail(`Hello Avjeet,

Our meeting is tomorrow at 10 AM.

Please bring the project report.

Thanks,
Ashish`)
                        }
                        className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                    >
                        🟢 Ham
                    </button>

                    <button
                        onClick={() =>
                            setEmail(`Congratulations!

You have won ₹10,00,000.

Click here immediately to claim your reward.`)
                        }
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                    >
                        🔴 Spam
                    </button>

                    <button
                        onClick={() =>
                            setEmail(`Dear Customer,

Your bank account has been suspended.

Verify your account immediately:

https://fake-bank-login.com`)
                        }
                        className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black"
                    >
                        🟡 Phishing
                    </button>

                </div>

            </div>

            {/* Drag Drop */}

            <div
                className="mb-6 border-2 border-dashed border-slate-600 rounded-2xl p-8 text-center bg-slate-900 hover:border-blue-500 transition"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >

                <p className="text-5xl mb-4">📂</p>

                <p className="text-white text-lg font-semibold">

                    Drag & Drop your Email File

                </p>

                <p className="text-slate-400 mt-2">

                    or click below to upload a .txt file

                </p>

                <label className="mt-5 inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl text-white transition">

                    Choose File

                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                        className="hidden"
                    />

                </label>

            </div>

            {/* Text Area */}

            <textarea
                rows="12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Paste your email here..."
                className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Buttons */}

            <div className="flex gap-4 mt-6">

                <button
                    onClick={analyzeEmail}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 text-lg font-semibold transition"
                >
                    {loading ? "Analyzing..." : "Analyze Email"}
                </button>

                <button
                    onClick={resetAnalysis}
                    className="px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition"
                >
                    🔄 Reset
                </button>

            </div>

            {/* Result */}

            <ResultCard result={result} />
            <AnalysisSummary result={result} />

            <SecuritySummary email={email} />

            {/* PDF */}

            {result && (

                <button
                    onClick={() => generateReport(result)}
                    className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold transition"
                >
                    📄 Download PDF Report
                </button>

            )}

            {/* History */}

            <ScanHistory history={history} />

        </div>

    );

}

export default EmailForm;