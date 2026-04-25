// Capitalize function
export const Capitalize = (text: string) => {
  if (!text) {
    return "";
  }
  return text
    ?.toLowerCase()
    ?.split(/[_\s-]+/)
    ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join(" ");
};