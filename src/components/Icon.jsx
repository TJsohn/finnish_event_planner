import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const icons = import.meta.glob('/src/assets/icons/*.svg', { eager: true });

const Icon = ({ name, alt = "", className = "" }) => {
  const { lightMode } = useContext(ThemeContext);
  const theme = lightMode ? "light" : "dark";

  const iconPath = `/src/assets/icons/${name}-${theme}.svg`;
  const iconModule = icons[iconPath];

  if (!iconModule) {
    console.warn(`⚠️ Icon not found: ${iconPath}`);
    return <span title={`Missing icon: ${name}`}>❓</span>;
  }

  return (
    <img
      src={iconModule.default}
      alt={alt || name}
      className={className}
    />
  );
};

export default Icon;