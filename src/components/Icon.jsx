import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

const icons = import.meta.glob('/src/assets/icons/*.svg', { eager: true });

const Icon = ({ name, alt = "", className = "" }) => {
  const { lightMode } = useContext(ThemeContext);
  const theme = lightMode ? "light" : "dark";

  const key = `/src/assets/icons/${name}-${theme}.svg`;
  const iconModule = icons[key];

  if (!iconModule) {
    console.warn(`⚠️ Icon not found: ${key}`);
    return <span title={`Missing icon: ${name}`}>❓</span>;
  }

  return <img src={iconModule.default} alt={alt} className={className} />;
};

export default Icon;