import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { tg, onClose, onToggle } = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <div>
      work
      <button onClick={onClose}>Закрыть</button>
      <button onClick={onToggle}>toggle</button>
    </div>
  );
}

export default App;
