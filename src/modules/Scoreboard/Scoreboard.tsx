import ConfettiPage from "components/ConfettiPage";
import { createRoot } from "react-dom/client";


// TODO: Add Frisk's scoreboard graph here
function Scoreboard() {
  // make the confetti button, actually spawn confetti
  window.onload = () => {
    const confettiButton = document.getElementById("spawnConfettiButton")
    if (confettiButton) {
      confettiButton.onclick = () => {
        console.log("clicked!")
        setTimeout(spawnConfetti, 100)
        setTimeout(deleteConfetti, 50000)
      }
    }
  };

  return (
    <main className="w-full h-full grid grid-cols-1 [grid-template-rows:2.75rem_1fr] gap-3">
      <div className="tertiaryColor w-full h-full p-2 rounded-md">
        {/* temporary button */}
        <button id="spawnConfettiButton" style={{left: 0}} className="primaryColor p-1 px-3 rounded-sm text-sm transition-all hover:!bg-purple-500">confetti!!1!</button>
        <h1 className="font-bold text-center animate-spin [animation-duration:2s] text-xl">
          Jhonny!! Du må gjøre ferdig storm sin graf!!!
        </h1>
      </div>
      <div className="tertiaryColor w-full h-full p-2 rounded-md flex justify-center items-center">
        <div className="py-8 flex justify-center">
          <img
            className="w-[100%] rounded-md"
            src="https://g.foolcdn.com/image/?url=https:%2F%2Fmedia.ycharts.com%2Fcharts%2Fbdd991239b958431386a22100ec09a6b.png&w=700"
            alt="graf"
          />
        </div>
      </div>
      <div id="confettiPageParent" />
    </main>
  );
}

export default Scoreboard;


// helper functions to spawn and delete the confetti page
function spawnConfetti() {
  const parentElement = document.getElementById("confettiPageParent")

  if (parentElement) {
    if (parentElement.childElementCount > 0) {
      deleteConfetti()
    }
    // this might not be right, unsure - it sure does work tho! 
    const confettiPageInstance = <ConfettiPage />
    const parentElementInstance = createRoot(parentElement)
    parentElementInstance.render(confettiPageInstance) 
  }
}

function deleteConfetti() {
  const confettiPage = document.getElementById("confettiPage")

  if (confettiPage) {
    confettiPage.parentNode?.removeChild(confettiPage)
  }
}