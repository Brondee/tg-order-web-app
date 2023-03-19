import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Routes, Route } from "react-router-dom";
import Specialists from "./screens/Specialists/Specialists";
import DateTime from "./screens/DateTime/DateTime";
import Services from "./screens/Services/Services";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <Routes>
      <Route path="/specialists" element={<Specialists />} />
      <Route path="/date" element={<DateTime />} />
      <Route index element={<Services />} />
    </Routes>
  );
}

export default App;
