import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import { Routes, Route } from "react-router-dom";
import Specialists from "./screens/Specialists/Specialists";
import DateTime from "./screens/DateTime/DateTime";
import Service from "./screens/Service/Service";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <Routes>
      <Route index element={<Specialists />} />
      <Route path="/date" element={<DateTime />} />
      <Route path="/service" element={<Service />} />
    </Routes>
  );
}

export default App;
