import * as THREE from "three";

const mount = document.querySelector("#scene");
const playButton = document.querySelector("#play-toggle");
const playLabel = document.querySelector("#play-label");
const speedSlider = document.querySelector("#speed");
const speedValue = document.querySelector("#speed-value");
const manButton = document.querySelector("#choose-man");
const womanButton = document.querySelector("#choose-woman");
const dancerCaption = document.querySelector("#dancer-caption");
const emoteCaption = document.querySelector("#emote-caption");
const emoteButtons = document.querySelectorAll(".emote-button");
const readyButton = document.querySelector("#ready-toggle");
const readyLabel = document.querySelector("#ready-label");
const queueStatus = document.querySelector("#queue-status");
const stageStatus = document.querySelector("#stage-status");
const stage = document.querySelector(".stage");
const quickEmoteToggle = document.querySelector("#quick-emote-toggle");
const quickEmoteMenu = document.querySelector("#quick-emote-menu");
const arenaSelect = document.querySelector("#arena-select");
const bpmSlider = document.querySelector("#bpm");
const bpmValue = document.querySelector("#bpm-value");
const trackSelect = document.querySelector("#track-select");
const musicToggle = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");
const artistName = document.querySelector("#artist-name");
const fitColor = document.querySelector("#fit-color");
const poseToggle = document.querySelector("#pose-toggle");
const partyToggle = document.querySelector("#party-toggle");
const partyCount = document.querySelector("#party-count");
const modeLabel = document.querySelector("#mode-label");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 2.15, 8.1);
camera.lookAt(0, 1.65, 0);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
mount.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xf4e8c8, 0x313b32, 2.15));
const keyLight = new THREE.DirectionalLight(0xffefce, 3.4);
keyLight.position.set(-3, 7, 5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(1024, 1024);
keyLight.shadow.camera.left = -3.5;
keyLight.shadow.camera.right = 3.5;
keyLight.shadow.camera.top = 4.5;
keyLight.shadow.camera.bottom = -1;
keyLight.shadow.bias = -0.00035;
keyLight.shadow.normalBias = 0.025;
keyLight.shadow.radius = 4;
scene.add(keyLight);
const rimLight = new THREE.DirectionalLight(0xb9d9a2, 3.1);
rimLight.position.set(4, 4, -4);
scene.add(rimLight);
const warmLight = new THREE.PointLight(0xffc2a0, 4, 9);
warmLight.position.set(-3, 1.8, 2.5);
scene.add(warmLight);
const stageLights = [
  new THREE.PointLight(0x62d9f5, 10, 8),
  new THREE.PointLight(0xf5ce63, 8, 8),
  new THREE.PointLight(0xa36eff, 9, 8)
];
stageLights[0].position.set(-3, 3.7, 0.5);
stageLights[1].position.set(3, 3.2, 0);
stageLights[2].position.set(0, 4, -2.5);
stageLights.forEach((light) => scene.add(light));

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(1.22, 64),
  new THREE.MeshStandardMaterial({ color: 0x778651, roughness: 0.88, metalness: 0.04, transparent: true, opacity: 0.16 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0.018;
ground.receiveShadow = true;
scene.add(ground);

const character = new THREE.Group();
character.scale.setScalar(1.12);
scene.add(character);

const materials = {
  skin: new THREE.MeshPhysicalMaterial({ color: 0xc18d70, roughness: 0.68, sheen: 0.16, sheenColor: 0xe5b9a1, sheenRoughness: 0.72 }),
  skinLight: new THREE.MeshPhysicalMaterial({ color: 0xd49b7e, roughness: 0.7, sheen: 0.1, sheenColor: 0xe5b9a1, sheenRoughness: 0.76 }),
  shirt: new THREE.MeshPhysicalMaterial({ color: 0xe9e2d5, roughness: 0.76, sheen: 0.12, sheenColor: 0xffffff, sheenRoughness: 0.8 }),
  jacket: new THREE.MeshPhysicalMaterial({ color: 0x63754f, roughness: 0.76, sheen: 0.08, sheenColor: 0xffffff, sheenRoughness: 0.82 }),
  seam: new THREE.MeshStandardMaterial({ color: 0x47573a, roughness: 0.85 }),
  pants: new THREE.MeshStandardMaterial({ color: 0x283334, roughness: 0.8 }),
  skirt: new THREE.MeshStandardMaterial({ color: 0x665064, roughness: 0.82 }),
  shoes: new THREE.MeshStandardMaterial({ color: 0xe9dfc7, roughness: 0.58 }),
  hair: new THREE.MeshStandardMaterial({ color: 0x30251e, roughness: 0.78 }),
  hairHighlight: new THREE.MeshStandardMaterial({ color: 0x493629, roughness: 0.82 }),
  accent: new THREE.MeshStandardMaterial({ color: 0xd5f263, roughness: 0.62 }),
  metal: new THREE.MeshStandardMaterial({ color: 0xd6b36b, metalness: 0.58, roughness: 0.32 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x29251f, roughness: 0.42 }),
  eyeWhite: new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.32 }),
  iris: new THREE.MeshStandardMaterial({ color: 0x674332, roughness: 0.38 }),
  mouth: new THREE.MeshStandardMaterial({ color: 0x713e36, roughness: 0.72 })
};

const garmentMaterials = {
  jacket: new THREE.MeshPhysicalMaterial({ color: 0x63754f, roughness: 0.78, sheen: 0.08, sheenColor: 0xffffff, sheenRoughness: 0.82, side: THREE.DoubleSide }),
  shirt: new THREE.MeshPhysicalMaterial({ color: 0xe9e2d5, roughness: 0.8, sheen: 0.1, sheenColor: 0xffffff, sheenRoughness: 0.82, side: THREE.DoubleSide }),
  detail: new THREE.MeshStandardMaterial({ color: 0x394732, roughness: 0.78, side: THREE.DoubleSide })
};

function ellipsoid(parent, material, position, scale, segments = 32) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, segments, Math.max(16, Math.floor(segments * 0.75))), material);
  mesh.position.set(...position);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function limb(parent, material, start, end, radiusStart, radiusEnd = radiusStart, segments = 16) {
  const from = new THREE.Vector3(...start);
  const to = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(to, from);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radiusEnd, radiusStart, direction.length(), segments + 8, 2),
    material
  );
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  parent.add(mesh);
  ellipsoid(parent, material, start, [radiusStart, radiusStart, radiusStart], 22);
  ellipsoid(parent, material, end, [radiusEnd, radiusEnd, radiusEnd], 22);
  return mesh;
}

