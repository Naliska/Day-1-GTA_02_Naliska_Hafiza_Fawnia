// Data contoh tugas mahasiswa (sesuai kebutuhan Student Task Planner).
const tasks = [
  { id: 1, title: "Menyelesaikan rangkuman Pengantar TIK", dueDate: "2026-11-10", completed: false },
  { id: 2, title: "Membuat desain poster tipografi", dueDate: "2026-11-12", completed: false },
  { id: 3, title: "Mengerjakan latihan pemrograman dasar", dueDate: "2026-11-08", completed: true },
  { id: 4, title: "Mengumpulkan tugas Audio Digital", dueDate: "2026-11-15", completed: false },
  { id: 5, title: "Mempersiapkan presentasi kelompok", dueDate: "2026-11-18", completed: true }
];

let currentFilter = "all";

const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");
const todayLabel = document.getElementById("today-label");

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric", month: "long", year: "numeric"
  }).format(date);
}

function renderSummary() {
  const completed = tasks.filter(task => task.completed).length;
  totalCount.textContent = tasks.length;
  pendingCount.textContent = tasks.length - completed;
  completedCount.textContent = completed;
}

function renderTasks() {
  const visibleTasks = tasks.filter(task => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  taskList.innerHTML = "";
  emptyState.hidden = visibleTasks.length !== 0;

  visibleTasks.forEach(task => {
    const item = document.createElement("article");
    item.className = `task-item${task.completed ? " is-completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Tandai ${task.title} sebagai selesai`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      render();
    });

    const content = document.createElement("div");
    content.className = "task-content";

    const title = document.createElement("p");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent = `Tenggat: ${formatDate(task.dueDate)}`;

    const status = document.createElement("span");
    status.className = `status ${task.completed ? "completed" : "pending"}`;
    status.textContent = task.completed ? "Completed" : "Pending";

    content.append(title, meta);
    item.append(checkbox, content, status);
    taskList.appendChild(item);
  });

  renderSummary();
}

function render() {
  renderTasks();
}

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn === button);
    });
    renderTasks();
  });
});

todayLabel.textContent = new Intl.DateTimeFormat("id-ID", {
  weekday: "long", day: "numeric", month: "long"
}).format(new Date());

render();
