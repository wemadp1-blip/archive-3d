import * as THREE from "three";
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";

// ─── Artifact data ────────────────────────────────────────────────────────────

interface Artifact {
  catalogueNumber: string;
  reading: string;
  title: string;
  summary: string;
  date: string;
  description: string;
  color: number;
}

const ARTIFACTS: Artifact[] = [
  // ─── Histories & Archives (First section) ────────────────────────────────
  {
    catalogueNumber: "ARC-HTA-001",
    reading: "Histories & Archives",
    title: "Theory's Curriculum",
    summary: "Architectural theory as a curated archive shaped by institutional priorities and frameworks.",
    date: "Bedford Press",
    description:
      "This text reflects on how architectural theory is structured, taught, and circulated. It suggests that theory itself is curated like an archive, shaped by institutional priorities and frameworks. What is included or excluded defines how architecture is understood.",
    color: 0x3a2a1a,
  },
  {
    catalogueNumber: "ARC-HTA-002",
    reading: "Histories & Archives",
    title: "The Power of the Archive and Its Limits",
    summary: "Archives as systems of power that determine what is remembered and constructed as history.",
    date: "Achille Mbembe",
    description:
      "Mbembe argues that archives are not neutral collections but systems of power that determine what is remembered. The archive transforms documents into authoritative records through processes of selection, classification, and control. It creates a constructed version of history rather than an objective one.",
    color: 0x2a2a3a,
  },
  {
    catalogueNumber: "ARC-HTA-003",
    reading: "Histories & Archives",
    title: "Liquid the Present of Architecture Theory",
    summary: "Architectural theory as unstable and constantly shifting with rapid cultural and technological changes.",
    date: "Santoyo-Orozco",
    description:
      "This text suggests that architectural theory is no longer stable but constantly shifting and 'liquid.' Contemporary discourse is shaped by rapid cultural, technological, and environmental changes. As a result, theory becomes less fixed and more adaptive over time.",
    color: 0x1e2e38,
  },
  {
    catalogueNumber: "ARC-HTA-004",
    reading: "Histories & Archives",
    title: "Archives of the Present-Future",
    summary: "New forms of archives needed to capture uncertain, ongoing environmental futures.",
    date: "Emily Eliza Scott",
    description:
      "Scott explores how climate change disrupts traditional ways of representing and archiving the world. Because it operates across massive scales, it resists clear visualization and documentation. New forms of 'archives' are needed to capture uncertain, ongoing environmental futures.",
    color: 0x3a3520,
  },

  // ─── Images & Artifacts (Middle section) ─────────────────────────────────
  {
    catalogueNumber: "ARC-IMG-001",
    reading: "Images & Artifacts",
    title: "Not Interesting: On the Limits of Criticism in Architecture",
    summary: "Architectural criticism beyond subjective 'interest' toward broader, deeper engagement.",
    date: "Andrew Atwood",
    description:
      "This text argues that architectural criticism often relies too heavily on what is considered 'interesting,' which limits deeper engagement with architecture. Atwood suggests that 'interest' is subjective and tied to attention, making it a weak foundation for critique. Instead, he pushes for a broader, less biased way of engaging architecture beyond immediate visual or cultural appeal.",
    color: 0x5a3e2b,
  },
  {
    catalogueNumber: "ARC-IMG-002",
    reading: "Images & Artifacts",
    title: "Some Notes on Making Images with Computers",
    summary: "Digital tools reshape architectural images from representation to active design instruments.",
    date: "Zeina Koreitem",
    description:
      "Koreitem explores how digital tools reshape the production of architectural images, shifting them from representation to active design tools. Images are no longer neutral outputs but are constructed through computational processes and decisions. This reframes images as artifacts that shape architectural thinking rather than simply depicting it.",
    color: 0x2b3e2a,
  },
  {
    catalogueNumber: "ARC-IMG-003",
    reading: "Images & Artifacts",
    title: "Log 56: CataLog (Chunk Models & Spectral Montages)",
    summary: "Experimental modeling techniques reshaping architecture through aggregation and data.",
    date: "Log Magazine",
    description:
      "This issue presents experimental modeling techniques like chunk models and photogrammetry as new ways of constructing architecture. These methods prioritize aggregation, data, and hybridization over traditional representation. Architecture becomes a simulated field of relationships rather than a fixed object.",
    color: 0x3e2a2a,
  },
  {
    catalogueNumber: "ARC-IMG-004",
    reading: "Images & Artifacts",
    title: "Seamless: Digital Collage and Dirty Realism in Architecture",
    summary: "Photography and digital collage as active constructors of architectural reality.",
    date: "Jesús Vassallo",
    description:
      "Vassallo examines how photography and digital collage have transformed architecture's relationship to reality. Images no longer document buildings but actively construct new forms of realism through editing and recombination. This creates a 'dirty realism' where truth is layered, mediated, and inseparable from image production.",
    color: 0x2a3040,
  },
  {
    catalogueNumber: "ARC-IMG-005",
    reading: "Images & Artifacts",
    title: "Fluctuations of Attention",
    summary: "How visual fragmentation reshapes architecture toward image-driven aesthetics.",
    date: "Michael Young",
    description:
      "Young discusses how contemporary visual culture fragments attention through constant exposure to images. Architecture is increasingly shaped by how it is viewed, circulated, and consumed visually rather than physically experienced. This shifts design toward image-driven aesthetics and away from stable meaning.",
    color: 0x20303a,
  },

  // ─── Simulations (Far section) ────────────────────────────────────────────
  {
    catalogueNumber: "ARC-SIM-001",
    reading: "Simulations",
    title: "Ecological World-Building",
    summary: "Virtual environments as tools for modeling ecological futures and environmental scenarios.",
    date: "Alice Bucknell",
    description:
      "Bucknell explores how virtual environments and science fiction can model ecological futures. These simulations allow designers to test environmental scenarios and imagine alternative worlds. World-building becomes a tool for understanding complex planetary systems and climate realities.",
    color: 0x1e2e38,
  },
  {
    catalogueNumber: "ARC-SIM-002",
    reading: "Simulations",
    title: "A Portal to Infinity",
    summary: "Simulations as open-ended systems that evolve without fixed outcomes or narratives.",
    date: "Ian Cheng (Interview)",
    description:
      "Cheng describes simulations as open-ended systems that evolve without fixed outcomes. His work focuses on creating worlds that generate their own narratives through interaction and time. This challenges traditional storytelling by emphasizing unpredictability and continuous change.",
    color: 0x2e2020,
  },
  {
    catalogueNumber: "ARC-SIM-003",
    reading: "Simulations",
    title: "Emissaries / A Trilogy of Simulations",
    summary: "Self-running simulated worlds with autonomous agents producing emergent behaviors.",
    date: "Ian Cheng",
    description:
      "This project presents self-running simulated worlds populated by autonomous agents. These environments operate without a fixed script, producing emergent behaviors and narratives. Architecture becomes a dynamic system rather than a static form.",
    color: 0x2a2a3a,
  },
  {
    catalogueNumber: "ARC-SIM-004",
    reading: "Simulations",
    title: "Simulating the In-Common",
    summary: "Simulation as a tool for modeling collective planetary conditions and shared futures.",
    date: "Marcelyn Gow",
    description:
      "Gow argues that simulation can model collective planetary conditions and shared futures. By using game environments and digital worlds, architects can visualize and engage with environmental and social systems. Simulation becomes a tool for knowledge production and collective understanding.",
    color: 0x28302a,
  },
  {
    catalogueNumber: "ARC-SIM-005",
    reading: "Simulations",
    title: "Screen Space, Real Time: Simulation as an Emergent Format",
    summary: "Real-time simulation as a new form of architectural representation and interaction.",
    date: "Damjan Jovanovic",
    description:
      "Jovanovic presents real-time simulation as a new form of architectural representation. Unlike static drawings, simulations allow for interaction, multiple scales, and continuous change within one model. This shifts architecture toward immersive, playable environments.",
    color: 0x3a2a1a,
  },
  {
    catalogueNumber: "ARC-SIM-006",
    reading: "Simulations",
    title: "Worldmaking & Simulation",
    summary: "Simulation as worldmaking practice where designers create entire systems over time.",
    date: "Damjan Jovanovic (Interview)",
    description:
      "This interview frames simulation as a practice of 'worldmaking,' where designers create entire systems rather than individual objects. It emphasizes the role of games and digital platforms in shaping new architectural approaches. Architecture expands into designing experiences and environments over time.",
    color: 0x3a3520,
  },
];