// Shape the jacket and undershirt as fitted surfaces instead of stacked torso blobs.
ellipsoid(character, materials.pants, [0, 1.03, 0], [0.39, 0.32, 0.24]);
const torsoProfile = [
  [0, 0.99], [0.27, 1], [0.32, 1.04], [0.34, 1.1], [0.335, 1.16],
  [0.315, 1.25], [0.302, 1.34], [0.305, 1.43], [0.316, 1.53],
  [0.337, 1.63], [0.36, 1.73], [0.38, 1.82], [0.39, 1.9],
  [0.37, 1.95], [0.33, 2], [0.25, 2.025], [0, 2.035]
].map(([radius, y]) => new THREE.Vector2(radius, y));
const jacketTorso = new THREE.Mesh(new THREE.LatheGeometry(new THREE.SplineCurve(torsoProfile).getPoints(64), 56), garmentMaterials.jacket);
jacketTorso.scale.z = 0.64;
jacketTorso.castShadow = true;
jacketTorso.receiveShadow = true;
character.add(jacketTorso);
function torsoFrontDepth(y) {
  const index = torsoProfile.findIndex((point) => point.y >= y);
  if (index <= 0) return torsoProfile[Math.max(index, 0)].x * 0.64 + 0.02;
  const lower = torsoProfile[index - 1];
  const upper = torsoProfile[index];
  const blend = (y - lower.y) / (upper.y - lower.y);
  return THREE.MathUtils.lerp(lower.x, upper.x, blend) * 0.64 + 0.02;
}
const shirtShape = new THREE.Shape();
shirtShape.moveTo(-0.044, 0.22);
shirtShape.lineTo(-0.025, 0.22);
shirtShape.lineTo(0, 0.17);
shirtShape.lineTo(0.025, 0.22);
shirtShape.lineTo(0.044, 0.22);
shirtShape.lineTo(0.053, 0.15);
shirtShape.lineTo(0.043, -0.19);
shirtShape.lineTo(0.032, -0.22);
shirtShape.lineTo(-0.032, -0.22);
shirtShape.lineTo(-0.043, -0.19);
shirtShape.lineTo(-0.053, 0.15);
shirtShape.closePath();
const shirtGeometry = new THREE.ShapeGeometry(shirtShape, 24);
const shirtPositions = shirtGeometry.attributes.position;
for (let index = 0; index < shirtPositions.count; index += 1) {
  const worldY = 1.79 + shirtPositions.getY(index);
  shirtPositions.setZ(index, torsoFrontDepth(worldY));
}
shirtGeometry.computeVertexNormals();
const shirtPanel = new THREE.Mesh(shirtGeometry, garmentMaterials.shirt);
shirtPanel.position.y = 1.79;
shirtPanel.castShadow = true;
character.add(shirtPanel);
const collarShape = new THREE.Shape();
collarShape.moveTo(-0.105, 0.05);
collarShape.lineTo(-0.035, 0.065);
collarShape.lineTo(0, -0.025);
collarShape.lineTo(0.035, 0.065);
collarShape.lineTo(0.105, 0.05);
collarShape.lineTo(0.065, -0.045);
collarShape.lineTo(0, -0.09);
collarShape.lineTo(-0.065, -0.045);
collarShape.closePath();
const collarGeometry = new THREE.ShapeGeometry(collarShape, 16);
const collarPositions = collarGeometry.attributes.position;
for (let index = 0; index < collarPositions.count; index += 1) {
  const y = 2.045 + collarPositions.getY(index);
  collarPositions.setZ(index, torsoFrontDepth(Math.min(y, 2.025)) + 0.008);
}
collarGeometry.computeVertexNormals();
character.add(new THREE.Mesh(collarGeometry, garmentMaterials.shirt));
const belt = new THREE.Mesh(new THREE.TorusGeometry(0.286, 0.018, 10, 40), garmentMaterials.detail);
belt.position.set(0, 1.07, 0);
belt.scale.set(1, 1, 0.66);
belt.rotation.x = Math.PI / 2;
character.add(belt);
const beltBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.052, 0.022), materials.metal);
beltBuckle.position.set(0, 1.07, 0.19);
character.add(beltBuckle);
for (const y of [1.56, 1.69, 1.82]) {
  const z = torsoFrontDepth(y) + 0.01;
  ellipsoid(character, materials.metal, [0.025, y, z], [0.007, 0.007, 0.005], 16);
}
limb(character, materials.accent, [-0.19, 1.12, 0.215], [-0.12, 1.12, 0.215], 0.01, 0.01, 10);
limb(character, materials.seam, [-0.31, 1.73, 0.238], [-0.25, 1.24, 0.202], 0.006, 0.006, 8);
limb(character, materials.seam, [0.31, 1.73, 0.238], [0.25, 1.24, 0.202], 0.006, 0.006, 8);
limb(character, materials.seam, [-0.3, 1.1, 0.222], [0.3, 1.1, 0.222], 0.007, 0.007, 8);

