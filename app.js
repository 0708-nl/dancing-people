import * as THREE from "three";

const mount = document.querySelector("#scene");
const playButton = document.querySelector("#play-toggle");
const playLabel = document.querySelector("#play-label");
const speedSlider = document.querySelector("#speed");
const speedValue = document.querySelector("#speed-value");
const manButton = document.querySelector("#choose-man");
const womanButton = document.querySelector("#choose-woman");
const skinButtons = document.querySelectorAll(".skin-button");
const hatButtons = document.querySelectorAll(".hat-button");
const emoteCount = document.querySelector("#emote-count");
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
const hairColor = document.querySelector("#hair-color");
const fitColor = document.querySelector("#fit-color");
const poseToggle = document.querySelector("#pose-toggle");
const partyToggle = document.querySelector("#party-toggle");
const partyCount = document.querySelector("#party-count");
const modeLabel = document.querySelector("#mode-label");
const storyAction = document.querySelector("#story-action");
const storyChapter = document.querySelector("#story-chapter");
const storyRivalLabel = document.querySelector("#story-rival-label");
const storyOpponent = document.querySelector("#story-opponent");
const storyDescription = document.querySelector("#story-description");
const storyStatus = document.querySelector("#story-status");
const battleDialogue = document.querySelector("#battle-dialogue");
const dialogueSpeaker = document.querySelector("#dialogue-speaker");
const dialogueLine = document.querySelector("#dialogue-line");
const battleTurn = document.querySelector("#battle-turn");
const storyProgress = document.querySelector("#story-progress");
const storyProgressLabel = document.querySelector("#story-progress-label");
const storyProgressFill = document.querySelector("#story-progress-fill");
const battleHealth = document.querySelector("#battle-health");
const battleAttacks = document.querySelector("#battle-attacks");
const attackButtons = document.querySelectorAll(".attack-button");
const playerHealthBar = document.querySelector("#player-health-bar");
const rivalHealthBar = document.querySelector("#rival-health-bar");
const playerHealthFill = document.querySelector("#player-health-fill");
const rivalHealthFill = document.querySelector("#rival-health-fill");
const playerHealthLabel = document.querySelector("#player-health-label");
const rivalHealthLabel = document.querySelector("#rival-health-label");
const rivalHealthName = document.querySelector("#rival-health-name");
const playerStaminaBar = document.querySelector("#player-stamina-bar");
const rivalStaminaBar = document.querySelector("#rival-stamina-bar");
const playerStaminaFill = document.querySelector("#player-stamina-fill");
const rivalStaminaFill = document.querySelector("#rival-stamina-fill");
const playerStaminaLabel = document.querySelector("#player-stamina-label");
const rivalStaminaLabel = document.querySelector("#rival-stamina-label");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 3, 8.1);
camera.lookAt(0, 1.4, 0);

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

const meadow = new THREE.Mesh(
  new THREE.PlaneGeometry(24, 12),
  new THREE.MeshStandardMaterial({ color: 0x596747, roughness: 1 })
);
meadow.rotation.x = -Math.PI / 2;
meadow.position.set(0, -0.12, -4.2);
meadow.receiveShadow = true;
scene.add(meadow);

const hillMaterial = new THREE.MeshStandardMaterial({ color: 0x65744b, roughness: 1 });
for (const hill of [
  { x: -4.5, y: -0.28, z: -4.1, sx: 3.4, sy: 0.75, sz: 1.45 },
  { x: 2.8, y: -0.35, z: -4.6, sx: 4.1, sy: 0.9, sz: 1.65 }
]) {
  const mound = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 20),
    hillMaterial
  );
  mound.position.set(hill.x, hill.y, hill.z);
  mound.scale.set(hill.sx, hill.sy, hill.sz);
  mound.receiveShadow = true;
  scene.add(mound);
}

const treeTrunkMaterial = new THREE.MeshStandardMaterial({ color: 0x594432, roughness: 1 });
const foliageMaterials = [
  new THREE.MeshStandardMaterial({ color: 0x405b39, roughness: 1 }),
  new THREE.MeshStandardMaterial({ color: 0x526b40, roughness: 1 }),
  new THREE.MeshStandardMaterial({ color: 0x68764a, roughness: 1 })
];
function addTree(x, z, scale = 1) {
  const tree = new THREE.Group();
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.2, 1.35, 9), treeTrunkMaterial);
  trunk.position.y = 0.66;
  trunk.castShadow = true;
  tree.add(trunk);

  const crownParts = [
    { x: 0, y: 1.62, z: 0, sx: 0.76, sy: 0.79, sz: 0.67, material: 0 },
    { x: -0.36, y: 1.43, z: 0.06, sx: 0.48, sy: 0.53, sz: 0.5, material: 1 },
    { x: 0.37, y: 1.48, z: -0.04, sx: 0.5, sy: 0.57, sz: 0.48, material: 2 },
    { x: 0.06, y: 2.02, z: -0.03, sx: 0.51, sy: 0.52, sz: 0.49, material: 1 }
  ];
  crownParts.forEach((part) => {
    const crown = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 16),
      foliageMaterials[part.material]
    );
    crown.position.set(part.x, part.y, part.z);
    crown.scale.set(part.sx, part.sy, part.sz);
    crown.castShadow = true;
    tree.add(crown);
  });
  scene.add(tree);
}

[
  [-4.1, -2.7, 1.1],
  [-2.9, -3.35, 0.82],
  [3.05, -3.15, 0.9],
  [4.2, -2.55, 1.12]
].forEach(([x, z, scale]) => addTree(x, z, scale));

const grassMaterials = [
  new THREE.MeshStandardMaterial({ color: 0x78834d, roughness: 1 }),
  new THREE.MeshStandardMaterial({ color: 0x92905a, roughness: 1 }),
  new THREE.MeshStandardMaterial({ color: 0x566b3f, roughness: 1 })
];
for (const [x, z, scale] of [
  [-4.6, -1.9, 1.1], [-3.7, -2.6, 0.8], [-2.25, -2.4, 0.7],
  [-1.55, -3.25, 0.9], [1.75, -3.15, 0.85], [2.45, -2.25, 0.75],
  [3.7, -2.1, 1], [4.65, -3.3, 0.9], [-3.2, -4.2, 1.2],
  [0.9, -4.25, 1], [3.5, -4.1, 1.1]
]) {
  const tuft = new THREE.Group();
  tuft.position.set(x, -0.1, z);
  tuft.scale.setScalar(scale);
  for (let blade = 0; blade < 7; blade += 1) {
    const grassBlade = new THREE.Mesh(
      new THREE.ConeGeometry(0.026, 0.2 + (blade % 3) * 0.045, 5),
      grassMaterials[blade % grassMaterials.length]
    );
    grassBlade.position.set((blade - 3) * 0.035, 0.1, (blade % 2) * 0.035);
    grassBlade.rotation.z = (blade - 3) * 0.1;
    grassBlade.castShadow = true;
    tuft.add(grassBlade);
  }
  scene.add(tuft);
}

