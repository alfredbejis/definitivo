// --- 1. INITIALIZATION & ICONS ---
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    document.getElementById('year').textContent = new Date().getFullYear();
    init3D();
    renderServices();
});

// --- 2. THREE.JS 3D ENERGY FIELD ---
function init3D() {
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    
    // Fog for depth
    scene.fog = new THREE.Fog('#050505', 5, 30);

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 14);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const count = 2500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for(let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 25; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 3; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xccff00,
        size: 0.06,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const clock = new THREE.Clock();

    function animate() {
        const time = clock.getElapsedTime();
        
        // Wave Logic
        const positions = points.geometry.attributes.position.array;
        
        for(let i = 0; i < count; i++) {
            const x = positions[i*3];
            const z = positions[i*3+2];
            // Update Y
            positions[i*3+1] = Math.sin(x * 0.4 + time * 0.8) * 1.2 + 
                               Math.cos(z * 0.3 + time * 0.6) * 1.2 + 
                               Math.sin(x * 0.1 + z * 0.1 + time * 1.5) * 0.5;
        }
        points.geometry.attributes.position.needsUpdate = true;
        
        // Rotate entire system slowly
        points.rotation.y = time * 0.08;
        
        // Pulse size
        const pulse = (Math.sin(time * 2) + 1) * 0.5; 
        material.size = 0.05 + (pulse * 0.02);

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- 3. NAVIGATION & SCROLLING ---
function navigateToSection(id) {
    const mainView = document.getElementById('view-home');
    const legalView = document.getElementById('legal-views-container');
    const mobileMenu = document.getElementById('mobile-menu');

    // If in legal view, switch back to home
    if (mainView.classList.contains('hidden')) {
        mainView.classList.remove('hidden');
        legalView.classList.add('hidden');
        window.scrollTo(0,0);
    }

    // Close mobile menu if open
    mobileMenu.classList.add('hidden');

    // Scroll to section
    setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Social Dropdown
const dropdownBtn = document.getElementById('social-dropdown-btn');
const dropdown = document.getElementById('social-dropdown');
const chevron = document.getElementById('chevron-icon');

dropdownBtn.addEventListener('click', () => {
    const isOpen = !dropdown.classList.contains('invisible');
    if(isOpen) {
        dropdown.classList.add('invisible', 'opacity-0', 'scale-95');
        chevron.classList.remove('rotate-180');
    } else {
        dropdown.classList.remove('invisible', 'opacity-0', 'scale-95');
        chevron.classList.add('rotate-180');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- 4. SERVICES DATA RENDERING ---
function renderServices() {
    const container = document.getElementById('services-grid');
    const services = [
        { title: "Auditorías Energéticas", desc: "Análisis exhaustivo de consumo para identificar oportunidades de ahorro y eficiencia energética.", icon: "clipboard-check", color: "text-neon-green" },
        { title: "Monitorización", desc: "Sistemas inteligentes para centralizar la gestión, optimizar el consumo y reducir costes en tiempo real.", icon: "activity", color: "text-neon-cyan" },
        { title: "CAEs", desc: "Monetizamos tus ahorros gestionando los Certificados de Ahorro Energético de tu empresa.", icon: "badge-euro", color: "text-neon-purple" },
        { title: "Aerotermia", desc: "Aprovechamos la energía del aire para climatización, eliminando la dependencia de combustibles fósiles.", icon: "thermometer-sun", color: "text-yellow-400" },
        { title: "Iluminación LED", desc: "Proyectos de sustitución tecnológica para reducir drásticamente el consumo y mejorar la calidad lumínica.", icon: "lightbulb", color: "text-white" },
        { title: "Movilidad Eléctrica", desc: "Infraestructuras de recarga de vehículos para facilitar la transición hacia una flota sostenible.", icon: "car", color: "text-blue-400" },
        { title: "Huella de Carbono", desc: "Medición y consultoría para cumplir con los alcances 1, 2 y 3 de sostenibilidad corporativa.", icon: "leaf", color: "text-green-500" },
        { title: "Geotermia", desc: "Energía renovable de alta eficiencia que genera calor y electricidad aprovechando el subsuelo.", icon: "flame", color: "text-orange-500" },
        { title: "Mini Eólica", desc: "Generación distribuida a pequeña escala para autoconsumo eficiente, ideal para zonas ventosas.", icon: "wind", color: "text-cyan-200" },
        { title: "Hidrógeno Verde", desc: "Soluciones avanzadas de energía limpia para descarbonizar procesos industriales complejos.", icon: "droplets", color: "text-blue-300" },
        { title: "Baterías de Condensadores", desc: "Eliminamos las penalizaciones por energía reactiva en tu factura mediante compensación técnica.", icon: "battery", color: "text-red-400" },
        { title: "Pack Sostenibilidad", desc: "Proyectos integrales diseñados 100% a la medida de las necesidades estratégicas de tu cliente.", icon: "package", color: "text-purple-400" }
    ];

    services.forEach((s, i) => {
        const card = document.createElement('div');
        card.className = `group relative bg-dark-800/40 border border-white/5 hover:border-white/20 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-dark-800/60 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] reveal delay-${Math.min(i*100, 300)}`;
        card.innerHTML = `
            <div class="mb-4 md:mb-6 flex items-center justify-between">
                <div class="p-2 md:p-3 rounded-xl bg-white/5 ${s.color}">
                    <i data-lucide="${s.icon}" class="w-6 h-6 md:w-7 md:h-7"></i>
                </div>
                <div class="opacity-0 group-hover:opacity-100 transition-opacity text-white/20 hidden md:block">
                    <i data-lucide="${s.icon}" class="w-12 h-12"></i>
                </div>
            </div>
            <h3 class="text-lg md:text-xl font-display font-bold text-white mb-2 md:mb-3 group-hover:text-neon-green transition-colors">
                ${s.title}
            </h3>
            <p class="text-gray-400 text-xs md:text-sm leading-relaxed">
                ${s.desc}
            </p>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

// --- 5. SCROLL ANIMATIONS (REVEAL & PROCESS LINE) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Process Line Animation
window.addEventListener('scroll', () => {
    const container = document.getElementById('process-container');
    const line = document.getElementById('process-line');
    const steps = document.querySelectorAll('.process-step');
    
    if(!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate progress (0 to 1)
    let progress = (windowHeight / 2 - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    
    line.style.height = `${progress * 100}%`;

    // Active steps logic
    const stepSize = 1 / 4;
    steps.forEach((step, index) => {
        const isReached = progress >= (stepSize * (index + 0.5)); // slightly earlier trigger
        const card = step.querySelector('.step-card');
        const node = step.querySelector('.step-node');
        const title = step.querySelector('h3');
        const icon = step.querySelector('i');

        if (isReached) {
            card.classList.remove('opacity-50', 'border-white/5');
            card.classList.add('border-neon-green/30', 'bg-white/5', 'shadow-[0_0_30px_rgba(0,0,0,0.5)]');
            
            title.classList.remove('text-gray-500');
            title.classList.add('text-white');
            
            node.classList.remove('bg-dark-900', 'border-gray-800', 'grayscale', 'opacity-30', 'scale-90');
            node.classList.add('bg-dark-900', 'border-neon-green', 'shadow-[0_0_20px_rgba(204,255,0,0.8)]', 'scale-110');
            
            icon.classList.remove('text-gray-600');
            icon.classList.add('text-neon-green');
        } else {
            // Reset if scrolled up
            card.classList.add('opacity-50', 'border-white/5');
            card.classList.remove('border-neon-green/30', 'bg-white/5', 'shadow-[0_0_30px_rgba(0,0,0,0.5)]');
            
            title.classList.add('text-gray-500');
            title.classList.remove('text-white');
            
            node.classList.add('bg-dark-900', 'border-gray-800', 'grayscale', 'opacity-30', 'scale-90');
            node.classList.remove('bg-dark-900', 'border-neon-green', 'shadow-[0_0_20px_rgba(204,255,0,0.8)]', 'scale-110');
            
            icon.classList.add('text-gray-600');
            icon.classList.remove('text-neon-green');
        }
    });
});

// --- 6. MODAL LOGIC ---
const modal = document.getElementById('contact-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalContent = document.getElementById('modal-content');
const openBtn = document.getElementById('open-modal-btn');
const closeBtn = document.getElementById('close-modal-btn');

function openModal() {
    modal.classList.remove('hidden');
    // trigger reflow
    void modal.offsetWidth;
    modalBackdrop.classList.remove('opacity-0');
    modalContent.classList.remove('opacity-0', 'scale-90', 'translate-y-4');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalBackdrop.classList.add('opacity-0');
    modalContent.classList.add('opacity-0', 'scale-90', 'translate-y-4');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }, 300);
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);


// --- 7. LEGAL PAGES LOGIC ---
const legalData = {
    legal: { title: "Aviso Legal", content: `<p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002...</p><h3>Identificación del titular</h3><p><strong>Denominación social:</strong> Partner Energético<br><strong>Domicilio:</strong> Valencia, España<br><strong>Email:</strong> energialfred@gmail.com</p><h3>Propiedad intelectual</h3><p>Todos los contenidos están protegidos.</p>` },
    privacy: { title: "Política de Privacidad", content: `<p>En cumplimiento del Reglamento (UE) 2016/679 (GDPR)...</p><h3>Responsable</h3><p>Partner Energético, Valencia.</p><h3>Finalidades</h3><p>Gestionar solicitudes.</p>` },
    cookies: { title: "Política de Cookies", content: `<p>Esta web usa cookies para mejorar la experiencia.</p><h3>¿Qué es una cookie?</h3><p>Fichero descargado al acceder a webs.</p>` },
    terms: { title: "Condiciones de Uso", content: `<p>El acceso atribuye la condición de usuario.</p><h3>Obligaciones</h3><p>Uso correcto del sitio web.</p>` }
};

function showLegal(type) {
    const mainView = document.getElementById('view-home');
    const legalView = document.getElementById('legal-views-container');
    const data = legalData[type];

    if(!data) return;

    legalView.innerHTML = `
        <div class="max-w-4xl mx-auto animate-fade-in">
            <button onclick="navigateToSection('home')" class="flex items-center gap-2 text-neon-green hover:text-white transition-colors mb-8 group">
                <i data-lucide="arrow-left" class="w-4 h-4 group-hover:-translate-x-1 transition-transform"></i>
                Volver al inicio
            </button>
            <div class="glass-panel p-8 md:p-12 rounded-3xl border border-white/10">
                <h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-2">${data.title}</h1>
                <p class="text-sm text-gray-500 mb-8">Última actualización: <strong>23/10/2025</strong></p>
                <div class="prose prose-invert prose-p:text-gray-300 prose-headings:text-neon-green prose-headings:font-display max-w-none space-y-6">
                    ${data.content}
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();

    mainView.classList.add('hidden');
    legalView.classList.remove('hidden');
    window.scrollTo(0,0);
}
