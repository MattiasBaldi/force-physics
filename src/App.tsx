import useDebug from "./hooks/useDebug";
import { Leva } from "leva";
import { Experience } from "./components/Experience";

function App() {
  const isDebug: boolean = useDebug();

  return (
    <>
      <Leva hidden={!isDebug} />
      <Experience isDebug={isDebug} />
    </>
  );
}

export default App;
