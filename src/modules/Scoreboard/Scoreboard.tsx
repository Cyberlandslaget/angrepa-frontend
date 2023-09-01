import ConfettiPage from "components/ConfettiPage";

// TODO: Add Frisk's scoreboard graph here
function Scoreboard() {
  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <div className="tertiaryColor w-full h-full p-2 rounded-md">
        <h1 className="font-bold text-center animate-spin [animation-duration:2s] text-xl">
          Storm sin graf
        </h1>
      </div>
      <div className="tertiaryColor w-full h-full p-2 rounded-md flex justify-center items-center">
        <div className="py-8 flex justify-center">
          <img
            className="w-[calc(100%-16rem)] rounded-md"
            src="https://cdn.discordapp.com/attachments/1021083290914013286/1038738442382741515/Screenshot_20221106_095532.jpg"
            alt="graf"
          />
        </div>
      </div>
      <ConfettiPage></ConfettiPage>
    </main>
  );
}

export default Scoreboard;
