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
  {
    catalogueNumber: "ARC-1901-001",
    reading: "History, Theories & Archives",
    title: "Portrait of an Unknown Woman",
    summary: "A rare studio portrait preserved as an archival print, capturing the mood of a forgotten subject.",
    date: "c. 1901",
    description:
      "Albumen silver print mounted on cardboard. The subject is seated beside a draped table, her gaze directed slightly off-camera. Studio markings on the reverse suggest a European metropolitan studio, though the exact location remains unconfirmed.",
    color: 0x5a3e2b,
  },
  {
    catalogueNumber: "ARC-1847-002",
    reading: "History, Theories & Archives",
    title: "Survey Map of the Northern Territories",
    summary: "A survey map recording contested borders and exploratory routes through remote terrain.",
    date: "1847",
    description:
      "Hand-drawn survey map in ink and watercolour on linen. Several place names have been crossed out and replaced, suggesting multiple expeditions revised the original survey. Some marked locations have no corresponding geographic record.",
    color: 0x2b3e2a,
  },
  {
    catalogueNumber: "ARC-1923-003",
    reading: "History, Theories & Archives",
    title: "Cipher Letter, Author Unknown",
    summary: "A coded dispatch that hints at a hidden correspondence and a lost rendezvous.",
    date: "March 14, 1923",
    description:
      "A single-page letter written in a substitution cipher that remains partially decoded. The visible decoded sections refer to a meeting, a transfer of materials, and a location identified only by coordinates. The paper bears traces of sealing wax.",
    color: 0x3e2a2a,
  },
  {
    catalogueNumber: "ARC-1888-004",
    reading: "History, Theories & Archives",
    title: "Brass Astronomical Instrument",
    summary: "An enigmatic brass device that connects early scientific craft with ritual geometry.",
    date: "c. 1888",
    description:
      "A hand-crafted brass instrument of uncertain purpose, featuring calibrated dials, an adjustable arm, and engraved symbols along the base. May be a custom navigational variant of an astrolabe. Maker's mark partially legible.",
    color: 0x3a3520,
  },
  {
    catalogueNumber: "ARC-1935-005",
    reading: "Images & Artifacts",
    title: "Field Notes — Expedition Karavan",
    summary: "A compact journal chronicling landscape observation and collector fieldwork.",
    date: "1935",
    description:
      "A handwritten field journal of 48 pages detailing observations from an unspecified expedition. Entries are dated but lack year references. The final entry breaks off mid-sentence. Includes pencil sketches of geological formations.",
    color: 0x2a3040,
  },
  {
    catalogueNumber: "ARC-1910-006",
    reading: "Images & Artifacts",
    title: "Glass Plate Negative — Village Square",
    summary: "A preserved winter street scene captured on fragile glass plate film.",
    date: "c. 1910",
    description:
      "Dry-plate glass negative depicting a village square in winter. Figures are blurred by motion, suggesting a long exposure. A banner strung between buildings carries text in a language as yet unidentified.",
    color: 0x20303a,
  },
  {
    catalogueNumber: "ARC-1799-007",
    reading: "Images & Artifacts",
    title: "Treaty Fragment",
    summary: "A torn vellum fragment preserving a moment of diplomatic tension.",
    date: "1799",
    description:
      "A fragment of what appears to be a formal treaty written on vellum. Three signatures are visible, though only one is legible. The document has been deliberately torn, removing approximately one-third of the original text.",
    color: 0x3a2a1a,
  },
  {
    catalogueNumber: "ARC-1955-008",
    reading: "Images & Artifacts",
    title: "Ceramic Vessel with Markings",
    summary: "A sealed vessel that hints at hidden contents and undeciphered symbols.",
    date: "origin unknown, acquired 1955",
    description:
      "A small terracotta vessel with a sealed lid, decorated with incised geometric markings. X-ray imaging suggests the vessel is not empty, but it has not been opened due to preservation concerns. The markings do not correspond to any known script.",
    color: 0x3a2f20,
  },
  {
    catalogueNumber: "ARC-1862-009",
    reading: "Simulations",
    title: "Coastal Survey — Southern Shore",
    summary: "A charted shoreline simulation mapping hidden shoals and anchorage hazards.",
    date: "1862",
    description:
      "Engraved map with hand-applied colour showing a coastline with depth soundings and anchorage markers. Several offshore features are marked with a symbol that does not appear in the map's own legend.",
    color: 0x1e2e38,
  },
  {
    catalogueNumber: "ARC-1940-010",
    reading: "Simulations",
    title: "Correspondence — Series VII",
    summary: "A wartime letter bundle simulating the quiet urgency of personal dispatch.",
    date: "1940–1941",
    description:
      "A bundle of 23 letters addressed to M. The letters describe wartime conditions, a separation, and repeated references to the package. No return address. Three letters show signs of having been opened and re-sealed.",
    color: 0x2e2020,
  },
  {
    catalogueNumber: "ARC-1897-011",
    reading: "Simulations",
    title: "Stereoscopic Pair — Interior Scene",
    summary: "A stereo photograph that recreates a layered interior archive environment.",
    date: "1897",
    description:
      "A stereoscopic photograph pair showing a room filled with shelves of specimens and instruments. A figure stands partially obscured by shadow in the far corner. The room has not been identified. Printed on the mount: Series 7, No. 44.",
    color: 0x2a2a3a,
  },
  {
    catalogueNumber: "ARC-1915-012",
    reading: "Simulations",
    title: "Technical Drawing — Unidentified Device",
    summary: "A mechanical schematic that simulates the precision of an unknown invention.",
    date: "c. 1915",
    description:
      "A detailed technical drawing in graphite showing three views of an unidentified mechanical device. Annotations include measurements and material specifications. No accompanying documentation explains its intended function.",
    color: 0x28302a,
  },

];

// ─── Artifact categories ──────────────────────────────────────────────────────

const HISTORY_ARTIFACTS = ARTIFACTS.slice(0, 4);
const IMAGES_ARTIFACTS = ARTIFACTS.slice(4, 8);
const SIMULATIONS_ARTIFACTS = ARTIFACTS.slice(8, 12);

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
const count = 3 + Math.floor(Math.random() * 3);
  let curX = -UNIT_W / 2 + 0.06;

  for (let i = 0; i < count; i++) {
    if (curX > UNIT_W / 2 - 0.1) break;

    const artifact = category[Math.floor(Math.random() * category.length)];
    const isBox   = Math.random() < 0.18;
    const w = isBox ? 0.13 + Math.random() * 0.07 : 0.04 + Math.random() * 0.07;
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

    curX += w + 0.01 + Math.random() * 0.035;
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
  buildShelfUnit( sideX, z, true, category);
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

  // Bulb mesh
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.07, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xfff0a0, emissive: 0xfff0a0, emissiveIntensity: 6 })
  );
  bulb.position.copy(light.position);
  scene.add(bulb);

  // Cord
  const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.004, 0.004, 0.65, 4),
    new THREE.MeshStandardMaterial({ color: 0x201a10 })
  );
  cord.position.set(0, 3.62, z);
  scene.add(cord);

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

const BOUND_X     =  AISLE_W / 2 - 0.25;
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
