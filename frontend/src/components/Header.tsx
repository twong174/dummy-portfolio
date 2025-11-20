import { Link } from "react-router-dom";
import { FlipWord } from "../animations/FlipWord";
import CallMadeIcon from "@mui/icons-material/CallMade";

const Header = () => {
  return (
    <header className=" flex items-center justify-between text-slate-50">
      <h2 className=" text-3xl font-bold ">
        <Link to={"/"}>SANDBOX</Link>
      </h2>

      <div></div>

      <div className=" flex items-center justify-between gap-4 text-lg font-thin ">
        <div className="flex items-center gap-4">
          <Link to="/work" className="flex">
            <FlipWord> Work </FlipWord>
          </Link>
          <Link to="/about" className="flex">
            <FlipWord> About </FlipWord>
          </Link>
          <div className="text-lg font-thin flex items-center gap-2">
            <FlipWord> Contact </FlipWord>
            <CallMadeIcon fontSize="inherit" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
