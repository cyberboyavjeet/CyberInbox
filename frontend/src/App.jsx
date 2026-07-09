import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EmailForm from "./components/EmailForm";
import StatsCards from "./components/StatsCards";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";

function App() {

    const [analysis, setAnalysis] = useState(null);

    return (

        <div className="min-h-screen bg-slate-900">

            <Navbar />

            <Hero />

            <div className="max-w-7xl mx-auto px-6 mb-12">

                <StatsCards analysis={analysis} />

            </div>

            <div className="max-w-7xl mx-auto px-6 pb-20">

                <div className="grid lg:grid-cols-2 gap-8">

                    <EmailForm
                        setAnalysis={setAnalysis}
                        analysis={analysis}
                    />

                    <Dashboard
                        analysis={analysis}
                    />
                  <Footer />
                </div>

            </div>

        </div>

    );

}

export default App;