// ─── Artifact categories ──────────────────────────────────────────────────────

// ─── Artifact categories ──────────────────────────────────────────────────────

const HISTORY_ARTIFACTS = ARTIFACTS.slice(0, 4);
const IMAGES_ARTIFACTS = ARTIFACTS.slice(4, 9);
const SIMULATIONS_ARTIFACTS = ARTIFACTS.slice(9, 15);

// ─── Renderer ────────────────────────────────────────────────────────────────

const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050403);
scene.fog = new THREE.FogExp2(0x050402, 0.045);

const camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 80);
camera.position.set(0, 1.7, 1.5);

// ─── Controls ────────────────────────────────────────────────────────────────

const controls = new PointerLockControls(camera, renderer.domElement);
const keys: Record<string, boolean> = {};
document.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  if (e.code === "KeyC" && panelVisible) hidePanel();
});
document.addEventListener("keyup",   (e) => { keys[e.code] = false; });

const startEl  = document.getElementById("start")!;
const enterBtn = document.getElementById("enter-btn")!;

enterBtn.addEventListener("click", () => controls.lock());

controls.addEventListener("lock", () => {
  startEl.style.display = "none";
  document.body.classList.add("locked");
});
controls.addEventListener("unlock", () => {
  if (!panelVisible) startEl.style.display = "flex";
  document.body.classList.remove("locked");
});

