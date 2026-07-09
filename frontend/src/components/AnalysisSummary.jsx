function AnalysisSummary({ result }) {

    if (!result) return null;

    return (

        <div className="mt-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-4">
                🤖 AI Analysis Summary
            </h2>

            <div className="space-y-3">

                <div className="flex items-center gap-2">

                    <span className="text-lg">
                        {result.prediction === "Spam" ? "🔴" : "🟢"}
                    </span>

                    <span className="text-white font-semibold">
                        {result.prediction}
                    </span>

                </div>

                <p className="text-slate-300 leading-7">

                    {result.summary}

                </p>

            </div>

        </div>

    );

}

export default AnalysisSummary;