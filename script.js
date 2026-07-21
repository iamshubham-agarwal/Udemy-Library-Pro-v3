/* ==========================================
   Udemy Library Pro V4
   Part 1 - Core Engine
========================================== */

const searchInput = document.getElementById("search");
const courseContainer = document.getElementById("courses");
const statsContainer = document.getElementById("stats");
const categoryContainer = document.getElementById("cats");
const sortSelect = document.getElementById("sort");
const resultCount = document.getElementById("resultCount");

let courses = [];
let filteredCourses = [];

let currentCategory = "All";
let currentView = "all";

const state = {
    search: "",
    sort: "title"
};

/* ============================= */

async function loadCourses() {

    try {

        const response = await fetch("data/courses.json");

        if (!response.ok) {
            throw new Error("Unable to load data/courses.json");
        }

        courses = await response.json();

        courses = courses.map(course => ({
            ...course,
            progress: Math.min(
                Number(course.completion_percent || 0),
                100
            ),
            favorite: false
        }));

        filteredCourses = [...courses];

        init();

    } catch (err) {

        console.error(err);

        courseContainer.innerHTML = `
            <div style="padding:40px;color:white">
                <h2>Unable to load courses.</h2>
                <p>${err.message}</p>
            </div>
        `;

    }

}

/* ============================= */

function init() {

    attachEvents();

    updateAll();

}

/* ============================= */

function attachEvents() {

    searchInput.addEventListener("input", e => {

        state.search = e.target.value
            .trim()
            .toLowerCase();

        applyFilters();

    });

    sortSelect.addEventListener("change", e => {

        state.sort = e.target.value;

        applyFilters();

    });

    document.querySelectorAll(".nav-btn").forEach(btn => {

        btn.addEventListener("click", () => {

            document
                .querySelectorAll(".nav-btn")
                .forEach(b => b.classList.remove("active"));

            btn.classList.add("active");

            currentView = btn.dataset.filter;

            applyFilters();

        });

    });

}

/* ============================= */

function updateAll() {

    applyFilters();

}

/* ============================= */

function applyFilters() {

    filteredCourses = courses.filter(course => {

        const text = (

            course.title +

            " " +

            course.category +

            " " +

            (course.instructors || []).join(" ")

        ).toLowerCase();

        if (state.search) {

            if (!text.includes(state.search)) {

                return false;

            }

        }

        if (currentCategory !== "All") {

            if (course.category !== currentCategory) {

                return false;

            }

        }

        switch (currentView) {

            case "completed":
                return course.progress === 100;

            case "progress":
                return (
                    course.progress > 0 &&
                    course.progress < 100
                );

            case "favorites":
                return course.favorite;

        }

        return true;

    });

    sortCourses();

    renderStats();

    renderCategories();

    renderCourses();

}

/* ============================= */

function sortCourses() {

    switch (state.sort) {

        case "rating":

            filteredCourses.sort(
                (a, b) => (b.rating || 0) - (a.rating || 0)
            );

            break;

        case "reviews":

            filteredCourses.sort(
                (a, b) => (b.reviews || 0) - (a.reviews || 0)
            );

            break;

        case "progress":

            filteredCourses.sort(
                (a, b) => b.progress - a.progress
            );

            break;

        case "recent":

            filteredCourses.sort((a, b) => {

                return new Date(
                    b.last_accessed || 0
                ) - new Date(
                    a.last_accessed || 0
                );

            });

            break;

        default:

            filteredCourses.sort(
                (a, b) => a.title.localeCompare(b.title)
            );

    }

}

/* ==========================================
   These functions will be added
   in Part 2
========================================== */

/* ==============================
   DASHBOARD
============================== */

function renderStats() {

    const total = courses.length;

    const completed = courses.filter(c => c.progress === 100).length;

    const progress = courses.filter(c =>
        c.progress > 0 &&
        c.progress < 100
    ).length;

    const avgRating = (
        courses.reduce((s, c) => s + (c.rating || 0), 0) / total
    ).toFixed(2);

    statsContainer.innerHTML = `

    <div class="stat-card">
        <div class="stat-label">Total Courses</div>
        <div class="stat-value">${total}</div>
    </div>

    <div class="stat-card">
        <div class="stat-label">Completed</div>
        <div class="stat-value">${completed}</div>
    </div>

    <div class="stat-card">
        <div class="stat-label">In Progress</div>
        <div class="stat-value">${progress}</div>
    </div>

    <div class="stat-card">
        <div class="stat-label">Average Rating</div>
        <div class="stat-value">${avgRating}</div>
    </div>

    `;

}

/* ==============================
   CATEGORIES
============================== */

function renderCategories() {

    const cats = [
        "All",
        ...new Set(
            courses.map(c => c.category)
        )
    ].sort();

    categoryContainer.innerHTML = cats.map(cat => `

        <div
            class="category"
            data-category="${cat}"
        >
            ${cat}
        </div>

    `).join("");

    categoryContainer
        .querySelectorAll(".category")
        .forEach(btn => {

            btn.onclick = () => {

                currentCategory = btn.dataset.category;

                renderCategories();

                applyFilters();

            };

            if (btn.dataset.category === currentCategory) {

                btn.style.background = "#4f8cff";

            }

        });

}

/* ==============================
   COURSES
============================== */

function renderCourses() {

    resultCount.textContent =
        `${filteredCourses.length} Courses`;

    if (!filteredCourses.length) {

        courseContainer.innerHTML = `

        <h2 style="color:white">
            No courses found.
        </h2>

        `;

        return;

    }

    courseContainer.innerHTML =
        filteredCourses.map(course => `

<div class="course-card">

<div class="course-thumb">

🎓

</div>

<div class="course-body">

<div class="course-title">

${course.title}

</div>

<div class="course-instructor">

${(course.instructors || []).join(", ")}

</div>

<div class="course-meta">

<div>

⭐ ${course.rating ?? "-"}

</div>

<div>

${course.reviews ?? 0} reviews

</div>

</div>

<div class="badges">

<span class="badge">

${course.category}

</span>

</div>

<div style="margin-top:10px">

<div style="
background:#24324f;
height:10px;
border-radius:999px;
overflow:hidden;
">

<div style="
width:${course.progress}%;
height:100%;
background:#4f8cff;
">

</div>

</div>

<div style="
margin-top:8px;
font-size:13px;
color:#a7b1c2;
">

${course.progress}% Complete

</div>

</div>

<a
href="${course.url}"
target="_blank"
style="
margin-top:18px;
display:inline-block;
padding:12px 16px;
background:#4f8cff;
color:white;
border-radius:12px;
text-decoration:none;
font-weight:600;
text-align:center;
">

Open Course

</a>

</div>

</div>

`).join("");

}

/* ========================================== */

loadCourses();