// ─── Layout constants ─────────────────────────────────────────────────────────

const AISLE_W    = 3.0;
const SHELF_H    = 3.2;
const SHELF_D    = 0.55;
const UNIT_W     = 2.2;
const NUM_UNITS  = 5;
const CORRIDOR_L = NUM_UNITS * UNIT_W;

// ─── Materials ───────────────────────────────────────────────────────────────

const mkStd = (color: number, roughness = 0.88, metalness = 0) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });

const floorMat    = mkStd(0x0c0a07, 0.95);
const ceilMat     = mkStd(0x090807, 1.0);
const wallMat     = mkStd(0x0d0b08, 1.0);
const shelfMat    = mkStd(0x18140e, 0.88);
const shelfEdgeMat = mkStd(0x221c12, 0.75, 0.05);

// ─── Environment ─────────────────────────────────────────────────────────────

// Floor
const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, CORRIDOR_L + 8), floorMat);
floor.rotation.x = -Math.PI / 2;
floor.position.z = -CORRIDOR_L / 2;
floor.receiveShadow = true;
scene.add(floor);

// Ceiling
const ceil = new THREE.Mesh(new THREE.PlaneGeometry(18, CORRIDOR_L + 8), ceilMat);
ceil.rotation.x = Math.PI / 2;
ceil.position.set(0, 3.9, -CORRIDOR_L / 2);
scene.add(ceil);

// Walls
const backWall = new THREE.Mesh(new THREE.PlaneGeometry(18, 4.5), wallMat);
backWall.position.set(0, 2.25, -(CORRIDOR_L + 2));
scene.add(backWall);

const frontWall = new THREE.Mesh(new THREE.PlaneGeometry(18, 4.5), wallMat);
frontWall.rotation.y = Math.PI;
frontWall.position.set(0, 2.25, 3);
scene.add(frontWall);

([-6, 6] as const).forEach((x) => {
  const w = new THREE.Mesh(new THREE.PlaneGeometry(CORRIDOR_L + 8, 4.5), wallMat);
  w.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
  w.position.set(x, 2.25, -CORRIDOR_L / 2);
  scene.add(w);
});

// ─── Archival Details ─────────────────────────────────────────────────────────

// Section dividers with brass plaques
const sectionLabels = [
  { z: -1.1, label: "HISTORIES & ARCHIVES" },
  { z: -3.3, label: "IMAGES & ARTIFACTS" },
  { z: -5.5, label: "SIMULATIONS" }
];

