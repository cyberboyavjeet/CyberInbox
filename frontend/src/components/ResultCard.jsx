function ResultCard({ result }) {

    if (!result) return null;

    const isSpam = result.prediction === "Spam";
    const progressColor = isSpam ? "bg-red-500" : "bg-green-500";

    return (

        <div className="mt-8 rounded-2xl bg-slate-900 border border-slate-700 shadow-lg p-6">

            <h3 className="text-2xl font-bold text-white mb-6">
                Analysis Result
            </h3>

            <div className="space-y-4">

                <div className="flex justify-between items-center">

    <span className="text-slate-400">
        Prediction
    </span>

    <span
        className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
            isSpam
                ? "bg-red-600"
                : "bg-green-600"
        }`}
    >
        {isSpam ? "🚨 SPAM" : "✅ SAFE"}
    </span>

</div>

                <div>

    <div>

    <div className="flex justify-between mb-2">

        <span className="text-slate-400">
            Confidence
        </span>

        <span className="text-white font-semibold">
            {result.confidence}%
        </span>

    </div>

    <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

        <div
            className={`${progressColor} h-3 transition-all duration-700`}
            style={{
                width: `${result.confidence}%`
            }}
        />

    </div>

</div>

    <div className="w-full bg-slate-700 rounded-full h-3">

        <div
            className={`${progressColor} h-3 rounded-full transition-all duration-700`}
            style={{ width: `${result.confidence}%` }}
        ></div>

    </div>

</div>

                <div className="flex justify-between">
                    <span className="text-slate-400">Risk Level</span>

                    <span className="text-yellow-400">
                        {result.risk_level}
                    </span>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">

    <p className="text-slate-400 mb-2">
        💬 Analysis
    </p>

    <p className="text-white leading-7">
        {result.message}
    </p>

</div>

                <p className="text-xs text-slate-500 pt-4">
                    {result.timestamp}
                </p>

            </div>

        </div>

    );

}

export default ResultCard;