// A jaunty, open-armed stance makes the continuous spin feel like a dance.
const leftArm = new THREE.Group();
leftArm.name = "leftArm";
leftArm.position.set(-0.31, 1.85, 0);
character.add(leftArm);
limb(leftArm, materials.jacket, [0, 0, 0], [-0.38, -0.31, 0.02], 0.115, 0.09);
limb(leftArm, materials.jacket, [-0.38, -0.31, 0.02], [-0.58, -0.06, 0.05], 0.085, 0.065);
limb(leftArm, materials.skin, [-0.58, -0.06, 0.05], [-0.67, 0.06, 0.08], 0.052, 0.047);
const rightArm = new THREE.Group();
rightArm.name = "rightArm";
rightArm.position.set(0.31, 1.85, 0);
character.add(rightArm);
limb(rightArm, materials.jacket, [0, 0, 0], [0.36, -0.33, 0.04], 0.115, 0.09);
limb(rightArm, materials.jacket, [0.36, -0.33, 0.04], [0.53, -0.06, 0.07], 0.085, 0.065);
limb(rightArm, materials.skin, [0.53, -0.06, 0.07], [0.59, 0.06, 0.09], 0.052, 0.047);
ellipsoid(leftArm, materials.jacket, [-0.58, -0.06, 0.05], [0.061, 0.044, 0.061]);
ellipsoid(rightArm, materials.jacket, [0.53, -0.06, 0.07], [0.061, 0.044, 0.061]);
ellipsoid(leftArm, materials.skin, [-0.69, 0.065, 0.095], [0.067, 0.055, 0.052]);
ellipsoid(rightArm, materials.skin, [0.61, 0.065, 0.105], [0.067, 0.055, 0.052]);
for (const fingerOffset of [-0.027, -0.009, 0.009, 0.027]) {
  ellipsoid(leftArm, materials.skin, [-0.69 + fingerOffset, 0.105, 0.107], [0.007, 0.022, 0.008], 18);
  ellipsoid(rightArm, materials.skin, [0.61 + fingerOffset, 0.105, 0.117], [0.007, 0.022, 0.008], 18);
}

