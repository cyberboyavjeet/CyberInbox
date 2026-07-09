import ConfidenceGauge from "./ConfidenceGauge";
import DatasetChart from "./DatasetChart";
import ModelInfo from "./ModelInfo";
import SpamKeywordsChart from "./SpamKeywordsChart";

function Dashboard({ analysis }) {

    return (

        <div className="space-y-6">

            <ConfidenceGauge
                confidence={analysis?.confidence || 0}
                prediction={analysis?.prediction || "Waiting..."}
            />

            <DatasetChart analysis={analysis} />

            

            <SpamKeywordsChart analysis={analysis} />
            <ModelInfo />

        </div>

    );

}

export default Dashboard;