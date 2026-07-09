function Footer() {

    const year = new Date().getFullYear();

    return (

        <footer className="border-t border-slate-800 mt-16">

            <div className="w-full px-10 py-6">

                <div className="flex justify-between items-center">

                    <div className="text-xs text-slate-500">

                        © {year} CyberInbox

                    </div>

                    <div className="text-right">

                        <p className="text-sm text-slate-300 font-medium">
                            Developed by <span className="text-blue-400">Avjeet Singh</span>
                        </p>

                        <p className="text-xs text-slate-500 mt-1">
                            React • FastAPI • Logistic Regression • TF-IDF
                        </p>

                    </div>

                </div>

            </div>

        </footer>

    );

}

export default Footer;