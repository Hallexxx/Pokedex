import './App.css';

function App() {
  return (
      <nav className="navbar">
        <div class="logo">Alexandre Perez</div>
            <ul class="nav-list">
                <li class="menu-deroulant"><a href="/cv.pdf">Mon CV</a></li>
                <li class="menu-deroulant"><a href="#projects">Projets</a>
                    <ul class="sous">
                        <li><a href="#projects"><span class="hover-underline-animation">Paris 8</span></a></li>
                        <li><a href="#projects"><span class="hover-underline-animation">UberAlex</span></a></li>
                        <li><a href="#projects"><span class="hover-underline-animation">R6 Packs</span></a></li>
                    </ul>
                </li>
                <li class="menu-deroulant"><a href="/blog.html">Mon Blog</a></li>
                <li class="menu-deroulant"><a href="#contact">Contactez-moi</a></li>
                <li class="menu-deroulant"><a href="#contact">Mes réseaux</a>
                    <ul class="sous">
                        <li><a href="https://www.linkedin.com/in/alexandre-perez-b3309b267/"><span class="hover-underline-animation">LinkedIn</span></a></li>
                        <li><a href="https://profile.indeed.com/?hl=fr_FR&co=FR&from=gnav-jobseeker-profile--profile-one-frontend"><span class="hover-underline-animation">Indeed</span></a></li>
                        <li><a href="https://github.com/Hallexxx"><span class="hover-underline-animation">GitHub</span></a></li>
                    </ul>
                </li>
            </ul>
      </nav>
  );
}

export default App;