// Stagger the feet for a grounded, mid-dance silhouette.
const leftLeg = new THREE.Group();
leftLeg.name = "leftLeg";
leftLeg.position.set(-0.18, 0.96, 0);
character.add(leftLeg);
limb(leftLeg, materials.pants, [0, 0, 0], [-0.02, -0.41, 0.025], 0.15, 0.105);
limb(leftLeg, materials.pants, [-0.02, -0.41, 0.025], [-0.16, -0.8, 0.13], 0.098, 0.075);
const rightLeg = new THREE.Group();
rightLeg.name = "rightLeg";
rightLeg.position.set(0.18, 0.96, 0);
character.add(rightLeg);
limb(rightLeg, materials.pants, [0, 0, 0], [0.04, -0.41, -0.01], 0.15, 0.105);
limb(rightLeg, materials.pants, [0.04, -0.41, -0.01], [0.18, -0.8, 0.08], 0.098, 0.075);
const leftShoe = new THREE.Group();
leftShoe.position.set(-0.16, -0.8, 0.13);
leftLeg.add(leftShoe);
ellipsoid(leftShoe, materials.shoes, [0, -0.055, 0.09], [0.12, 0.09, 0.23]);
ellipsoid(leftShoe, materials.dark, [0, -0.115, 0.09], [0.12, 0.03, 0.23]);
for (const laceZ of [0.035, 0.085, 0.135]) {
  limb(leftShoe, materials.eyeWhite, [-0.034, -0.005, laceZ], [0.034, -0.005, laceZ + 0.018], 0.004, 0.004, 6);
}
const rightShoe = new THREE.Group();
rightShoe.position.set(0.18, -0.8, 0.08);
rightLeg.add(rightShoe);
ellipsoid(rightShoe, materials.shoes, [0, -0.055, 0.09], [0.12, 0.09, 0.23]);
ellipsoid(rightShoe, materials.dark, [0, -0.115, 0.09], [0.12, 0.03, 0.23]);
for (const laceZ of [0.035, 0.085, 0.135]) {
  limb(rightShoe, materials.eyeWhite, [-0.034, -0.005, laceZ], [0.034, -0.005, laceZ + 0.018], 0.004, 0.004, 6);
}

const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.37, 0.25, 32, 3), materials.skirt);
skirt.name = "skirt";
skirt.position.y = 0.87;
skirt.castShadow = true;
skirt.visible = false;
character.add(skirt);
const skirtHem = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.012, 8, 36), materials.metal);
skirtHem.name = "skirtHem";
skirtHem.position.y = 0.745;
skirtHem.rotation.x = Math.PI / 2;
skirtHem.scale.z = 0.72;
skirtHem.visible = false;
character.add(skirtHem);
const longHair = new THREE.Group();
longHair.name = "longHair";
ellipsoid(longHair, materials.hair, [0, 2.39, -0.12], [0.196, 0.255, 0.105], 40);
ellipsoid(longHair, materials.hair, [0, 2.535, -0.015], [0.211, 0.137, 0.194], 40);
ellipsoid(longHair, materials.hair, [-0.16, 2.36, -0.015], [0.035, 0.19, 0.045], 32);
ellipsoid(longHair, materials.hair, [0.16, 2.36, -0.015], [0.035, 0.19, 0.045], 32);
ellipsoid(longHair, materials.hairHighlight, [0.075, 2.644, 0.035], [0.105, 0.027, 0.08], 28);
ellipsoid(longHair, materials.hair, [-0.052, 2.63, 0.13], [0.12, 0.037, 0.078], 32);
character.add(longHair);
longHair.visible = false;

// Neck, expressive face, and swept hair.
limb(character, materials.skin, [0, 2.03, 0], [0, 2.2, 0], 0.095, 0.095);
const headProfile = [
  [0, 2.105], [0.085, 2.115], [0.145, 2.17], [0.19, 2.27],
  [0.212, 2.38], [0.208, 2.48], [0.178, 2.56], [0.12, 2.625], [0.055, 2.65], [0, 2.655]
].map(([radius, y]) => new THREE.Vector2(radius, y));
const head = new THREE.Mesh(new THREE.LatheGeometry(new THREE.SplineCurve(headProfile).getPoints(48), 56), materials.skin);
head.scale.z = 0.93;
head.castShadow = true;
head.receiveShadow = true;
character.add(head);
ellipsoid(character, materials.skin, [-0.205, 2.38, 0.005], [0.038, 0.061, 0.034]);
ellipsoid(character, materials.skin, [0.205, 2.38, 0.005], [0.038, 0.061, 0.034]);
ellipsoid(character, materials.skinLight, [-0.207, 2.38, 0.025], [0.012, 0.025, 0.006], 20);
ellipsoid(character, materials.skinLight, [0.207, 2.38, 0.025], [0.012, 0.025, 0.006], 20);
const shortHair = new THREE.Group();
shortHair.name = "shortHair";
ellipsoid(shortHair, materials.hair, [0, 2.55, -0.01], [0.224, 0.145, 0.215], 36);
ellipsoid(shortHair, materials.hair, [-0.15, 2.53, 0.035], [0.085, 0.12, 0.18], 28);
ellipsoid(shortHair, materials.hair, [0.105, 2.64, 0.075], [0.155, 0.06, 0.14], 28);
ellipsoid(shortHair, materials.hair, [-0.035, 2.65, 0.08], [0.13, 0.055, 0.13], 28);
character.add(shortHair);
shortHair.visible = true;
for (const eyeX of [-0.079, 0.079]) {
  ellipsoid(character, materials.eyeWhite, [eyeX, 2.405, 0.184], [0.028, 0.019, 0.012], 28);
  ellipsoid(character, materials.iris, [eyeX, 2.404, 0.193], [0.01, 0.012, 0.005], 24);
  ellipsoid(character, materials.dark, [eyeX, 2.404, 0.197], [0.005, 0.008, 0.003], 20);
  ellipsoid(character, materials.eyeWhite, [eyeX - 0.003, 2.41, 0.201], [0.0025, 0.003, 0.001], 16);
  ellipsoid(character, materials.hair, [eyeX, 2.445, 0.177], [0.039, 0.008, 0.009], 24);
}
ellipsoid(character, materials.skinLight, [-0.12, 2.32, 0.157], [0.038, 0.019, 0.006], 24);
ellipsoid(character, materials.skinLight, [0.12, 2.32, 0.157], [0.038, 0.019, 0.006], 24);
ellipsoid(character, materials.skin, [0, 2.352, 0.197], [0.016, 0.04, 0.019], 28);
ellipsoid(character, materials.skinLight, [0, 2.35, 0.213], [0.008, 0.011, 0.004], 18);
ellipsoid(character, materials.skin, [0, 2.319, 0.209], [0.027, 0.017, 0.015], 28);
const smileCurve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-0.043, 2.285, 0.194),
  new THREE.Vector3(0, 2.274, 0.211),
  new THREE.Vector3(0.043, 2.285, 0.194)
]);
const smile = new THREE.Mesh(new THREE.TubeGeometry(smileCurve, 12, 0.006, 8, false), materials.mouth);
character.add(smile);

