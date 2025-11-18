import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const ViewAllWorks = () => {
  return (
    <div className="bg-neutral-600 w-fit p-2 rounded-xs">
      <div className="text-slate-50 text-end">
        <ArrowOutwardIcon fontSize="medium"/>
      </div>
      <p className="text-slate-50 font-light text-3xl">View all Work</p>
    </div>
  );
};