const ground = new THREE.Mesh(
  new THREE.CylinderGeometry(1.62, 1.78, 0.18, 64),
  new THREE.MeshStandardMaterial({ color: 0x7e5434, roughness: 0.94, metalness: 0.02 })
);
ground.position.y = 0.08;
ground.receiveShadow = true;
scene.add(ground);

const road = new THREE.Mesh(
  new THREE.BoxGeometry(8.6, 0.08, 3.4),
  new THREE.MeshStandardMaterial({ color: 0x3b3a3e, roughness: 0.9, metalness: 0.18 })
);
road.position.set(0, -0.02, 3.55);
road.receiveShadow = true;
scene.add(road);

for (const x of [-2.2, -1.1, 0, 1.1, 2.2]) {
  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 0.01, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xf2e7a6, emissive: 0x4d4313, roughness: 0.7 })
  );
  stripe.position.set(x, 0.02, 3.55);
  scene.add(stripe);
}

for (const z of [1.85, 5.25]) {
  const edgeLine = new THREE.Mesh(
    new THREE.BoxGeometry(8.1, 0.012, 0.035),
    new THREE.MeshStandardMaterial({ color: 0xd5d1bd, roughness: 0.8 })
  );
  edgeLine.position.set(0, 0.03, z);
  scene.add(edgeLine);
}

const cars = [];
function addCar(positionX, scale = 1, direction = 1, color = 0xc9d2d8) {
  const car = new THREE.Group();
  car.position.set(positionX, 0.08, direction > 0 ? 2.6 : 4.5);
  car.scale.setScalar(scale);

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.26, 0.42),
    new THREE.MeshStandardMaterial({ color, roughness: 0.65, metalness: 0.18 })
  );
  body.position.y = 0.18;
  body.castShadow = true;
  car.add(body);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.2, 0.36),
    new THREE.MeshStandardMaterial({ color: 0x46545a, roughness: 0.38, metalness: 0.22 })
  );
  cabin.position.set(0.08, 0.32, 0);
  cabin.castShadow = true;
  car.add(cabin);

  const headlightMaterial = new THREE.MeshStandardMaterial({ color: 0xfff1c2, emissive: 0x55421b });
  const tailLightMaterial = new THREE.MeshStandardMaterial({ color: 0xd94c3f, emissive: 0x40100b });
  for (const side of [-1, 1]) {
    const headlight = new THREE.Mesh(new THREE.SphereGeometry(0.035, 10, 8), headlightMaterial);
    headlight.position.set(0.39, 0.18, side * 0.15);
    car.add(headlight);
    const tailLight = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), tailLightMaterial);
    tailLight.position.set(-0.39, 0.18, side * 0.15);
    car.add(tailLight);
  }

  for (const wheelX of [-0.24, 0.24]) {
    for (const wheelZ of [-0.17, 0.17]) {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.06, 16),
        new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
      );
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wheelX, 0.08, wheelZ);
      car.add(wheel);
    }
  }

  cars.push({ group: car, offset: positionX, speed: 0.32, direction });
  scene.add(car);
  return car;
}

[
  [-2, 0.68, 1, 0x9c503d],
  [-0.7, 0.74, -1, 0x527779],
  [2, 0.8, 1, 0xb59a52],
  [3.3, 0.7, -1, 0xd0c8b5]
].forEach(([x, scale, direction, color]) => addCar(x, scale, direction, color));

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

function setHairColor(colorHex) {
  const base = new THREE.Color(colorHex);
  materials.hair.color.copy(base);
  materials.hairHighlight.color.copy(base.clone().offsetHSL(0, 0, 0.18));
  if (hairColor) hairColor.value = `#${base.getHexString()}`;
}

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

const hatMaterials = {
  cap: new THREE.MeshStandardMaterial({ color: 0xd5f263, roughness: 0.62 }),
  beanie: new THREE.MeshStandardMaterial({ color: 0x63d9f5, roughness: 0.84 }),
  crown: new THREE.MeshStandardMaterial({ color: 0xf5ce63, metalness: 0.62, roughness: 0.3 })
};
const hatGroups = new Map();
const streetCap = new THREE.Group();
streetCap.name = "hat-street-cap";
streetCap.position.y = 2.65;
const capBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.235, 0.235, 0.035, 32), hatMaterials.cap);
capBrim.position.set(0, 0.005, 0.015);
streetCap.add(capBrim);
const capCrown = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), hatMaterials.cap);
capCrown.position.set(0, 0.065, -0.015);
capCrown.scale.set(0.205, 0.12, 0.19);
streetCap.add(capCrown);
const capPeak = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.025, 0.18), hatMaterials.cap);
capPeak.position.set(0, -0.005, 0.17);
streetCap.add(capPeak);
hatGroups.set("street-cap", streetCap);
character.add(streetCap);

const grooveBeanie = new THREE.Group();
grooveBeanie.name = "hat-groove-beanie";
grooveBeanie.position.y = 2.65;
const beanieBody = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 20), hatMaterials.beanie);
beanieBody.position.y = 0.06;
beanieBody.scale.set(0.215, 0.14, 0.205);
grooveBeanie.add(beanieBody);
const beanieCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.215, 0.215, 0.055, 32), hatMaterials.beanie);
beanieCuff.position.y = 0.005;
grooveBeanie.add(beanieCuff);
hatGroups.set("groove-beanie", grooveBeanie);
character.add(grooveBeanie);

const circuitCrown = new THREE.Group();
circuitCrown.name = "hat-circuit-crown";
circuitCrown.position.y = 2.65;
const crownBand = new THREE.Mesh(new THREE.TorusGeometry(0.195, 0.028, 10, 36), hatMaterials.crown);
crownBand.rotation.x = Math.PI / 2;
crownBand.position.y = 0.025;
circuitCrown.add(crownBand);
for (const [index, x] of [-0.14, -0.07, 0, 0.07, 0.14].entries()) {
  const spike = new THREE.Mesh(new THREE.ConeGeometry(0.035, index === 2 ? 0.18 : 0.12, 8), hatMaterials.crown);
  spike.position.set(x, index === 2 ? 0.12 : 0.09, 0);
  circuitCrown.add(spike);
}
hatGroups.set("circuit-crown", circuitCrown);
character.add(circuitCrown);
hatGroups.forEach((hat) => { hat.visible = false; });

