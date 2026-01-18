import { useEffect } from "react";

export function useDefaultCursorHidden() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      html, body, * {
        cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=),
          none !important;
      }
    `;
    document.head.appendChild(style);

    const enforceCursor = () => {
      if (![...document.styleSheets].some((s) => s.ownerNode === style)) {
        document.head.appendChild(style);
      }
    };

    // Reapply on focus/visibility changes
    window.addEventListener("focus", enforceCursor);
    document.addEventListener("visibilitychange", enforceCursor);

    return () => {
      window.removeEventListener("focus", enforceCursor);
      document.removeEventListener("visibilitychange", enforceCursor);
      style.remove();
    };
  }, []);
}
