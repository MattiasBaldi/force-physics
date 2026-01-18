import useDebug from "./hooks/useDebug";
import { Leva } from "leva";
import { Experience } from "./components/Experience";
import { useDefaultCursorHidden } from "./hooks/useDefaultCursorHidden.ts";

function App() {
  const isDebug: boolean = useDebug();
  useDefaultCursorHidden();

  return (
    <>
      <Leva hidden={!isDebug} />
      <Experience isDebug={isDebug} />
    </>
  );
}

export default App;