const storyOpponents = [
  { name: "NOVA “NEON”", description: "A rooftop regular with quick strikes. Defeat Nova to enter the City Circuit.", jacket: 0xb84768, pants: 0x30283f, hair: 0x17182d, skin: 0xb87862, female: true, health: 240, damage: 18, taunt: "Too slow! Watch this!", hitLine: "Ow! You got that one." },
  { name: "BRICK “BASSLINE”", description: "A warehouse powerhouse who hits hard. Take Brick down to keep climbing.", jacket: 0x397b84, pants: 0x253b42, hair: 0x32241f, skin: 0x855b48, female: false, health: 275, damage: 24, taunt: "Feel the bass drop!", hitLine: "Didn't expect that move." },
  { name: "ECHO “AFTERGLOW”", description: "A former circuit champion with a punishing counterattack.", jacket: 0x9b7040, pants: 0x46344d, hair: 0x39223f, skin: 0xc68d6e, female: true, health: 310, damage: 29, taunt: "The spotlight's mine!", hitLine: "Okay, you're for real." },
  ...[
    ["RIFF “SIDECHAIN”", "A club regular who turns every opening into a sharp beat."],
    ["JUNO “JACKPOT”", "A fearless street dancer with a lucky streak and quick hands."],
    ["MOSS “LOWKEY”", "A calm park-session veteran who never wastes a move."],
    ["GLINT “GLASSHOUSE”", "A rooftop stylist whose polished combos still pack a punch."],
    ["TEMPO “UPBEAT”", "A metronome-precise battler who never loses the rhythm."],
    ["ASH “CINDER”", "A late-night challenger bringing heat from the underground."],
    ["FLUX “SWITCHUP”", "A tricky rival who changes tactics the moment you settle in."],
    ["VORTEX “WHIRLWIND”", "A spinning specialist who presses every advantage."],
    ["PATCH “SCRATCH”", "A turntable ace with a rough, relentless battle style."],
    ["LUX “SPOTLIGHT”", "A showstopper who fights like every round is a finale."],
    ["KITE “UPDRAFT”", "A light-footed contender with surprisingly heavy counters."],
    ["KINETIC “MOTION”", "A powerhouse in constant motion who is tough to slow down."],
    ["ONYX “NIGHTSHIFT”", "A midnight circuit regular with a cool head and hard hits."],
    ["BLAZE “AFTERBURN”", "A fiery competitor who ramps up the pressure each round."],
    ["RUNE “RHYTHMLOCK”", "A technical master who makes every counter count."],
    ["SABLE “MOONRISE”", "A smooth night dancer with a sharp finishing game."],
    ["PULSE “HEARTBEAT”", "A crowd favorite who gets stronger as the music builds."],
    ["DRIFT “LAST LAP”", "A road-tested rival saving their best move for the end."],
    ["METRO “NIGHTLINE”", "A city-circuit veteran who turns the final stretch into a sprint."],
    ["GRANDMASTER “HEADLINER”", "The final challenger: City Circuit legend and reigning Grandmaster."]
  ].map(([name, description], index) => {
    const palettes = [
      [0x397b84, 0x253b42, 0x32241f, 0x855b48],
      [0xb84768, 0x30283f, 0x17182d, 0xb87862],
      [0x9b7040, 0x46344d, 0x39223f, 0xc68d6e],
      [0x6d56b8, 0x272a47, 0x1d1b34, 0xc18d70],
      [0x3f8b5b, 0x46362b, 0x38271a, 0x855b48]
    ][index % 5];
    return {
      name,
      description,
      jacket: palettes[0],
      pants: palettes[1],
      hair: palettes[2],
      skin: palettes[3],
      female: index % 2 === 1,
      health: 300 + index * 4,
      damage: 20 + Math.floor(index / 5),
      taunt: ["Catch the next beat!", "You can't keep up!", "Now it's my turn!", "Let's raise the tempo!"][index % 4],
      hitLine: ["Nice move!", "Okay, that landed.", "You're full of surprises."][index % 3]
    };
  })
];
const battleOpponent = character.clone(true);
battleOpponent.name = "storyOpponent";
battleOpponent.visible = false;
battleOpponent.scale.setScalar(0.74);
const rivalBaseMaterials = new Map([
  [materials.jacket, "jacket"],
  [garmentMaterials.jacket, "jacket"],
  [materials.pants, "pants"],
  [materials.hair, "hair"],
  [materials.hairHighlight, "hair"],
  [materials.skin, "skin"],
  [materials.skinLight, "skin"]
]);
battleOpponent.traverse((child) => {
  if (!child.isMesh) return;
  const role = rivalBaseMaterials.get(child.material);
  if (!role) return;
  const originalMaterial = child.material;
  child.material = originalMaterial.clone();
  child.userData.storyMaterialRole = role;
});
scene.add(battleOpponent);
const rivalLeftArm = battleOpponent.getObjectByName("leftArm");
const rivalRightArm = battleOpponent.getObjectByName("rightArm");
const rivalLeftLeg = battleOpponent.getObjectByName("leftLeg");
const rivalRightLeg = battleOpponent.getObjectByName("rightLeg");

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
const rivalShadow = shadow.clone();
rivalShadow.visible = false;
rivalShadow.position.x = 1.05;
scene.add(rivalShadow);

