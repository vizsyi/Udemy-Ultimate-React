import { NavBar } from "./NavBar";
import { Main } from "./Main";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {


  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}


