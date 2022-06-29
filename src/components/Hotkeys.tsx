import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const Hotkeys: React.FC = () => {
  const [open, setOpen] = useState(false);
  useHotkeys("*", () => setOpen((_open) => !_open), {
    filterPreventDefault: false,
    filter: (event) => {
      return event.key === "?";
    },
  });
  return (
    <div>
      <details open={open}>
        <summary>Hjælp</summary>

        <p>
          <strong>Hotkeys</strong>
        </p>
        <dl>
          <dt>
            <kbd>CTRL+enter</kbd>
          </dt>
          <dd>Indsæt nuværende klokkeslæt</dd>

          <dt>
            <kbd>?</kbd>
          </dt>
          <dd>Åbn eller luk denne boks</dd>
        </dl>
      </details>
    </div>
  );
};
