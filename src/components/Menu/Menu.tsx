import type { MenuProps } from "./Menu.types";

export const menuItems = [
  { id: "maths", label: "Maths Game" },
  { id: "typing", label: "Typing Tool" },
];

export const Menu = ({ selectedItem, onSelectItem }: MenuProps) => {
  return (
    <div className="bg-gray-900 border-b border-gray-700">
      <div className="max-w-4xl mx-auto px-8 py-4">
        <div className="flex gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectItem(item.id);
              }}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-all duration-200
                ${
                  selectedItem === item.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-700"
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
