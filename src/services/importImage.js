import DefaultImg from "../images/empty.jpg";
export default function importImage(src) {
  try {
    return require(`../../src/images/${src}`);
  } catch (error) {
    return DefaultImg;
  }
}
