/* Udemy Library Pro v3 - style.css */

:root{
  --bg:#0f172a;
  --panel:#172554;
  --panel2:#1e293b;
  --card:#111827;
  --accent:#3b82f6;
  --accent2:#22c55e;
  --text:#f8fafc;
  --muted:#94a3b8;
  --border:#334155;
  --radius:16px;
}

*{margin:0;padding:0;box-sizing:border-box}
body{
  font-family:Inter,system-ui,sans-serif;
  background:linear-gradient(135deg,#0f172a,#111827);
  color:var(--text);
  min-height:100vh;
}

.topbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  padding:24px 32px;
  border-bottom:1px solid var(--border);
  background:rgba(15,23,42,.85);
  position:sticky;
  top:0;
  backdrop-filter:blur(12px);
  z-index:20;
}

.brand h1{font-size:2rem}
.brand p{color:var(--muted);margin-top:6px}

.search-area input{
  width:420px;
  max-width:100%;
  padding:14px 18px;
  border-radius:999px;
  border:1px solid var(--border);
  background:#0b1220;
  color:#fff;
  outline:none;
}

.stats{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:18px;
  padding:24px 32px;
}

.stat{
  background:var(--panel2);
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:20px;
}

.stat h3{font-size:.9rem;color:var(--muted)}
.stat p{font-size:2rem;font-weight:700;margin-top:8px}

.container{
  display:grid;
  grid-template-columns:260px 1fr;
  gap:24px;
  padding:0 32px 32px;
}

.sidebar .panel{
  background:var(--panel2);
  border:1px solid var(--border);
  border-radius:var(--radius);
  padding:20px;
  position:sticky;
  top:110px;
}

.sidebar h2{margin-bottom:16px}

#cats button{
  width:100%;
  text-align:left;
  padding:10px 12px;
  margin-bottom:8px;
  border:none;
  border-radius:10px;
  background:#1f2937;
  color:#fff;
  cursor:pointer;
}

#cats button:hover,
#cats button.active{
  background:var(--accent);
}

.toolbar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
  flex-wrap:wrap;
  gap:12px;
}

.actions{
  display:flex;
  gap:10px;
}

select,button{
  padding:10px 14px;
  border-radius:10px;
  border:1px solid var(--border);
  background:#1f2937;
  color:#fff;
  cursor:pointer;
}

.course-grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(320px,1fr));
  gap:20px;
}

.card{
  background:var(--card);
  border:1px solid var(--border);
  border-radius:18px;
  padding:20px;
  transition:.25s;
}

.card:hover{
  transform:translateY(-4px);
  border-color:var(--accent);
}

.card-header{
  display:flex;
  justify-content:space-between;
  gap:12px;
  margin-bottom:16px;
}

.title{
  font-size:1.05rem;
  line-height:1.4;
}

.category{
  background:var(--accent);
  padding:4px 10px;
  border-radius:999px;
  font-size:.75rem;
  white-space:nowrap;
}

.meta{
  display:grid;
  gap:8px;
  color:var(--muted);
  font-size:.92rem;
  margin-bottom:18px;
}

.buttons{
  display:flex;
  gap:10px;
}

.buttons a,
.buttons button{
  flex:1;
  text-align:center;
  text-decoration:none;
}

.open{
  background:var(--accent);
  color:white;
  padding:10px;
  border-radius:10px;
}

.fav{
  background:var(--accent2);
  border:none;
}

footer{
  border-top:1px solid var(--border);
  margin-top:32px;
  padding:20px 32px;
  display:flex;
  justify-content:space-between;
  color:var(--muted);
}

@media(max-width:900px){
  .container{
    grid-template-columns:1fr;
  }
  .sidebar .panel{
    position:static;
  }
  .topbar{
    flex-direction:column;
    align-items:flex-start;
  }
  .search-area{
    width:100%;
  }
  .search-area input{
    width:100%;
  }
  footer{
    flex-direction:column;
    gap:8px;
  }
}
