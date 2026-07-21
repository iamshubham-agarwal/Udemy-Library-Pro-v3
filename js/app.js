
// ======================================
// Udemy Library Pro V4
// app.js
// ======================================

const App = {

    courses: [],
    filtered: [],

    state: {

        search: "",
        category: "all",
        sort: "title"

    },

    async init(){

        try{

            const res = await fetch("data/courses.json");

            this.courses = await res.json();

            this.filtered = [...this.courses];

            Stats.render(this.filtered);

            Categories.render(this.courses);

            Render.courses(this.filtered);

            this.bindEvents();

        }

        catch(err){

            console.error(err);

            document.getElementById("courses").innerHTML =
            `
            <div class="empty-state">
                <i class="fa-solid fa-triangle-exclamation"></i>
                <h2>Unable to load courses</h2>
                <p>Check data/courses.json</p>
            </div>
            `;

        }

    },

    bindEvents(){

        document
            .getElementById("search")
            .addEventListener("input",(e)=>{

                this.state.search=e.target.value;

                Search.update();

            });

        document
            .getElementById("sort")
            .addEventListener("change",(e)=>{

                this.state.sort=e.target.value;

                Search.update();

            });

    }

};

window.addEventListener("DOMContentLoaded",()=>{

    App.init();

});
