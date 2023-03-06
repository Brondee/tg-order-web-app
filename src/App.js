import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";

function App() {
  const { tg, onClose } = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <div>
      work
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
