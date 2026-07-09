function StatsCards({ analysis }) {

    const cards = [

        {
            title: "Spam Probability",
            value: analysis
                ? `${analysis.spam_probability}%`
                : "--",
            color: "text-red-400",
        },

        {
            title: "Ham Probability",
            value: analysis
                ? `${analysis.ham_probability}%`
                : "--",
            color: "text-green-400",
        },

        {
            title: "Word Count",
            value: analysis
                ? analysis.words
                : "--",
            color: "text-blue-400",
        },

        {
            title: "Characters",
            value: analysis
                ? analysis.characters
                : "--",
            color: "text-yellow-400",
        }

    ];

    return (

        <div>

            <h2 className="text-2xl font-bold text-white mb-5">
                Current Email Statistics
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

                {cards.map((item) => (

                    <div
                        key={item.title}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 shadow-lg hover:scale-105 transition-all"
                    >

                        <p className="text-slate-400">
                            {item.title}
                        </p>

                        <h2 className={`text-3xl font-bold mt-2 ${item.color}`}>
                            {item.value}
                        </h2>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StatsCards;