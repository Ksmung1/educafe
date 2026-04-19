const skinTones = ["#f7d7c1", "#efc29b", "#dba071", "#b9774d", "#8b5a3c"];
const maleHairColors = ["#1f140f", "#3b2618", "#5a3824", "#704b2f", "#161616"];
const femaleHairColors = ["#23140f", "#4b2f22", "#6b4028", "#3d2a4d", "#171717"];
const shirtColors = [
  "#ff7b72",
  "#6ee7b7",
  "#60a5fa",
  "#fbbf24",
  "#f472b6",
  "#a78bfa",
  "#34d399",
  "#fb7185",
  "#22c55e",
  "#38bdf8",
];
const accessoryColors = ["#ffffff", "#fde68a", "#bfdbfe", "#fecdd3", "#ddd6fe"];

const maleHairStyles = ["short", "side", "spike", "buzz", "wave"];
const femaleHairStyles = ["bob", "long", "fringe", "bun", "wave"];
const eyeStyles = ["dot", "smile", "wink", "wide", "sleepy"];
const mouthStyles = ["smile", "grin", "open", "flat", "laugh"];
const accessoryStyles = ["none", "glasses", "cap", "headband", "earring"];
const actionStyles = ["wave", "nod", "salute", "lean", "book", "stretch", "clap", "point", "look", "cheer"];
const facialHairStyles = ["none", "stubble", "mustache", "goatee"];

function createAvatar(index, gender) {
  const hairPool = gender === "male" ? maleHairColors : femaleHairColors;
  const hairStyles = gender === "male" ? maleHairStyles : femaleHairStyles;

  return {
    id: `${gender}-${index + 1}`,
    gender,
    skin: skinTones[index % skinTones.length],
    hair: hairPool[(index * 2 + 1) % hairPool.length],
    shirt: shirtColors[(index * 3 + (gender === "female" ? 2 : 0)) % shirtColors.length],
    accessoryColor: accessoryColors[(index * 4 + 1) % accessoryColors.length],
    hairStyle: hairStyles[index % hairStyles.length],
    eyes: eyeStyles[(index * 2 + (gender === "female" ? 1 : 0)) % eyeStyles.length],
    mouth: mouthStyles[(index * 3 + 2) % mouthStyles.length],
    accessory: accessoryStyles[(index + (gender === "female" ? 2 : 0)) % accessoryStyles.length],
    action: actionStyles[(index * 2 + (gender === "female" ? 3 : 0)) % actionStyles.length],
    facialHair: gender === "male" ? facialHairStyles[index % facialHairStyles.length] : "none",
    eyebrow: index % 2 === 0 ? "sharp" : "soft",
    ageTone: "adult",
  };
}

const maleAvatars = Array.from({ length: 25 }, (_, index) => createAvatar(index, "male"));
const femaleAvatars = Array.from({ length: 25 }, (_, index) => createAvatar(index, "female"));

export const seatAvatars = [...maleAvatars, ...femaleAvatars];
export { maleAvatars, femaleAvatars };

export function getSeatAvatar(index) {
  return seatAvatars[index % seatAvatars.length];
}

export function getSeatAvatarByGender(index, gender) {
  if (gender === "male") return maleAvatars[index % maleAvatars.length];
  if (gender === "female") return femaleAvatars[index % femaleAvatars.length];
  return getSeatAvatar(index);
}