const partyDancers = [];
let partyMode = false;
function setPartyMode(enabled) {
  partyMode = enabled;
  partyDancers.forEach((dancer) => {
    scene.remove(dancer.group);
  });
  partyDancers.length = 0;
  character.scale.setScalar(enabled ? 0.86 : 1.12);
  if (!enabled) return;
  for (const [index, x] of [-1.62, 1.62].entries()) {
    const dancer = character.clone(true);
    dancer.scale.setScalar(0.7);
    dancer.position.set(x, 0, 0);
    dancer.rotation.y = index === 0 ? -0.42 : 0.42;
    const armA = dancer.getObjectByName("leftArm");
    const armB = dancer.getObjectByName("rightArm");
    const legA = dancer.getObjectByName("leftLeg");
    const legB = dancer.getObjectByName("rightLeg");
    scene.add(dancer);
    partyDancers.push({ group: dancer, armA, armB, legA, legB, phase: index * 1.8 });
  }
}

const shadow = new THREE.Mesh(
  new THREE.CircleGeometry(0.64, 48),
  new THREE.MeshBasicMaterial({ color: 0x050604, transparent: true, opacity: 0.27 })
);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.025;
shadow.scale.set(1.4, 0.72, 1);
scene.add(shadow);

let speed = Number(speedSlider.value);
let playing = true;
let dragging = false;
let previousX = 0;
let targetRotation = 0;
let womanSelected = false;
let selectedEmote = "groove";
let poseMode = false;
let playingBeforePose = true;
let musicContext;
let beatTimer;
const clock = new THREE.Clock();
const emotes = {
  groove: { label: "LOWKEY GROOVE", beat: 2.4, spin: 0.68, bounce: 0.045, arms: 0.42, legs: 0.22, sway: 0.065 },
  hype: { label: "SKYLINE", beat: 2.7, spin: 0.12, bounce: 0.09, arms: 0.32, legs: 0.3, sway: 0.04 },
  robot: { label: "GLITCH STEP", beat: 2.4, spin: 0.08, bounce: 0.018, arms: 0.32, legs: 0.18, sway: 0.01 },
  spin: { label: "ORBIT BREAK", beat: 1.8, spin: 1.8, bounce: 0.05, arms: 0.18, legs: 0.16, sway: 0.035 },
  "side-step": { label: "CROSSOVER", beat: 2.4, spin: 0.08, bounce: 0.035, arms: 0.22, legs: 0.38, sway: 0.09 }
};

