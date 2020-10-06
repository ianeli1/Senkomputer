import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import { App } from "./App";
import { CanvasHandler } from "./CanvasHandler";
import { Kore } from "./kore";

const kontext = React.createContext<{
  kore: Kore;
  ref: React.MutableRefObject<HTMLCanvasElement>;
}>(undefined!);

export function useKontext() {
  const { kore, ref } = React.useContext(kontext);
  const [localKore, setKore] = useState<Kore>(kore);

  useEffect(() => {
    setKore(kore);
  }, [JSON.stringify(kore)]);

  return { kore: localKore, ref };
}

const _cacheSize = 8;

function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
  const canvas = new CanvasHandler(canvasRef.current);
  const kore = new Kore(_cacheSize, canvas);
  return (
    <kontext.Provider value={{ kore, ref: canvasRef }}>
      <App />
    </kontext.Provider>
  );
}

render(<Index />, document.getElementById("root"));
