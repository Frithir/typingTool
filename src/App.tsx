import { useState } from "react";
import { Menu } from "./components/Menu";
import { TypingTool } from "./components/TypingTool";
import { MathsGame } from "./components/MathsGame";

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
    </>
  );
}

export default App;
