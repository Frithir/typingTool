import { useState } from "react";
import { Menu } from "./components/Menu";
import { TypingTool } from "./components/TypingTool";
import { MathsGame } from "./components/MathsGame";
import { TrigCircle } from "./components/TrigCircle";
import { PiMnemonic } from "./components/PiMnemonic";

function App() {
  const [selectedItem, setSelectedItem] = useState("maths");
  const onSelectItem = (id: string) => {
    setSelectedItem(id);
  };

  return (
    <>
      <Menu selectedItem={selectedItem} onSelectItem={onSelectItem} />
      {selectedItem === "typing" && <TypingTool />}
      {selectedItem === "maths" && <MathsGame />}
      {selectedItem === "trig" && <TrigCircle />}
      {selectedItem === "pi" && <PiMnemonic />}
    </>
  );
}

export default App;
