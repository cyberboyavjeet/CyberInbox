function SecuritySummary({ email }) {

    if (!email) return null;

    // Count URLs
    const links =
        (email.match(/https?:\/\/\S+/gi) || []).length;

    // Count Email Addresses
    const emailAddresses =
        (email.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) || []).length;

    // Spam Keywords
    const spamWords = [
        "free",
        "win",
        "winner",
        "offer",
        "click",
        "urgent",
        "verify",
        "claim",
        "prize",
        "money",
        "reward",
        "gift"
    ];

    let suspiciousCount = 0;

    spamWords.forEach(word => {

        const regex = new RegExp(word, "gi");

        suspiciousCount += (email.match(regex) || []).length;

    });

    return (

        <div className="mt-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-lg">

            <h2 className="text-xl font-bold text-white mb-6">
                🛡 Security Summary
            </h2>

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span className="text-slate-400">
                        🔗 Links Found
                    </span>

                    <span className="text-white font-bold">
                        {links}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">
                        📧 Email Addresses
                    </span>

                    <span className="text-white font-bold">
                        {emailAddresses}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-slate-400">
                        ⚠ Suspicious Keywords
                    </span>

                    <span className="text-yellow-400 font-bold">
                        {suspiciousCount}
                    </span>

                </div>

            </div>

        </div>

    );

}

export default SecuritySummary;