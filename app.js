// ---------- TIMER ----------
let timer;
let timeLeft;

function startTimer() {
  const minutes = document.getElementById("timerMinutes").value;
  timeLeft = minutes * 60;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("⏱️ Time's up!");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function updateTimer() {
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;
  document.getElementById("timerDisplay").innerText =
    `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ---------- WORKOUT TRACKER ----------
const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

function addWorkout() {
  const workout = {
    exercise: exercise.value,
    sets: sets.value,
    reps: reps.value,
    weight: weight.value,
    date: new Date().toLocaleDateString()
  };
  workouts.push(workout);
  localStorage.setItem("workouts", JSON.stringify(workouts));
  renderWorkouts();
}

function renderWorkouts() {
  workoutList.innerHTML = "";
  workouts.forEach(w =>
    workoutList.innerHTML += `<li>${w.date} – ${w.exercise} | ${w.sets}x${w.reps} @ ${w.weight}kg</li>`
  );
}
renderWorkouts();

// ---------- MEAL TRACKER ----------
const meals = JSON.parse(localStorage.getItem("meals")) || [];

function addMeal() {
  const mealData = {
    name: meal.value,
    calories: Number(calories.value),
    protein: Number(protein.value)
  };
  meals.push(mealData);
  localStorage.setItem("meals", JSON.stringify(meals));
  renderMeals();
}

function renderMeals() {
  mealList.innerHTML = "";
  let totalCalories = 0;
  let totalProtein = 0;

  meals.forEach(m => {
    totalCalories += m.calories;
    totalProtein += m.protein;
    mealList.innerHTML += `<li>${m.name} – ${m.calories} kcal | ${m.protein}g protein</li>`;
  });

  mealTotals.innerText = `🔥 ${totalCalories} kcal | 💪 ${totalProtein}g protein`;
}
renderMeals();
