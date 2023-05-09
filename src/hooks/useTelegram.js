const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
    console.log("toggledbtn");
  };

  const activateHaptic = (impactStyle) => {
    tg.HapticFeedback.impactOccurred(impactStyle);
  };

  const setOnClickButton = (func) => {
    tg.MainButton.onClick(() => {
      func();
    });
    tg.MainButton.offClick(() => {
      alert("setNull");
    });
  };

  const colorScheme = tg.colorScheme;

  return {
    onClose,
    onToggleButton,
    activateHaptic,
    tg,
    colorScheme,
    setOnClickButton,
  };
}