sectionLabels.forEach(({ z }) => {
  // Arch-like divider beam
  const divider = new THREE.Mesh(new THREE.BoxGeometry(12, 0.15, 0.4), shelfEdgeMat);
  divider.position.set(0, 3.6, z);
  scene.add(divider);

  // Brass plaque
  const plaque = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.4, 0.08), mkStd(0x8b7355, 0.6, 0.3));
  plaque.position.set(0, 3.2, z);
  scene.add(plaque);
});

// Railing posts along the sides (like a reading room barrier)
const railMat = mkStd(0x1a1410, 0.75, 0.1);
for (let i = 0; i < NUM_UNITS; i++) {
  const z = -(i * UNIT_W) - UNIT_W * 0.5;
  [-7.5, 7.5].forEach((x) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.2, 0.08), railMat);
    post.position.set(x, 0.6, z);
    scene.add(post);
  });
}

// Floor trim/border at edges
const floorTrim = mkStd(0x050403, 0.98);
for (let i = 0; i < NUM_UNITS; i++) {
  const z = -(i * UNIT_W) - UNIT_W * 0.5;
  [-8, 8].forEach((x) => {
    const trim = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, UNIT_W), floorTrim);
    trim.position.set(x, 0.01, z);
    scene.add(trim);
  });
}

// Case details on walls - decorative metal inlays
const caselineColor = mkStd(0x3a2a1a, 0.7, 0.2);
[-6, 6].forEach((x) => {
  for (let i = 0; i < NUM_UNITS * 2; i++) {
    const z = -(i * UNIT_W / 2) - UNIT_W * 0.5;
    const line = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.02), caselineColor);
    line.position.set(x, 2.2 + (i % 2) * 0.5, z);
    line.rotation.z = x < 0 ? 0 : Math.PI;
    scene.add(line);
  }
});

// ─── Shelf unit builder ───────────────────────────────────────────────────────

const artifactMeshes: THREE.Mesh[] = [];
const artifactMap = new Map<THREE.Mesh, Artifact>();
const originalColors = new Map<THREE.Mesh, THREE.Color>();

function buildShelfUnit(x: number, z: number, flipFacing: boolean, category: Artifact[]) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  if (flipFacing) group.rotation.y = Math.PI;
  scene.add(group);

  const SHELVES = 4;
  const shelfSpacing = (SHELF_H - 0.2) / SHELVES;

  // Side panels
  for (const sx of [-UNIT_W / 2, UNIT_W / 2]) {
    const side = new THREE.Mesh(new THREE.BoxGeometry(0.04, SHELF_H, SHELF_D), shelfEdgeMat);
    side.position.set(sx, SHELF_H / 2, 0);
    side.castShadow = true;
    side.receiveShadow = true;
    group.add(side);
  }

  // Horizontal shelves
  for (let i = 0; i <= SHELVES; i++) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(UNIT_W, 0.04, SHELF_D), shelfMat);
    shelf.position.set(0, i * shelfSpacing + 0.1, 0);
    shelf.castShadow = true;
    shelf.receiveShadow = true;
    group.add(shelf);
  }

  // Back panel
  const back = new THREE.Mesh(new THREE.BoxGeometry(UNIT_W, SHELF_H, 0.03), shelfMat);
  back.position.set(0, SHELF_H / 2, -SHELF_D / 2 + 0.015);
  group.add(back);

  // Items on each shelf
  for (let i = 0; i < SHELVES; i++) {
    const shelfY = i * shelfSpacing + 0.1 + 0.04;
    const maxH   = shelfSpacing - 0.06;
    placeItems(group, shelfY, maxH, category);
  }
}

