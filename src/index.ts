import { cubeSVG, Face } from "sr-visualizer";

const a = {
  S: "R U2' R' U' R U' R'",
  A: "R U R' U R U2 R'",
  H: "U R U2' R' U' R U R' U' R U' R' U'",
  L: "U' R U2' R' U' R U R' U' R U R' U' R U' R' U",
  P: "B U2 B2 U' B2 U' B2 U2' B",
  T: "U2 L' U2' L U L' U L R U2 R' U' R U' R' U' U2",
  U: "U U R U R' U R U2' R' L' U' L U' L' U2 L U' U' U'",
  O: "",
  noedge: "M2 S2",
  nocenter: "M' E2 M",
  X: "U M' U' R' U' R U M2' U' R' U M' R",
  FB: "r U R' U' M U R U' R'",
  RL: "U' r U R' U' M U R U' R' U",
  FR: "R U R' U' M' U R U' r'",
  RB: "U R U R' U' M' U R U' r' U'",
  BL: "U2 R U R' U' M' U R U' r' U2",
  FL: "U' R U R' U' M' U R U' r' U",
  nocorners: "R2 S2 L2 S2",
};

const corners = ["CORNER_START", "O", "H", "S", "A", "L", "P", "U", "T"];
const cornerExtra = {
  O: "(riented)",
  S: "(une)",
  A: "(nti-Sune)",
  H: "",
  L: "",
  P: " (for pi)",
  T: "",
  U: "",
};
const edges = ["EDGE_START", "O", "X", "FB", "RL", "FR", "RB", "BL", "FL"];

const canonicalizeIdx = [
  [
    [1, 4],
    [1, 3],
  ],
  [
    [1, 6],
    [1, 5],
  ],
  [
    [1, 7],
    [1, 5],
  ],
  [
    [1, 8],
    [1, 4],
  ],
  [
    [2, 4],
    [2, 3],
  ],
  [
    [2, 7],
    [2, 5],
  ],
  [
    [2, 8],
    [2, 6],
  ],
];
const canonicalize: Record<string, string> = {};
for (const [[a, b], [c, d]] of canonicalizeIdx) {
  canonicalize["#" + corners[a] + edges[b]] = "#" + corners[c] + edges[d];
}

// https://stackoverflow.com/a/24471679
var swapCase = function (letters) {
  var newLetters = "";
  for (var i = 0; i < letters.length; i++) {
    if (letters[i] === letters[i].toLowerCase()) {
      newLetters += letters[i].toUpperCase();
    } else {
      newLetters += letters[i].toLowerCase();
    }
  }
  console.log(newLetters);
  return newLetters;
};

const table = document.createElement("table");
document.body.appendChild(table);
for (const corner of corners) {
  const tr = document.createElement("tr");
  table.appendChild(tr);
  for (const edge of edges) {
    const td = document.createElement("td");
    let name = "";
    let alg: string[] = [];
    let altName = "";
    if (corner !== "CORNER_START") {
      alg.push(a[corner]);
      if (edge !== "EDGE_START") {
        name += "#";
      }
      name += corner;
    }
    if (edge !== "EDGE_START") {
      alg.push(a[edge]);
      if (edge.length === 2) {
        altName = name + edge[1] + edge[0];
      }
      name += edge;
    }
    if (edge === "EDGE_START") {
      alg.push(a.nocenter);
      alg.push(a.noedge);
      name += cornerExtra[corner];
    }
    if (corner === "CORNER_START") {
      alg.push(a.nocorners);
    }
    cubeSVG(td, {
      algorithm: alg.join(" "),
      view: "plan",
      width: 60, // width/height of the svg
      height: 60,
      colorScheme: { 0: "yellow" },
    });
    td.append(document.createElement("br"));
    td.append(name);
    if (altName) {
      td.innerHTML += `<br><span class="alt">(or&nbsp;${altName})</span>`;
    } else {
      td.innerHTML += "<br>";
    }

    if (edge === "EDGE_START" && corner === "CORNER_START") {
      td.innerHTML =
        "<span>#OLL<br>Naming v0.2</span><span>Lucas<br>Garron</span><span>2020-08-09</span>";
    }
    console.log(canonicalize, name);
    if (name in canonicalize) {
      td.innerHTML = `same as<br>${canonicalize[name]}<br><br> (${name})`;
      if (altName) {
        td.innerHTML += `<br><span class="alt">(or&nbsp;${altName})</span>`;
      }
      td.classList.add("alt-cell");
    }
    tr.appendChild(td);
  }
}
