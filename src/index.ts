import { Arrow, cubeSVG } from "sr-visualizer";

const algHelpers = {
  cS: "R U2' R' U' R U' R'",
  cA: "R U R' U R U2 R'",
  cH: "U R U2' R' U' R U R' U' R U' R' U'",
  cL: "U' R U2' R' U' R U R' U' R U R' U' R U' R' U",
  cP: "B U2 B2 U' B2 U' B2 U2' B",
  cT: "U2 L' U2' L U L' U L R U2 R' U' R U' R' U' U2",
  cU: "U U R U R' U R U2' R' L' U' L U' L' U2 L U' U' U'",
  cO: "",
  noedge: "M2 S2",
  nocenter: "M' E2 M",
  eO: "",
  eD: "U M' U' R' U' R U M2' U' R' U M' R",
  eFB: "r U R' U' M U R U' R'",
  eRL: "U' r U R' U' M U R U' R' U",
  eFR: "R U R' U' M' U R U' r'",
  eRB: "U R U R' U' M' U R U' r' U'",
  eBL: "U2 R U R' U' M' U R U' r' U2",
  eFL: "U' R U R' U' M' U R U' r' U",
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
const edges = ["EDGE_START", "O", "D", "FB", "RL", "FR", "RB", "BL", "FL"];

const yellow = "rgb(255, 255, 0)";
const dim = "rgba(255, 255, 0, 0.33)";
const dark = "rgba(108, 108, 0)";
function arr(a, b, c, d, color: string = yellow, scale: number = 10): Arrow {
  return {
    s1: { face: a, n: b },
    s2: { face: c, n: d },
    s3: { face: a, n: b },
    influence: 10,
    color,
    scale,
  };
}

const arrows = {
  O: [],
  S: [
    // arr(0, 8, 0, 5, false, 10),
    // arr(0, 2, 0, 1, false, 10),
    // arr(0, 0, 0, 3, false, 10),
  ],
  A: [],
  L: [arr(0, 0, 0, 3), arr(0, 8, 0, 7)],
  P: [arr(0, 0, 0, 1), arr(0, 2, 0, 1), arr(0, 6, 0, 3), arr(0, 8, 0, 5)],
  T: [
    arr(0, 4, 0, 1, dark, 10),
    arr(0, 4, 0, 7, dark, 10),
    arr(0, 0, 0, 1),
    arr(0, 2, 0, 1),
  ],
  U: [
    arr(0, 0, 0, 3),
    arr(0, 2, 0, 5),
    arr(0, 6, 0, 8, dim, 10),
    arr(0, 8, 0, 6, dim, 10),
  ],
  H: [
    arr(0, 4, 0, 3, dark),
    arr(0, 4, 0, 5, dark),
    arr(0, 0, 0, 3, yellow, 5),
    arr(0, 6, 0, 3, yellow, 5),
    arr(0, 2, 0, 5, yellow, 5),
    arr(0, 8, 0, 5, yellow, 5),
  ],
};

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
    [1, 5],
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
      alg.push(algHelpers["c" + corner]);
      if (edge !== "EDGE_START") {
        name += "#";
      }
      name += corner;
    }
    if (edge !== "EDGE_START") {
      alg.push(algHelpers["e" + edge]);
      if (edge.length === 2) {
        altName = name + edge[1] + edge[0];
      }
      name += edge;
    }
    if (edge === "EDGE_START") {
      alg.push(algHelpers.nocenter);
      alg.push(algHelpers.noedge);
      name += cornerExtra[corner];
    }
    if (corner === "CORNER_START") {
      alg.push(algHelpers.nocorners);
    }
    cubeSVG(td, {
      algorithm: alg.join(" "),
      view: "plan",
      width: 60, // width/height of the svg
      height: 60,
      colorScheme: { 0: "yellow" },
      arrows:
        edge === "EDGE_START" && corner !== "CORNER_START"
          ? arrows[corner]
          : [],
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
        "<span>#OLL<br>Naming v0.3</span><span>Lucas<br>Garron</span><span>2020-08-09</span>";
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
