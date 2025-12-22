import type { MenuProps } from "./Menu.types";

export const menuItems = [
  { id: "maths", label: "Maths Game" },
  { id: "typing", label: "Typing Tool" },
];

export const Menu = ({ selectedItem, onSelectItem }: MenuProps) => {
  return (
    <div className="flex gap-4 p-4 border-b">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            // onSelectItem(item.id);
            console.log(`Selected ${item.id}`); // Added log for debugging
          }}
          className={selectedItem === item.id ? "text-red-500" : ""}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
