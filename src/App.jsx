import React from "react";
import Home from "./components/home";
const response = await fetch("/enemies.json");
function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Home />
    </div>
  );
}
export default App;