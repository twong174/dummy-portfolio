import { Link } from "react-router-dom";
import CallMadeIcon from "@mui/icons-material/CallMade";
import { FlipWord } from "../animations/FlipWord";
import transition from "../transitions/Transition";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <div className="w-full h-screen p-8 flex flex-col gap-2">
        <header className=" flex items-center justify-between ">
          <h2 className=" text-3xl font-bold ">
            <Link to={"/"}>SUPERSOLID</Link>
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

        <main className="h-full grid grid-cols-2 gap-2 ">
          <div className=" flex flex-col justify-center">
            <h1
              className="font-extrabold text-[200px] font-['Impact']
          leading-none "
            >
              DON'T BE SHY, REACH OUT
            </h1>
          </div>
          <div className="border">
            <p className="text-2xl font-medium">SEND AN EMAIL </p>
            <h2 className="text-6xl font-extrabold">email@email.com</h2>
            <p className="text-2xl font-medium">LET'S TALK</p>
            <h2 className="text-6xl font-extrabold">+1 201 330 8182</h2>
            <p className="text-2xl font-medium">DROP BY</p>
            <h2 className="text-6xl font-extrabold">720 MONROE, E-514 HOBOKEN, NJ 07302</h2>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default transition(ContactPage);