function resize() {
  const { width, height } = mount.getBoundingClientRect();
  if (!width || !height) return;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(resize);
resizeObserver.observe(mount);
resize();

mount.addEventListener("pointerdown", (event) => {
  dragging = true;
  previousX = event.clientX;
  mount.setPointerCapture(event.pointerId);
});
mount.addEventListener("pointermove", (event) => {
  if (!dragging) return;
  const delta = event.clientX - previousX;
  targetRotation += delta * 0.012;
  previousX = event.clientX;
});
mount.addEventListener("pointerup", () => { dragging = false; });
mount.addEventListener("pointercancel", () => { dragging = false; });
mount.addEventListener("pointerleave", () => { dragging = false; });

playButton.addEventListener("click", () => {
  playing = !playing;
  playButton.classList.toggle("is-playing", playing);
  playButton.setAttribute("aria-label", playing ? "Pause emote" : "Resume emote");
  playLabel.textContent = playing ? "PAUSE EMOTE" : "PLAY EMOTE";
});

function updateSpeedDisplay() {
  speedValue.textContent = speed.toFixed(1);
  const percent = ((speed - Number(speedSlider.min)) / (Number(speedSlider.max) - Number(speedSlider.min))) * 100;
  speedSlider.style.background = `linear-gradient(to right, var(--lime) 0%, var(--lime) ${percent}%, #3d3e37 ${percent}%, #3d3e37 100%)`;
}

function chooseDancer(isWoman) {
  womanSelected = isWoman;
  womanButton.classList.toggle("is-selected", isWoman);
  womanButton.setAttribute("aria-pressed", String(isWoman));
  manButton.classList.toggle("is-selected", !isWoman);
  manButton.setAttribute("aria-pressed", String(!isWoman));
  dancerCaption.textContent = isWoman ? "02 — THE WOMAN" : "01 — THE GUY";
  skirt.visible = isWoman;
  skirtHem.visible = isWoman;
  longHair.visible = isWoman;
  shortHair.visible = !isWoman;
  materials.jacket.color.setHex(isWoman ? 0x647c86 : 0x63754f);
  garmentMaterials.jacket.color.setHex(isWoman ? 0x647c86 : 0x63754f);
  materials.pants.color.setHex(isWoman ? 0x45323b : 0x283334);
  materials.skirt.color.setHex(isWoman ? 0x604b62 : 0x665064);
  ground.material.color.setHex(isWoman ? 0xf08a72 : 0xc5e65a);
  if (fitColor) fitColor.value = `#${materials.jacket.color.getHexString()}`;
  partyDancers.forEach(({ group }) => {
    group.traverse((child) => {
      if (child.isMesh && child.material === materials.jacket) child.material.color.copy(materials.jacket.color);
      if (child.isMesh && child.material === materials.pants) child.material.color.copy(materials.pants.color);
      if (child.isMesh && child.material === materials.skirt) child.material.color.copy(materials.skirt.color);
      if (child.name === "skirt" || child.name === "skirtHem") child.visible = isWoman;
      if (child.name === "longHair") child.visible = isWoman;
      if (child.name === "shortHair") child.visible = !isWoman;
    });
  });
}

function selectEmote(emoteId) {
  if (!emotes[emoteId]) return;
  selectedEmote = emoteId;
  emoteButtons.forEach((button) => {
    const isSelected = button.dataset.emote === emoteId;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
  document.querySelectorAll("[data-quick-emote]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.quickEmote === emoteId);
  });
  emoteCaption.textContent = emotes[emoteId].label;
}

manButton.addEventListener("click", () => chooseDancer(false));
womanButton.addEventListener("click", () => chooseDancer(true));
emoteButtons.forEach((button) => {
  button.addEventListener("click", () => selectEmote(button.dataset.emote));
});
document.querySelectorAll("[data-quick-emote]").forEach((button) => {
  button.addEventListener("click", () => {
    selectEmote(button.dataset.quickEmote);
    quickEmoteMenu.hidden = true;
    quickEmoteToggle.setAttribute("aria-expanded", "false");
  });
});
quickEmoteToggle.addEventListener("click", () => {
  quickEmoteMenu.hidden = !quickEmoteMenu.hidden;
  quickEmoteToggle.setAttribute("aria-expanded", String(!quickEmoteMenu.hidden));
});
document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "q" && !event.repeat) quickEmoteToggle.click();
  const emoteIndex = Number(event.key) - 1;
  if (emoteIndex >= 0 && emoteIndex < emoteButtons.length) {
    selectEmote(emoteButtons[emoteIndex].dataset.emote);
  }
  if (event.key === "Escape") {
    quickEmoteMenu.hidden = true;
    quickEmoteToggle.setAttribute("aria-expanded", "false");
  }
});
readyButton.addEventListener("click", () => {
  const isReady = readyButton.getAttribute("aria-pressed") !== "true";
  readyButton.setAttribute("aria-pressed", String(isReady));
  readyButton.classList.toggle("is-ready", isReady);
  queueStatus.classList.toggle("is-ready", isReady);
  readyLabel.textContent = isReady ? "CANCEL READY" : "READY UP";
  queueStatus.lastChild.textContent = isReady ? " YOU'RE READY TO DANCE" : " YOUR STAGE IS WAITING";
  stageStatus.textContent = isReady ? "READY" : "LOBBY";
});
updateSpeedDisplay();
speedSlider.addEventListener("input", () => {
  speed = Number(speedSlider.value);
  updateSpeedDisplay();
});

