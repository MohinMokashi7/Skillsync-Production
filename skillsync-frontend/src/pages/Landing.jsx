import { Link } from "react-router-dom";


function Landing() {
  

  


  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans">

      {/* HERO SECTION */}
      <section className="relative text-center pt-28 pb-40 px-6 overflow-hidden">

        {/* Soft Top Light Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-60"></div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e293b] leading-tight tracking-tight relative z-20">
          Find Your Perfect Project Team.
          <br />
          <span className="text-[#2563eb]">Build Together.</span>
        </h1>

        <div className="relative z-20 mt-12">
          <Link
  to="/login"
  className="inline-block 
             bg-[#ffc33d] hover:bg-[#f0b429] 
             text-[#1e293b] 
             font-bold 
             px-10 py-3.5 
             rounded-xl 
             shadow-[0_6px_0_#d9a021] 
             hover:shadow-[0_4px_0_#d9a021]
             transition-all 
             duration-200 
             active:translate-y-1"
>
  Get Started
</Link>

        </div>

        {/* Realistic Wave Background */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 
                        w-[160%] h-[520px] 
                        bg-gradient-to-b from-[#eaf2ff] to-[#dbeafe] 
                        rounded-[100%] 
                        z-0 blur-[2px]">
        </div>

      </section>

      {/* CARDS SECTION */}
      <section className="relative z-10 px-6 md:px-12 pb-28 -mt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          <Card 
            icon="🚀" 
            title="Hackathons" 
            desc="Build fast. Compete smarter." 
          />
          <Card 
            icon="🎓" 
            title="Capstone Projects" 
            desc="Collaborate for academic success." 
          />
          <Card 
            icon="💡" 
            title="Startup Ideas" 
            desc="Turn ideas into products." 
          />

        </div>
      </section>
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="bg-white 
                    rounded-2xl 
                    shadow-xl shadow-blue-100/40 
                    p-10 
                    text-center 
                    border border-slate-100 
                    flex flex-col items-center
                    transition-all duration-300
                    hover:-translate-y-2
                    hover:shadow-2xl hover:shadow-blue-200/50">

      <div className="text-5xl mb-6 drop-shadow-sm">{icon}</div>

      <h3 className="text-xl font-bold text-[#1e293b]">
        {title}
      </h3>

      <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-[220px]">
        {desc}
      </p>

     <Link
  to="/login"
  className="mt-8 px-8 py-2.5 
             border border-[#d1e4ff] 
             text-[#4a90e2] 
             font-semibold 
             rounded-lg 
             bg-[#f5f9ff] 
             hover:bg-[#ebf3ff] 
             hover:shadow-sm
             transition-all duration-200 inline-block"
>
  Explore Teams
</Link>
    </div>
  );
}

export default Landing;
