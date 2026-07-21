let courses=[],filtered=[];
const el=id=>document.getElementById(id);

fetch('data/courses.json')
.then(r=>r.json())
.then(data=>{
 courses=data;
 filtered=[...courses];
 buildCategories();
 render();
});

function buildCategories(){
 const wrap=el('cats');
 const cats=['All',...new Set(courses.map(c=>c.category||'Other'))].sort();
 wrap.innerHTML='';
 cats.forEach(cat=>{
   const b=document.createElement('button');
   b.textContent=cat;
   b.onclick=()=>{
      document.querySelectorAll('#cats button').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      filtered=cat==='All'?courses:courses.filter(c=>(c.category||'Other')===cat);
      applySearch();
   };
   if(cat==='All') b.classList.add('active');
   wrap.appendChild(b);
 });
 el('search').addEventListener('input',applySearch);
 el('sort').addEventListener('change',sortCourses);
 updateStats();
}
function applySearch(){
 const q=el('search').value.toLowerCase();
 let arr=filtered.filter(c=>
   (c.title||'').toLowerCase().includes(q)||
   (Array.isArray(c.instructors)?c.instructors.join(','):'').toLowerCase().includes(q)
 );
 render(arr);
}
function sortCourses(){
 applySearch();
}
function render(arr=filtered){
 const sort=el('sort').value;
 arr=[...arr];
 if(sort==='title')arr.sort((a,b)=>a.title.localeCompare(b.title));
 if(sort==='rating')arr.sort((a,b)=>(b.rating||0)-(a.rating||0));
 if(sort==='reviews')arr.sort((a,b)=>(b.reviews||0)-(a.reviews||0));
 el('resultCount').textContent=arr.length;
 const grid=el('courses');
 grid.innerHTML='';
 arr.forEach(c=>{
   const d=document.createElement('div');
   d.className='card';
   d.innerHTML=`<div class="card-header"><h3>${c.title}</h3><span class="category">${c.category||'Other'}</span></div>
   <div class="meta">
   <div>👨‍🏫 ${(c.instructors||[]).join(', ')}</div>
   <div>⭐ ${c.rating??'-'} | 💬 ${c.reviews??0}</div>
   <div>⏱ ${c.content_length||''}</div>
   <div>📈 ${c.completion_percent??0}%</div>
   </div>
   <div class="buttons"><a class="open" href="${c.url}" target="_blank">Open Course</a></div>`;
   grid.appendChild(d);
 });
 updateStats(arr);
}
function updateStats(arr=courses){
 const avg=(arr.reduce((s,c)=>s+(c.rating||0),0)/(arr.length||1)).toFixed(2);
 el('stats').innerHTML=`
 <div class="stat"><h3>Total Courses</h3><p>${courses.length}</p></div>
 <div class="stat"><h3>Showing</h3><p>${arr.length}</p></div>
 <div class="stat"><h3>Categories</h3><p>${new Set(courses.map(c=>c.category)).size}</p></div>
 <div class="stat"><h3>Avg Rating</h3><p>${avg}</p></div>`;
}
