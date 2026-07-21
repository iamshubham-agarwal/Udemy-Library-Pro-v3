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

function renderStats() {}

function renderCategories() {}

function renderCourses() {}

/* ========================================== */

loadCourses();
