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

  return {
    onClose,
    onToggleButton,
    activateHaptic,
    tg,
  };
}