let speed = Number(speedSlider.value);
let playing = true;
let dragging = false;
let previousX = 0;
let targetRotation = 0;
let womanSelected = false;
let selectedEmote = "groove";
let poseMode = false;
let playingBeforePose = true;
let storyState = "ready";
let campaignWins = 0;
const playerMaximumHealth = 240;
const maximumStamina = 100;
const staminaRecovery = 30;
let playerHealth = playerMaximumHealth;
let rivalHealth = 240;
let playerStamina = maximumStamina;
let rivalStamina = maximumStamina;
let battleTurnTimer;
let playerLunge = 0;
let rivalLunge = 0;
let selectedSkin = "original";
const unlockStorageKey = "roundabout-story-unlocks-v1";
const unlockedEmotes = new Set(["groove", "hype", "robot", "spin", "side-step", ...loadUnlocks("emotes")]);
const unlockedSkins = new Set(["original", ...loadUnlocks("skins")]);
const unlockedHats = new Set(loadUnlocks("hatQuestUnlocks"));
const hatDisplayNames = {
  "street-cap": "Street Cap",
  "groove-beanie": "Groove Beanie",
  "circuit-crown": "Circuit Crown"
};
const rewardQuestNames = {
  moonwalk: "Moonwalk emote",
  "power-pose": "Power Pose emote",
  breakstep: "Breakstep emote",
  freestyle: "Freestyle emote",
  toprock: "Toprock emote",
  windmill: "Windmill emote",
  "victory-shuffle": "Victory Shuffle emote",
  neon: "Neon Flare outfit",
  wild: "Wildside outfit",
  champion: "Circuit Champ outfit",
  ...hatDisplayNames
};
const rewardDisplayNames = {
  neon: "Neon Flare outfit",
  wild: "Wildside outfit",
  champion: "Circuit Champ outfit"
};
const rewardQuestItems = [
  { type: "emote", id: "moonwalk", opponent: 0, attack: "Quick Strike" },
  { type: "emote", id: "power-pose", opponent: 2, attack: "Finisher" },
  { type: "emote", id: "breakstep", opponent: 3, attack: "Finisher" },
  { type: "emote", id: "freestyle", opponent: 7, attack: "Finisher" },
  { type: "emote", id: "toprock", opponent: 11, attack: "Finisher" },
  { type: "emote", id: "windmill", opponent: 15, attack: "Finisher" },
  { type: "emote", id: "victory-shuffle", opponent: 22, attack: "Finisher" },
  { type: "skin", id: "neon", opponent: 0, attack: "Power Hit" },
  { type: "skin", id: "wild", opponent: 1, attack: "Quick Strike" },
  { type: "skin", id: "champion", opponent: 2, attack: "Power Hit" },
  { type: "hat", id: "street-cap", opponent: 0 },
  { type: "hat", id: "groove-beanie", opponent: 1, attacks: ["Power Hit", "Finisher"] },
  { type: "hat", id: "circuit-crown", opponent: 2 }
];
let selectedHat = null;
let lastPlayerAttack = "";
let musicContext;
let beatTimer;
const clock = new THREE.Clock();
const emotes = {
  groove: { label: "LOWKEY GROOVE", beat: 2.4, spin: 0.68, bounce: 0.045, arms: 0.42, legs: 0.22, sway: 0.065 },
  hype: { label: "SKYLINE", beat: 2.7, spin: 0.12, bounce: 0.09, arms: 0.32, legs: 0.3, sway: 0.04 },
  robot: { label: "GLITCH STEP", beat: 2.4, spin: 0.08, bounce: 0.018, arms: 0.32, legs: 0.18, sway: 0.01 },
  spin: { label: "ORBIT BREAK", beat: 1.8, spin: 1.8, bounce: 0.05, arms: 0.18, legs: 0.16, sway: 0.035 },
  "side-step": { label: "CROSSOVER", beat: 2.4, spin: 0.08, bounce: 0.035, arms: 0.22, legs: 0.38, sway: 0.09 },
  moonwalk: { label: "MOONWALK", beat: 1.8, spin: 0.02, bounce: 0.012, arms: 0.16, legs: 0.48, sway: 0.025 },
  "power-pose": { label: "POWER POSE", beat: 1.6, spin: 0.04, bounce: 0.055, arms: 0.2, legs: 0.12, sway: 0.018 },
  breakstep: { label: "BREAKSTEP", beat: 2.1, spin: 0.24, bounce: 0.055, arms: 0.56, legs: 0.62, sway: 0.09 },
  freestyle: { label: "FREESTYLE", beat: 2.65, spin: 0.44, bounce: 0.065, arms: 0.62, legs: 0.4, sway: 0.075 },
  toprock: { label: "TOPROCK", beat: 2.2, spin: 0.58, bounce: 0.04, arms: 0.5, legs: 0.54, sway: 0.065 },
  windmill: { label: "WINDMILL", beat: 1.65, spin: 1.15, bounce: 0.035, arms: 0.72, legs: 0.3, sway: 0.035 },
  "victory-shuffle": { label: "VICTORY SHUFFLE", beat: 2.85, spin: 0.18, bounce: 0.08, arms: 0.38, legs: 0.65, sway: 0.1 }
};

function loadUnlocks(key) {
  try {
    const saved = JSON.parse(window.localStorage.getItem(unlockStorageKey) || "{}");
    return Array.isArray(saved[key]) ? saved[key].filter((id) => typeof id === "string") : [];
  } catch (error) {
    console.error("Unable to load saved story unlocks:", error);
    return [];
  }
}

function saveUnlocks() {
  try {
    window.localStorage.setItem(unlockStorageKey, JSON.stringify({
      emotes: [...unlockedEmotes],
      skins: [...unlockedSkins],
      hatQuestUnlocks: [...unlockedHats]
    }));
  } catch (error) {
    console.error("Unable to save story unlocks:", error);
  }
}

function updateUnlockControls() {
  let emoteUnlockedCount = 0;
  emoteButtons.forEach((button) => {
    const id = button.dataset.emote;
    const isUnlocked = unlockedEmotes.has(id);
    button.disabled = false;
    button.setAttribute("aria-disabled", String(!isUnlocked));
    button.classList.toggle("is-locked", !isUnlocked);
    if (isUnlocked) emoteUnlockedCount += 1;
    button.querySelector(".emote-lock")?.toggleAttribute("hidden", isUnlocked);
    if (button.dataset.quest) {
      button.setAttribute("aria-label", `${button.querySelector(".emote-name").textContent}. ${button.dataset.difficulty} difficulty. ${isUnlocked ? "Unlocked." : button.dataset.quest}`);
      button.title = isUnlocked ? "" : button.dataset.quest;
    }
  });
  emoteCount.textContent = `${emoteUnlockedCount} / ${emoteButtons.length}`;
  skinButtons.forEach((button) => {
    const isUnlocked = unlockedSkins.has(button.dataset.skin);
    button.disabled = false;
    button.setAttribute("aria-disabled", String(!isUnlocked));
    button.classList.toggle("is-locked", !isUnlocked);
    button.querySelector(".skin-lock")?.toggleAttribute("hidden", isUnlocked);
    if (button.dataset.quest) {
      button.setAttribute("aria-label", `${rewardDisplayNames[button.dataset.skin]}. ${button.dataset.difficulty} difficulty. ${isUnlocked ? "Unlocked." : button.dataset.quest}`);
      button.title = isUnlocked ? "" : button.dataset.quest;
    }
  });
  hatButtons.forEach((button) => {
    const isUnlocked = unlockedHats.has(button.dataset.hat);
    button.disabled = false;
    button.setAttribute("aria-disabled", String(!isUnlocked));
    button.classList.toggle("is-locked", !isUnlocked);
    button.classList.toggle("is-selected", selectedHat === button.dataset.hat);
    button.setAttribute("aria-pressed", String(selectedHat === button.dataset.hat));
    button.querySelector(".hat-lock")?.toggleAttribute("hidden", isUnlocked);
    button.setAttribute("aria-label", `${hatDisplayNames[button.dataset.hat]}. ${button.dataset.difficulty} difficulty. ${isUnlocked ? "Unlocked; click to equip." : button.dataset.quest}`);
  });
  document.querySelectorAll("[data-quick-emote]").forEach((button) => {
    const isUnlocked = unlockedEmotes.has(button.dataset.quickEmote);
    button.disabled = false;
    button.setAttribute("aria-disabled", String(!isUnlocked));
    if (button.dataset.quest) button.title = isUnlocked ? "" : button.dataset.quest;
  });
}

