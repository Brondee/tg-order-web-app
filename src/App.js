import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { tg, onClose, onToggleButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <div>
      work
      <button onClick={onClose}>Закрыть</button>
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
