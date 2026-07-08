import { useState } from "react";
import API from "../services/api";
import ResultCard from "./ResultCard";

function EmailForm() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const analyzeEmail = async () => {

        if (email.trim() === "") {
            alert("Please enter an email.");
            return;
        }

        setLoading(true);

        try {

            const response = await API.post("/predict", {
                email: email
            });

            console.log(response.data);

            setResult(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-3xl">

            <h2 className="text-3xl font-bold text-white mb-2">
                Analyze Your Email
            </h2>

            <p className="text-slate-400 mb-6">
                Paste an email below to check whether it is Spam or Ham.
            </p>

            <textarea
                rows="12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Paste your email here..."
                className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                onClick={analyzeEmail}
                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white transition rounded-xl py-3 text-lg font-semibold"
            >
                {loading ? "Analyzing..." : "Analyze Email"}
            </button>
            <ResultCard result={result} />

        </div>

    );

}

export default EmailForm;