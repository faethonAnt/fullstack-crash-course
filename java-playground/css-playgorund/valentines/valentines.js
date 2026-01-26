const yesButton = document.getElementById("yesbtn");
const noButton = document.getElementById("nobtn");
const pleaseCat = document.getElementById("please-cat");
const hihiCat = document.getElementById("hihi-cat");
const punchCat = document.getElementById("punch-cat");
const love = document.getElementById("love");
const tryme = document.getElementById("tryMe");

yesButton.addEventListener("click", () => {
  // Deactivate
  pleaseCat.style.display = "none";
  punchCat.style.display = "none";
  tryme.style.display = "none";

  // Activate
  hihiCat.style.display = "block";
  love.style.display = "block";
});

noButton.addEventListener("click", () => {
  pleaseCat.style.display = "none";
  hihiCat.style.display = "none";
  love.style.display = "none";

  punchCat.style.display = "block";
  tryme.style.display = "block";
});