function placeItems(group: THREE.Group, shelfY: number, maxH: number, category: Artifact[]) {
const count = 6 + Math.floor(Math.random() * 4);
  let curX = -UNIT_W / 2 + 0.06;

  for (let i = 0; i < count; i++) {
    if (curX > UNIT_W / 2 - 0.1) break;

    const artifact = category[Math.floor(Math.random() * category.length)];
    const isBox   = Math.random() < 0.15;
    const w = isBox ? 0.1 + Math.random() * 0.05 : 0.03 + Math.random() * 0.04;
    const h = Math.min(maxH * 0.55 + Math.random() * maxH * 0.38, maxH - 0.04);
    const d = SHELF_D * (isBox ? 0.68 : 0.5) + Math.random() * 0.06;

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(artifact.color),
      roughness: 0.85 + Math.random() * 0.1,
    });

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(curX + w / 2, shelfY + h / 2, (Math.random() - 0.5) * 0.04);
    mesh.rotation.z = (Math.random() - 0.5) * 0.06;
    mesh.castShadow = false;
    mesh.receiveShadow = false;
    group.add(mesh);

    artifactMeshes.push(mesh);
    artifactMap.set(mesh, artifact);
    originalColors.set(mesh, mat.color.clone());

    curX += w + 0.005 + Math.random() * 0.015;
  }
}

// Place shelf units
for (let i = 0; i < NUM_UNITS; i++) {
  const z    = -(i * UNIT_W) - UNIT_W * 0.5;
  const sideX = AISLE_W / 2 + SHELF_D / 2;
  let category: Artifact[];
  if (i < 2) category = HISTORY_ARTIFACTS;
  else if (i < 4) category = IMAGES_ARTIFACTS;
  else category = SIMULATIONS_ARTIFACTS;
  buildShelfUnit(-sideX, z, false, category);
  buildShelfUnit( sideX, z, false, category);
}

// ─── Lighting ─────────────────────────────────────────────────────────────────

scene.add(new THREE.AmbientLight(0x2a1e0c, 0.8));
scene.add(new THREE.HemisphereLight(0x3a2810, 0x080604, 0.4));

const lightZPositions = [-1.5, -5, -8.5, -12];

lightZPositions.forEach((z) => {
  // Main ceiling pendant — very strong
  const light = new THREE.PointLight(0xd07820, 5, 10, 1.6);
  light.position.set(0, 3.3, z);
  scene.add(light);

  // Bulb visuals removed for cleaner aesthetic

  // Wide fill lights aimed at the shelves on each side
  const fillL = new THREE.PointLight(0xb05e18, 2.0, 4.5, 1.8);
  fillL.position.set(-(AISLE_W / 2 + 0.3), 2.0, z);
  scene.add(fillL);

  const fillR = new THREE.PointLight(0xb05e18, 2.0, 4.5, 1.8);
  fillR.position.set(AISLE_W / 2 + 0.3, 2.0, z);
  scene.add(fillR);

  const lowL = new THREE.PointLight(0x904c10, 1.2, 3.0, 2.0);
  lowL.position.set(-(AISLE_W / 2), 1.2, z);
  scene.add(lowL);

  const lowR = new THREE.PointLight(0x904c10, 1.2, 3.0, 2.0);
  lowR.position.set(AISLE_W / 2, 1.2, z);
  scene.add(lowR);
});

// ─── Hover / Interaction ──────────────────────────────────────────────────────

const raycaster     = new THREE.Raycaster();
const screenCenter  = new THREE.Vector2(0, 0);
let hoveredMesh: THREE.Mesh | null = null;
let panelVisible    = false;

const interactHint = document.getElementById("interact-hint")!;
const panel        = document.getElementById("artifact-panel")!;
const panelCat     = document.getElementById("panel-catalogue")!;
const panelReading = document.getElementById("panel-reading")!;
const panelTitle   = document.getElementById("panel-title")!;
const panelSummary = document.getElementById("panel-summary")!;
const panelDate    = document.getElementById("panel-date")!;
const panelDesc    = document.getElementById("panel-desc")!;
const panelClose   = document.getElementById("panel-close")!;

function showPanel(artifact: Artifact) {
  panelCat.textContent     = artifact.catalogueNumber;
  panelReading.textContent = artifact.reading;
  panelTitle.textContent   = artifact.title;
  panelSummary.textContent = artifact.summary;
  panelDate.textContent    = artifact.date;
  panelDesc.textContent    = artifact.description;
  panel.classList.add("visible");
  panelVisible = true;
  interactHint.classList.remove("visible");
}

function hidePanel() {
  panel.classList.remove("visible");
  panelVisible = false;
  controls.lock();
}

panelClose.addEventListener("click", hidePanel);

