import { cubeSVG, Face } from "sr-visualizer";

const a = {
  s: "R U2' R' U' R U' R'",
  a: "R U R' U R U2 R'",
  d: "R U2' R' U' R U R' U' R U' R'",
  t: "R U2' R' U' R U R' U' R U R' U' R U' R'",
  p: "B U2 B2 U' B2 U' B2 U2' B",
  c: "L' U2' L U L' U L R U2 R' U' R U' R' U'",
  h: "R U R' U R U2' R' L' U' L U' L' U2 L U'",
  o: "",
  noedge: "M2 S2",
  nocenter: "M' E2 M",
  U: "",
  FB: "r U R' U' M U R U' R'",
  RL: "U' r U R' U' M U R U' R' U",
  FR: "R U R' U' M' U R U' r'",
  RB: "U R U R' U' M' U R U' r' U'",
  BL: "U2 R U R' U' M' U R U' r' U2",
  FL: "U' R U R' U' M' U R U' r' U",
  D: "U M' U' R' U' R U M2' U' R' U M' R",
  nocorners: "R2 S2 L2 S2",
};

const corners = ["CORNER_START", "o", "s", "a", "d", "t", "p", "c", "h"];
const cornerExtra = {
  o: "(riented)",
  s: "(une)",
  a: "(ntisune)",
  d: "(ouble-sune)",
  t: "(riple-sune)",
  p: "(i)",
  c: "(hameleon)",
  h: "(eadlights)",
};
const edges = ["EDGE_START", "U", "FB", "RL", "FR", "RB", "BL", "FL", "D"];

const table = document.createElement("table");
document.body.appendChild(table);
for (const corner of corners) {
  const tr = document.createElement("tr");
  table.appendChild(tr);
  for (const edge of edges) {
    const td = document.createElement("td");
    let name = "";
    let alg: string[] = [];
    if (corner !== "CORNER_START") {
      alg.push(a[corner]);
      name += corner;
    }
    if (edge !== "EDGE_START") {
      alg.push(a[edge]);
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
    if (edge === "EDGE_START" && corner === "CORNER_START") {
      td.innerHTML =
        "<span>OLL<br>Naming</span><span>Lucas<br>Garron</span><span>2020-08-08</span>";
    }
    tr.appendChild(td);
  }
}