updateUnlockControls();

function updateCampaignProgress() {
  const progress = Math.round((campaignWins / storyOpponents.length) * 100);
  storyProgress.setAttribute("aria-valuenow", String(campaignWins));
  storyProgressLabel.textContent = `${campaignWins} / ${storyOpponents.length} WINS`;
  storyProgressFill.style.width = `${progress}%`;
}

function completeRewardQuests(defeatedOpponent, finalAttack) {
  const newlyUnlocked = [];
  rewardQuestItems.forEach((quest) => {
    const attackMatches = quest.attack
      ? finalAttack === quest.attack
      : !quest.attacks || quest.attacks.includes(finalAttack);
    if (quest.opponent !== defeatedOpponent || !attackMatches) return;
    const unlockedItems = quest.type === "emote"
      ? unlockedEmotes
      : quest.type === "skin" ? unlockedSkins : unlockedHats;
    if (unlockedItems.has(quest.id)) return;
    unlockedItems.add(quest.id);
    newlyUnlocked.push(rewardQuestNames[quest.id]);
  });
  if (newlyUnlocked.length) {
    updateUnlockControls();
    saveUnlocks();
  }
  return newlyUnlocked;
}

function updateBattleHealthBars() {
  const rivalMaximumHealth = storyOpponents[campaignWins].health;
  playerHealthFill.style.width = `${(playerHealth / playerMaximumHealth) * 100}%`;
  rivalHealthFill.style.width = `${(rivalHealth / rivalMaximumHealth) * 100}%`;
  playerHealthFill.style.background = `hsl(${(playerHealth / playerMaximumHealth) * 120} 72% 48%)`;
  rivalHealthFill.style.background = `hsl(${(rivalHealth / rivalMaximumHealth) * 120} 72% 48%)`;
  playerHealthLabel.textContent = `${playerHealth} / ${playerMaximumHealth} HP`;
  rivalHealthLabel.textContent = `${rivalHealth} / ${rivalMaximumHealth} HP`;
  playerHealthBar.setAttribute("aria-valuemax", String(playerMaximumHealth));
  playerHealthBar.setAttribute("aria-valuenow", String(playerHealth));
  rivalHealthBar.setAttribute("aria-valuemax", String(rivalMaximumHealth));
  rivalHealthBar.setAttribute("aria-valuenow", String(rivalHealth));
  playerStaminaFill.style.width = `${playerStamina}%`;
  rivalStaminaFill.style.width = `${rivalStamina}%`;
  playerStaminaLabel.textContent = `${playerStamina} / ${maximumStamina} STA`;
  rivalStaminaLabel.textContent = `${rivalStamina} / ${maximumStamina} STA`;
  playerStaminaBar.setAttribute("aria-valuenow", String(playerStamina));
  rivalStaminaBar.setAttribute("aria-valuenow", String(rivalStamina));
}

function updateAttackAvailability() {
  attackButtons.forEach((button) => {
    const staminaCost = Number(button.dataset.stamina);
    button.disabled = storyState !== "active" || playerStamina < staminaCost;
    button.title = playerStamina < staminaCost
      ? `Need ${staminaCost} stamina; you have ${playerStamina}.`
      : "";
  });
}

function setStoryOpponentAppearance(index) {
  const opponent = storyOpponents[index];
  storyOpponent.textContent = opponent.name;
  storyDescription.textContent = opponent.description;
  rivalHealthName.textContent = opponent.name.split(" ")[0];
  battleOpponent.traverse((child) => {
    if (!child.isMesh) return;
    const role = child.userData.storyMaterialRole;
    if (role === "jacket") child.material.color.setHex(opponent.jacket);
    if (role === "pants") child.material.color.setHex(opponent.pants);
    if (role === "hair") child.material.color.setHex(opponent.hair);
    if (role === "skin") child.material.color.setHex(opponent.skin);
    if (child.name === "skirt" || child.name === "skirtHem") child.visible = opponent.female;
    if (child.name === "longHair") child.visible = opponent.female;
    if (child.name === "shortHair") child.visible = !opponent.female;
  });
}

function setBattleDialogue(speaker, line) {
  dialogueSpeaker.textContent = speaker;
  dialogueLine.textContent = `“${line}”`;
  battleDialogue.hidden = false;
}

function beginStoryBattle(index) {
  if (partyMode) {
    setPartyMode(false);
    partyToggle.setAttribute("aria-pressed", "false");
    partyToggle.classList.remove("is-active");
    partyToggle.querySelector("small").textContent = "ADD DANCERS";
    partyCount.textContent = "01 / 04";
    modeLabel.textContent = "SOLO SHOWCASE";
  }
  if (battleTurnTimer) {
    window.clearTimeout(battleTurnTimer);
    battleTurnTimer = undefined;
  }
  storyState = "active";
  lastPlayerAttack = "";
  playerHealth = playerMaximumHealth;
  rivalHealth = storyOpponents[index].health;
  playerStamina = maximumStamina;
  rivalStamina = maximumStamina;
  updateBattleHealthBars();
  updateAttackAvailability();
  updateCampaignProgress();
  setStoryOpponentAppearance(index);
  storyChapter.textContent = `BATTLE ${index + 1} / ${storyOpponents.length}`;
  storyRivalLabel.textContent = "CURRENT OPPONENT";
  storyStatus.textContent = `Battle ${storyOpponents[index].name}. Stronger attacks cost more stamina; both fighters recover stamina each round.`;
  setBattleDialogue(storyOpponents[index].name, "You made it this far. Let's see what you've got!");
  battleTurn.textContent = "YOUR TURN — CHOOSE AN ATTACK";
  battleTurn.hidden = false;
  storyAction.textContent = "YOUR TURN";
  storyAction.disabled = true;
  battleHealth.hidden = false;
  battleAttacks.hidden = false;

  character.scale.setScalar(0.74);
  character.position.x = -1.05;
  battleOpponent.position.set(1.05, 0, 0);
  battleOpponent.visible = true;
  battleOpponent.rotation.y = -0.35;
  targetRotation = 0.35;
  shadow.position.x = -1.05;
  rivalShadow.visible = true;
}