function setHover(mesh: THREE.Mesh | null) {
  if (hoveredMesh && hoveredMesh !== mesh) {
    const mat  = hoveredMesh.material as THREE.MeshStandardMaterial;
    const orig = originalColors.get(hoveredMesh);
    if (orig) mat.color.copy(orig);
    mat.emissive.set(0, 0, 0);
    mat.emissiveIntensity = 0;
  }
  hoveredMesh = mesh;
  if (mesh) {
    const mat = mesh.material as THREE.MeshStandardMaterial;
    mat.emissive.set(0.28, 0.18, 0.06);
    mat.emissiveIntensity = 0.7;
    interactHint.classList.add("visible");
  } else {
    interactHint.classList.remove("visible");
  }
}

// ─── Player lights ───────────────────────────────────────────────────────────

// Soft ambient fill — small sphere of light around player
const playerFill = new THREE.PointLight(0xffe8c0, 1.2, 3.5, 2.0);
scene.add(playerFill);

// Flashlight — spotlight in camera look direction
const flashlight = new THREE.SpotLight(0xfff5e0, 55, 25, Math.PI * 0.25, 0.35, 1.2);
flashlight.castShadow = false;
const flashlightTarget = new THREE.Object3D();
scene.add(flashlightTarget);
scene.add(flashlight);
flashlight.target = flashlightTarget;

// ─── Movement ────────────────────────────────────────────────────────────────

const velocity  = new THREE.Vector3();
const direction = new THREE.Vector3();
const clock     = new THREE.Clock();

const BOUND_X     =  AISLE_W / 2 - 0.4;
const BOUND_Z_MAX =  2.2;
const BOUND_Z_MIN = -(CORRIDOR_L + 1.8);

let eWasDown = false;
let bobTime = 0;

function animate() {
  requestAnimationFrame(animate);
  const delta = Math.min(clock.getDelta(), 0.05); // cap delta to avoid jumps

  if (controls.isLocked) {
    // Smooth acceleration / deceleration
    const speed = 3.6;
    const damping = 8; // lower = more glide
    direction.z = (keys["KeyW"] || keys["ArrowUp"]    ? 1 : 0)
                - (keys["KeyS"] || keys["ArrowDown"]  ? 1 : 0);
    direction.x = (keys["KeyD"] || keys["ArrowRight"] ? 1 : 0)
                - (keys["KeyA"] || keys["ArrowLeft"]  ? 1 : 0);
    direction.normalize();

    velocity.z += (-direction.z * speed - velocity.z) * damping * delta;
    velocity.x += (-direction.x * speed - velocity.x) * damping * delta;

    controls.moveForward(-velocity.z * delta);
    controls.moveRight(-velocity.x * delta);

    camera.position.x = Math.max(-BOUND_X, Math.min(BOUND_X, camera.position.x));
    camera.position.z = Math.max(BOUND_Z_MIN, Math.min(BOUND_Z_MAX, camera.position.z));

    // Subtle head bob when moving
    const moving = Math.abs(velocity.z) + Math.abs(velocity.x) > 0.15;
    if (moving) bobTime += delta * 2.2;
    const bob = moving ? Math.sin(bobTime * Math.PI) * 0.018 : 0;
    camera.position.y += (1.7 + bob - camera.position.y) * 12 * delta;

    // Update player lights
    playerFill.position.copy(camera.position);

    flashlight.position.copy(camera.position);
    const lookDir = new THREE.Vector3();
    camera.getWorldDirection(lookDir);
    flashlightTarget.position.copy(camera.position).addScaledVector(lookDir, 5);

    // Raycast hover
    raycaster.setFromCamera(screenCenter, camera);
    const hits = raycaster.intersectObjects(artifactMeshes, false);
    const hit  = hits.length > 0 && hits[0].distance < 2.4
      ? (hits[0].object as THREE.Mesh)
      : null;
    setHover(hit);

    // Examine on E
    const eDown = !!keys["KeyE"];
    if (eDown && !eWasDown && hoveredMesh && !panelVisible) {
      const artifact = artifactMap.get(hoveredMesh);
      if (artifact) showPanel(artifact);
    }
    eWasDown = eDown;
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