arenaSelect.addEventListener("change", () => {
  const arenas = {
    neon: { floor: 0x778651, lights: [0x62d9f5, 0xf5ce63, 0xa36eff] },
    sunset: { floor: 0xb87955, lights: [0xff9b68, 0xffd36b, 0xe86d8e] },
    ice: { floor: 0x547c91, lights: [0x73ddff, 0xa5bdff, 0x8cf2da] }
  };
  const arena = arenas[arenaSelect.value];
  ground.material.color.setHex(arena.floor);
  stageLights.forEach((light, index) => light.color.setHex(arena.lights[index]));
  stage.dataset.arena = arenaSelect.value;
});

bpmSlider.addEventListener("input", () => {
  bpmValue.textContent = bpmSlider.value;
  if (musicContext && musicContext.state === "running") startBeatLoop();
});

function playBeat() {
  if (!musicContext || musicContext.state !== "running") return;
  const track = trackSelect.value;
  const now = musicContext.currentTime;
  const bass = musicContext.createOscillator();
  const gain = musicContext.createGain();
  bass.type = track === "arcade" ? "square" : "sine";
  bass.frequency.value = track === "chill" ? 110 : 55;
  gain.gain.setValueAtTime(track === "chill" ? 0.055 : 0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + (track === "chill" ? 0.55 : 0.22));
  bass.connect(gain);
  gain.connect(musicContext.destination);
  bass.start(now);
  bass.stop(now + (track === "chill" ? 0.56 : 0.24));
}

function startBeatLoop() {
  if (beatTimer) window.clearInterval(beatTimer);
  playBeat();
  beatTimer = window.setInterval(playBeat, 60000 / Number(bpmSlider.value));
}

musicToggle.addEventListener("click", async () => {
  try {
    if (!musicContext) {
      const AudioContextType = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextType) throw new Error("This browser does not support generated audio.");
      musicContext = new AudioContextType();
    }
    if (musicContext.state === "suspended") await musicContext.resume();
    const isPlaying = musicToggle.getAttribute("aria-pressed") === "true";
    if (isPlaying) {
      window.clearInterval(beatTimer);
      beatTimer = undefined;
      musicToggle.setAttribute("aria-pressed", "false");
      musicToggle.classList.remove("is-active");
      musicLabel.textContent = "START BEAT";
      return;
    }
    startBeatLoop();
    musicToggle.setAttribute("aria-pressed", "true");
    musicToggle.classList.add("is-active");
    musicLabel.textContent = "STOP BEAT";
  } catch (error) {
    console.error("Unable to play the generated beat:", error);
    musicLabel.textContent = "AUDIO UNAVAILABLE";
  }
});

trackSelect.addEventListener("change", () => {
  if (musicContext && musicToggle.getAttribute("aria-pressed") === "true") startBeatLoop();
});

artistName.addEventListener("input", () => {
  const name = artistName.value.trim().slice(0, 16) || "PLAYER ONE";
  document.querySelectorAll(".account-name, .party-player").forEach((label) => {
    label.firstChild.textContent = name;
  });
});

fitColor.addEventListener("input", () => {
  materials.jacket.color.set(fitColor.value);
  garmentMaterials.jacket.color.set(fitColor.value);
  materials.skirt.color.set(fitColor.value);
  document.documentElement.style.setProperty("--lime", fitColor.value);
});

poseToggle.addEventListener("click", () => {
  poseMode = !poseMode;
  if (poseMode) {
    playingBeforePose = playing;
    playing = false;
    poseToggle.setAttribute("aria-pressed", "true");
    poseToggle.classList.add("is-active");
    poseToggle.firstChild.textContent = "EXIT POSE";
    playButton.setAttribute("aria-label", "Resume emote");
    playLabel.textContent = "PLAY EMOTE";
    playButton.disabled = true;
    return;
  }
  playing = playingBeforePose;
  poseToggle.setAttribute("aria-pressed", "false");
  poseToggle.classList.remove("is-active");
  poseToggle.firstChild.textContent = "POSE MODE";
  playButton.disabled = false;
  playButton.setAttribute("aria-label", playing ? "Pause emote" : "Resume emote");
  playLabel.textContent = playing ? "PAUSE EMOTE" : "PLAY EMOTE";
});

partyToggle.addEventListener("click", () => {
  setPartyMode(partyToggle.getAttribute("aria-pressed") !== "true");
  partyToggle.setAttribute("aria-pressed", String(partyMode));
  partyToggle.classList.toggle("is-active", partyMode);
  partyToggle.querySelector("small").textContent = partyMode ? "2 GUEST DANCERS" : "ADD DANCERS";
  partyCount.textContent = partyMode ? "03 / 04" : "01 / 04";
  modeLabel.textContent = partyMode ? "PARTY SHOWCASE" : "SOLO SHOWCASE";
});