function finishStoryBattle(won) {
  battleAttacks.hidden = true;
  battleTurn.hidden = true;
  storyAction.disabled = false;
  if (!won) {
    storyState = "lost";
    storyRivalLabel.textContent = "KNOCKED OUT";
    storyChapter.textContent = `BATTLE ${campaignWins + 1} LOST`;
    storyStatus.textContent = `${storyOpponents[campaignWins].name} knocked you out. Recover and try the battle again.`;
    setBattleDialogue(storyOpponents[campaignWins].name, "That's enough. Come back when you're ready.");
    storyAction.textContent = "RETRY BATTLE";
    return;
  }

  setBattleDialogue("YOU", "That's the City Circuit style!");
  const defeatedOpponentIndex = campaignWins;
  campaignWins += 1;
  updateCampaignProgress();
  const rewards = completeRewardQuests(defeatedOpponentIndex, lastPlayerAttack);
  if (campaignWins === storyOpponents.length) {
    storyState = "complete";
    storyRivalLabel.textContent = "CHAMPION";
    storyChapter.textContent = "CIRCUIT CLEARED";
    storyStatus.textContent = "You defeated every challenger and cleared the City Circuit!";
    setBattleDialogue(storyOpponents[defeatedOpponentIndex].name, "You earned that win. The circuit is yours.");
    storyAction.textContent = "REPLAY STORY";
  } else {
    storyState = "won";
    storyRivalLabel.textContent = "NEXT CHALLENGER";
    storyChapter.textContent = `BATTLE ${campaignWins} / ${storyOpponents.length} WON`;
    storyStatus.textContent = `You knocked out ${storyOpponents[campaignWins - 1].name}! The next challenger is waiting.`;
    storyAction.textContent = "NEXT CHALLENGER";
  }
  if (rewards.length) storyStatus.textContent += ` Reward unlocked: ${rewards.join("; ")}.`;
}

function performAttack(button) {
  if (storyState !== "active") return;
  const damage = Number(button.dataset.damage);
  const staminaCost = Number(button.dataset.stamina);
  if (playerStamina < staminaCost) return;
  const attackName = button.dataset.attack;
  lastPlayerAttack = attackName;
  const opponent = storyOpponents[campaignWins];
  playerStamina -= staminaCost;
  attackButtons.forEach((attackButton) => { attackButton.disabled = true; });
  storyState = "countering";
  battleTurn.textContent = `${opponent.name} IS COUNTERING...`;
  storyAction.textContent = "RIVAL'S TURN";
  rivalHealth = Math.max(0, rivalHealth - damage);
  playerLunge = 1;
  updateBattleHealthBars();
  storyStatus.textContent = `${attackName} dealt ${damage} damage.`;
  setBattleDialogue("YOU", `Take that! ${attackName}!`);

  if (rivalHealth === 0) {
    storyStatus.textContent = `${opponent.name} is down! You dealt the final ${damage} damage.`;
    setBattleDialogue(opponent.name, opponent.hitLine);
    battleTurnTimer = window.setTimeout(() => finishStoryBattle(true), 750);
    return;
  }

  setBattleDialogue(opponent.name, opponent.taunt);
  battleTurnTimer = window.setTimeout(() => {
    if (storyState !== "countering") return;
    const rivalAttack = [
      { name: "Finisher", damage: opponent.damage + 18, stamina: 70 },
      { name: "Power Hit", damage: opponent.damage + 10, stamina: 40 },
      { name: "Quick Strike", damage: opponent.damage, stamina: 15 }
    ].find((attack) => rivalStamina >= attack.stamina);
    rivalStamina -= rivalAttack.stamina;
    const counterDamage = rivalAttack.damage;
    playerHealth = Math.max(0, playerHealth - counterDamage);
    rivalLunge = 1;
    storyStatus.textContent = `${opponent.name} used ${rivalAttack.name} for ${counterDamage} damage.`;
    setBattleDialogue(opponent.name, `${opponent.taunt} ${rivalAttack.name}!`);
    updateBattleHealthBars();

    if (playerHealth === 0) {
      storyStatus.textContent = `${opponent.name} knocked you out with ${counterDamage} damage.`;
      setBattleDialogue(opponent.name, "That's enough. Come back when you're ready.");
      finishStoryBattle(false);
      return;
    }

    playerStamina = Math.min(maximumStamina, playerStamina + staminaRecovery);
    rivalStamina = Math.min(maximumStamina, rivalStamina + staminaRecovery);
    updateBattleHealthBars();
    storyState = "active";
    battleTurn.textContent = "YOUR TURN — CHOOSE AN ATTACK";
    storyAction.textContent = "YOUR TURN";
    updateAttackAvailability();
  }, 900);
}

attackButtons.forEach((button) => {
  button.addEventListener("click", () => performAttack(button));
});

storyAction.addEventListener("click", () => {
  if (storyState === "won") {
    beginStoryBattle(campaignWins);
    return;
  }
  if (storyState === "lost") {
    beginStoryBattle(campaignWins);
    return;
  }
  if (storyState === "complete") {
    campaignWins = 0;
    updateCampaignProgress();
  }
  beginStoryBattle(campaignWins);
});

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
  applySkin(selectedSkin);
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

const skinPalettes = {
  original: {
    man: [0x63754f, 0x283334, 0x665064, 0x30251e, 0xd5f263],
    woman: [0x647c86, 0x45323b, 0x604b62, 0x30251e, 0xd5f263]
  },
  neon: {
    man: [0xc13d68, 0x342640, 0x84405f, 0x20162d, 0xffd04a],
    woman: [0xe15c78, 0x422b49, 0x9c4e75, 0x20162d, 0x6ef2e4]
  },
  wild: {
    man: [0x3f8b5b, 0x46362b, 0x927044, 0x38271a, 0xf4bd57],
    woman: [0x579e6b, 0x493840, 0xa57949, 0x38271a, 0xff8e62]
  },
  champion: {
    man: [0x6d56b8, 0x272a47, 0xa17c38, 0x1d1b34, 0x69e6f4],
    woman: [0x8a63cf, 0x392b53, 0xc39649, 0x1d1b34, 0xffd95b]
  }
};

