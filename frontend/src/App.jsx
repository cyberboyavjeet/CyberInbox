import Navbar from "./components/Navbar";
import EmailForm from "./components/EmailForm";

function App() {
  return (
    <div className="min-h-screen bg-slate-900">

      <Navbar />

      <div className="flex justify-center items-center py-16 px-6">
        <EmailForm />
      </div>

    </div>
  );
}

export default App;