function render() {
  requestAnimationFrame(render);
  const delta = Math.min(clock.getDelta(), 0.05);
  const emote = emotes[selectedEmote];
  const rawBeat = clock.elapsedTime * speed * emote.beat * (Number(bpmSlider.value) / 112);
  const danceBeat = selectedEmote === "robot" ? Math.floor(rawBeat * 2) / 2 : rawBeat;
  if (playing && !dragging) targetRotation += delta * speed * emote.spin;
  character.rotation.y += (targetRotation - character.rotation.y) * Math.min(delta * 8, 1);
  character.position.y = playing ? Math.abs(Math.sin(danceBeat)) * emote.bounce : 0;
  character.position.x = playing && selectedEmote === "side-step" ? Math.sin(danceBeat) * 0.12 : 0;
  character.rotation.z = playing ? Math.sin(danceBeat / 2) * emote.sway : 0;
  const leftBeat = Math.sin(danceBeat);
  const rightBeat = Math.sin(danceBeat + 0.8);
  leftArm.rotation.z = playing ? -0.12 + leftBeat * emote.arms : 0;
  rightArm.rotation.z = playing ? 0.12 - rightBeat * emote.arms : 0;
  leftArm.rotation.x = playing ? Math.sin(danceBeat * 0.5 + 0.7) * emote.arms * 0.2 : 0;
  rightArm.rotation.x = playing ? Math.sin(danceBeat * 0.5 - 0.7) * emote.arms * 0.2 : 0;
  leftLeg.rotation.x = playing ? leftBeat * emote.legs : 0;
  rightLeg.rotation.x = playing ? -rightBeat * emote.legs : 0;
  if (selectedEmote === "hype") {
    leftArm.rotation.z = playing ? -0.88 + Math.sin(danceBeat) * 0.22 : -0.88;
    rightArm.rotation.z = playing ? 0.88 - Math.sin(danceBeat + Math.PI) * 0.22 : 0.88;
    character.rotation.z = playing ? Math.sin(danceBeat * 0.5) * 0.025 : 0;
  } else if (selectedEmote === "robot") {
    const robotPose = Math.floor(danceBeat * 1.5) % 4;
    leftArm.rotation.z = robotPose === 0 || robotPose === 3 ? -0.9 : 0.15;
    rightArm.rotation.z = robotPose === 1 || robotPose === 2 ? 0.9 : -0.15;
    leftArm.rotation.x = robotPose % 2 ? -0.3 : 0.3;
    rightArm.rotation.x = robotPose % 2 ? 0.3 : -0.3;
    character.rotation.z = robotPose % 2 ? 0.035 : -0.035;
  } else if (selectedEmote === "spin") {
    leftArm.rotation.z = playing ? -0.08 + leftBeat * 0.16 : 0;
    rightArm.rotation.z = playing ? 0.08 - rightBeat * 0.16 : 0;
  } else if (selectedEmote === "side-step") {
    leftArm.rotation.z = playing ? -0.38 + leftBeat * 0.22 : 0;
    rightArm.rotation.z = playing ? 0.38 - rightBeat * 0.22 : 0;
    character.rotation.z = playing ? Math.sin(danceBeat) * 0.09 : 0;
  } else {
    character.rotation.z = playing ? Math.sin(danceBeat / 2) * emote.sway : 0;
  }
  skirt.rotation.z = womanSelected && playing ? Math.sin(danceBeat) * 0.09 : 0;
  stageLights.forEach((light, index) => {
    const phase = danceBeat + index * (Math.PI * 2 / stageLights.length);
    light.intensity = 4.5 + Math.max(0, Math.sin(phase)) * 7;
    light.position.x = Math.sin(clock.elapsedTime * 0.7 + index * 2.2) * 3;
    light.position.z = Math.cos(clock.elapsedTime * 0.55 + index * 2.2) * 2.2;
  });
  partyDancers.forEach(({ group, armA, armB, legA, legB, phase }) => {
    const guestBeat = danceBeat + phase;
    group.position.y = playing ? Math.abs(Math.sin(guestBeat)) * emote.bounce : 0;
    group.rotation.y += delta * speed * emote.spin * (phase ? -0.7 : 0.7);
    if (armA) armA.rotation.z = playing ? -0.2 + Math.sin(guestBeat) * emote.arms : 0;
    if (armB) armB.rotation.z = playing ? 0.2 - Math.sin(guestBeat + 0.8) * emote.arms : 0;
    if (legA) legA.rotation.x = playing ? Math.sin(guestBeat) * emote.legs : 0;
    if (legB) legB.rotation.x = playing ? -Math.sin(guestBeat + 0.8) * emote.legs : 0;
  });
  shadow.material.opacity = 0.27 - Math.abs(character.position.y) * 0.6;
  renderer.render(scene, camera);
}

const loadingLabel = mount.querySelector(".loading-label");
loadingLabel?.remove();
render();
