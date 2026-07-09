function ScanHistory({ history }) {

    return (

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-6">
                Recent Scan History
            </h2>

            {
                history.length === 0 ? (

                    <p className="text-slate-400">
                        No scans yet.
                    </p>

                ) : (

                    <div className="space-y-3">

                        {history.map((item, index) => (

                            <div
                                key={index}
                                className="flex justify-between items-center bg-slate-800 rounded-xl px-4 py-3"
                            >

                                <div>

                                    <p className="text-white font-semibold">

                                        {item.prediction === "Spam"
                                            ? "🔴 Spam"
                                            : "🟢 Ham"}

                                    </p>

                                    <p className="text-slate-400 text-sm">

                                        {item.time}

                                    </p>

                                </div>

                                <div className="text-blue-400 font-bold">

                                    {item.confidence}%

                                </div>

                            </div>

                        ))}

                    </div>

                )

            }

        </div>

    );

}

export default ScanHistory;