function applySkin(skinId) {
  const palette = skinPalettes[skinId];
  if (!palette) return;
  const [jacket, pants, skirtColor, hair, accent] = womanSelected ? palette.woman : palette.man;
  materials.jacket.color.setHex(jacket);
  garmentMaterials.jacket.color.setHex(jacket);
  materials.pants.color.setHex(pants);
  materials.skirt.color.setHex(skirtColor);
  materials.accent.color.setHex(accent);
  setHairColor(`#${hair.toString(16).padStart(6, "0")}`);
  if (fitColor) fitColor.value = `#${jacket.toString(16).padStart(6, "0")}`;
}

function selectSkin(skinId) {
  if (!unlockedSkins.has(skinId) || !skinPalettes[skinId]) return;
  selectedSkin = skinId;
  applySkin(skinId);
  skinButtons.forEach((button) => {
    const isSelected = button.dataset.skin === skinId;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function selectHat(hatId) {
  if (!unlockedHats.has(hatId) || !hatGroups.has(hatId)) return;
  selectedHat = hatId;
  hatGroups.forEach((hat, id) => { hat.visible = id === hatId; });
  partyDancers.forEach(({ group }) => {
    hatGroups.forEach((hat, id) => {
      const partyHat = group.getObjectByName(hat.name);
      if (partyHat) partyHat.visible = id === hatId;
    });
  });
  updateUnlockControls();
}

function selectEmote(emoteId) {
  if (!emotes[emoteId] || !unlockedEmotes.has(emoteId)) return;
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
skinButtons.forEach((button) => {
  button.addEventListener("click", () => selectSkin(button.dataset.skin));
});
hatButtons.forEach((button) => {
  button.addEventListener("click", () => selectHat(button.dataset.hat));
});
emoteButtons.forEach((button) => {
  button.addEventListener("click", () => selectEmote(button.dataset.emote));
});
document.querySelectorAll("[data-quick-emote]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!unlockedEmotes.has(button.dataset.quickEmote)) return;
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
    neon: { floor: 0x7e5434, lights: [0x62d9f5, 0xf5ce63, 0xa36eff], road: 0x2d2f35 },
    sunset: { floor: 0x8a5f3f, lights: [0xff9b68, 0xffd36b, 0xe86d8e], road: 0x342a29 },
    ice: { floor: 0x7b6a5c, lights: [0x73ddff, 0xa5bdff, 0x8cf2da], road: 0x313f45 }
  };
  const arena = arenas[arenaSelect.value];
  ground.material.color.setHex(arena.floor);
  road.material.color.setHex(arena.road);
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

hairColor?.addEventListener("input", () => {
  setHairColor(hairColor.value);
});

fitColor.addEventListener("input", () => {
  selectedSkin = "custom";
  skinButtons.forEach((button) => {
    button.classList.remove("is-selected");
    button.setAttribute("aria-pressed", "false");
  });
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
  cars.forEach(({ group, offset, speed: carSpeed, direction }) => {
    const roadSpan = 7.6;
    const travel = (clock.elapsedTime * carSpeed * 2.3 * direction + offset + roadSpan / 2) % roadSpan;
    const x = ((travel + roadSpan) % roadSpan) - roadSpan / 2;
    group.position.x = x;
    group.rotation.y = direction > 0 ? 0 : Math.PI;
  });
  playerLunge = Math.max(0, playerLunge - delta * 6);
  rivalLunge = Math.max(0, rivalLunge - delta * 6);
  const isDancing = playing && !battleOpponent.visible;
  const rawBeat = clock.elapsedTime * speed * emote.beat * (Number(bpmSlider.value) / 112);
  const danceBeat = selectedEmote === "robot" ? Math.floor(rawBeat * 2) / 2 : rawBeat;
  if (isDancing && !dragging) targetRotation += delta * speed * emote.spin;
  character.rotation.y += (targetRotation - character.rotation.y) * Math.min(delta * 8, 1);
  character.position.y = isDancing ? Math.abs(Math.sin(danceBeat)) * emote.bounce : 0;
  const emoteSlide = isDancing && selectedEmote === "side-step"
    ? Math.sin(danceBeat) * 0.12
    : isDancing && selectedEmote === "moonwalk"
      ? Math.sin(danceBeat * 0.5) * 0.24
      : isDancing && ["breakstep", "toprock", "victory-shuffle"].includes(selectedEmote)
        ? Math.sin(danceBeat * (selectedEmote === "victory-shuffle" ? 1.5 : 1)) * (selectedEmote === "toprock" ? 0.18 : 0.14)
      : 0;
  character.position.x = (battleOpponent.visible ? -1.05 + playerLunge * 0.28 : 0) + emoteSlide;
  character.rotation.z = isDancing ? Math.sin(danceBeat / 2) * emote.sway : 0;
  const leftBeat = Math.sin(danceBeat);
  const rightBeat = Math.sin(danceBeat + 0.8);
  leftArm.rotation.z = isDancing ? -0.12 + leftBeat * emote.arms : 0;
  rightArm.rotation.z = isDancing ? 0.12 - rightBeat * emote.arms : 0;
  leftArm.rotation.x = isDancing ? Math.sin(danceBeat * 0.5 + 0.7) * emote.arms * 0.2 : 0;
  rightArm.rotation.x = isDancing ? Math.sin(danceBeat * 0.5 - 0.7) * emote.arms * 0.2 : 0;
  leftLeg.rotation.x = isDancing ? leftBeat * emote.legs : 0;
  rightLeg.rotation.x = isDancing ? -rightBeat * emote.legs : 0;
  if (!battleOpponent.visible && selectedEmote === "hype") {
    leftArm.rotation.z = isDancing ? -0.88 + Math.sin(danceBeat) * 0.22 : -0.88;
    rightArm.rotation.z = isDancing ? 0.88 - Math.sin(danceBeat + Math.PI) * 0.22 : 0.88;
    character.rotation.z = isDancing ? Math.sin(danceBeat * 0.5) * 0.025 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "robot") {
    const robotPose = Math.floor(danceBeat * 1.5) % 4;
    leftArm.rotation.z = robotPose === 0 || robotPose === 3 ? -0.9 : 0.15;
    rightArm.rotation.z = robotPose === 1 || robotPose === 2 ? 0.9 : -0.15;
    leftArm.rotation.x = robotPose % 2 ? -0.3 : 0.3;
    rightArm.rotation.x = robotPose % 2 ? 0.3 : -0.3;
    character.rotation.z = robotPose % 2 ? 0.035 : -0.035;
  } else if (!battleOpponent.visible && selectedEmote === "power-pose") {
    leftArm.rotation.z = isDancing ? -1.05 + Math.sin(danceBeat) * 0.08 : -1.05;
    rightArm.rotation.z = isDancing ? 1.05 - Math.sin(danceBeat) * 0.08 : 1.05;
  } else if (!battleOpponent.visible && selectedEmote === "spin") {
    leftArm.rotation.z = isDancing ? -0.08 + leftBeat * 0.16 : 0;
    rightArm.rotation.z = isDancing ? 0.08 - rightBeat * 0.16 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "side-step") {
    leftArm.rotation.z = isDancing ? -0.38 + leftBeat * 0.22 : 0;
    rightArm.rotation.z = isDancing ? 0.38 - rightBeat * 0.22 : 0;
    character.rotation.z = isDancing ? Math.sin(danceBeat) * 0.09 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "breakstep") {
    leftArm.rotation.z = isDancing ? -0.82 + Math.sin(danceBeat * 1.4) * 0.3 : -0.82;
    rightArm.rotation.z = isDancing ? 0.42 - Math.sin(danceBeat * 1.4 + 1) * 0.36 : 0.42;
    leftLeg.rotation.x = isDancing ? Math.sin(danceBeat * 1.5) * 0.72 : 0;
    rightLeg.rotation.x = isDancing ? -Math.cos(danceBeat * 1.5) * 0.65 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "freestyle") {
    leftArm.rotation.z = isDancing ? -0.35 - Math.sin(danceBeat * 0.7) * 0.62 : 0;
    rightArm.rotation.z = isDancing ? 0.35 + Math.cos(danceBeat * 0.7) * 0.62 : 0;
    leftArm.rotation.x = isDancing ? Math.sin(danceBeat) * 0.42 : 0;
    rightArm.rotation.x = isDancing ? -Math.sin(danceBeat + 1) * 0.42 : 0;
    character.rotation.z = isDancing ? Math.sin(danceBeat * 0.5) * 0.12 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "toprock") {
    leftArm.rotation.z = isDancing ? -0.62 + leftBeat * 0.34 : 0;
    rightArm.rotation.z = isDancing ? 0.62 - rightBeat * 0.34 : 0;
    leftLeg.rotation.x = isDancing ? leftBeat * 0.68 : 0;
    rightLeg.rotation.x = isDancing ? -rightBeat * 0.68 : 0;
    character.rotation.z = isDancing ? Math.sin(danceBeat) * 0.14 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "windmill") {
    leftArm.rotation.z = isDancing ? -0.45 - Math.sin(danceBeat * 1.7) * 0.8 : -0.45;
    rightArm.rotation.z = isDancing ? 0.45 + Math.sin(danceBeat * 1.7 + Math.PI) * 0.8 : 0.45;
    leftArm.rotation.x = isDancing ? Math.cos(danceBeat * 1.7) * 0.62 : 0;
    rightArm.rotation.x = isDancing ? -Math.cos(danceBeat * 1.7) * 0.62 : 0;
    leftLeg.rotation.x = isDancing ? leftBeat * 0.42 : 0;
    rightLeg.rotation.x = isDancing ? -rightBeat * 0.42 : 0;
  } else if (!battleOpponent.visible && selectedEmote === "victory-shuffle") {
    leftArm.rotation.z = isDancing ? -0.48 + Math.sin(danceBeat * 1.5) * 0.25 : 0;
    rightArm.rotation.z = isDancing ? 0.48 - Math.sin(danceBeat * 1.5 + Math.PI) * 0.25 : 0;
    leftLeg.rotation.x = isDancing ? Math.sin(danceBeat * 1.5) * 0.82 : 0;
    rightLeg.rotation.x = isDancing ? -Math.sin(danceBeat * 1.5 + Math.PI) * 0.82 : 0;
    character.rotation.z = isDancing ? Math.sin(danceBeat * 0.75) * 0.1 : 0;
  } else {
    character.rotation.z = isDancing ? Math.sin(danceBeat / 2) * emote.sway : 0;
  }
  skirt.rotation.z = womanSelected && isDancing ? Math.sin(danceBeat) * 0.09 : 0;
  stageLights.forEach((light, index) => {
    const phase = danceBeat + index * (Math.PI * 2 / stageLights.length);
    light.intensity = 4.5 + Math.max(0, Math.sin(phase)) * 7;
    light.position.x = Math.sin(clock.elapsedTime * 0.7 + index * 2.2) * 3;
    light.position.z = Math.cos(clock.elapsedTime * 0.55 + index * 2.2) * 2.2;
  });
  partyDancers.forEach(({ group, armA, armB, legA, legB, phase }) => {
    const guestBeat = danceBeat + phase;
    group.position.y = isDancing ? Math.abs(Math.sin(guestBeat)) * emote.bounce : 0;
    group.rotation.y += delta * speed * emote.spin * (phase ? -0.7 : 0.7);
    if (armA) armA.rotation.z = isDancing ? -0.2 + Math.sin(guestBeat) * emote.arms : 0;
    if (armB) armB.rotation.z = isDancing ? 0.2 - Math.sin(guestBeat + 0.8) * emote.arms : 0;
    if (legA) legA.rotation.x = isDancing ? Math.sin(guestBeat) * emote.legs : 0;
    if (legB) legB.rotation.x = isDancing ? -Math.sin(guestBeat + 0.8) * emote.legs : 0;
  });
  if (battleOpponent.visible) {
    battleOpponent.position.x = 1.05 - rivalLunge * 0.28;
    battleOpponent.position.y = 0;
    battleOpponent.rotation.y = -0.35 + Math.sin(clock.elapsedTime * 0.65) * 0.12;
    rivalLeftArm.rotation.z = 0;
    rivalRightArm.rotation.z = 0;
    rivalLeftLeg.rotation.x = 0;
    rivalRightLeg.rotation.x = 0;
    rivalShadow.material.opacity = 0.27 - Math.abs(battleOpponent.position.y) * 0.6;
  }
  shadow.material.opacity = 0.27 - Math.abs(character.position.y) * 0.6;
  renderer.render(scene, camera);
}

const loadingLabel = mount.querySelector(".loading-label");
loadingLabel?.remove();
render();
