// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
// const firebase = require('firebase/app')
// import { initializeApp } from "firebase";
// import firebase from "firebase";
// const functions = firebase.functions();

// const firebase = require("firebase");
// const functions = firebase.functions();
figma.showUI(__html__);
// let hoge: StyledTextSegment;
// console.log(hoge);
// console.log("this",this)// 普通のJS

console.log("figma", figma);
//console.log("Nodeの数", figma.currentPage.findAll());
console.log("-------");
//figma.currentPage.findAll().length;

const nodes: SceneNode[] = [];
//console.log("NodeのID取得", figma.currentPage.findAll());

for (let i = 0; i < 2; i++) {
  if (figma.currentPage.findAll()) {
    //console.log("NodeのID取得", figma.currentPage.findAll()[i].id);
  }
  //console.log("NodeのID取得", figma.currentPage.findAll());

  // console.log('count',msg.count)
  // console.log("figma.key", figma.createPaintStyle().key);

  const rect = figma.createRectangle();
  //console.log("rects", rect);
  // rect.x = i * 150;
  //console.log("id", rect.id);
  let rgb = rect.fills[0].color;
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;
  // console.log("255をかけている", Math.floor(255 * r));

  //console.log("parse", parseFloat(rgb.r));
  //10進数のカラーコードを16進数に直した

  //TODO:リファクタリング必須！！！！！！！！
  //RGBは0~255までの値しかない
  function ConvertRGBtoHex(red, green, blue) {
    return (
      "#" +
      ColorToHex(Math.floor(255 * red)) +
      ColorToHex(Math.floor(255 * green)) +
      ColorToHex(Math.floor(255 * blue))
    );
  }
  function ColorToHex(color) {
    let hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
  }
  //console.log("uuuuuu", ConvertRGBtoHex(r, g, b));
  //console.log(rect.id);
  console.log(ConvertRGBtoHex(r, g, b));
  //figma.ui.postMessage(42);
  //console.log('_______')
  // figma.ui.postMessage(ConvertRGBtoHex(r, g, b));
  //ID取得//RGBも取得できた
  //rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.8, b: 0 } }];
  //figma.currentPage.appendChild(rect);



  // const main = async () => {
  //   const hello = functions.httpsCallable("helloOnCall");
  //   console.log("2ooooooo");
  //   const res = await hello({ text: rect.id });
  //   console.log(res);
  // };
  // main();
  console.log("nodes", nodes);
  //上記のコードでTSの良さがわかった.idがないのを先に警告してくれた
  nodes.push(figma.currentPage.findAll()[i].fills[0].color);
  console.log('ID',nodes)
}
 console.log("Nodeの数", figma.currentPage.findAll());

figma.currentPage.selection = nodes;
figma.viewport.scrollAndZoomIntoView(nodes);

figma.ui.onmessage = (msg) => {

  //console.log("jijij", msg);
  //us-central1-pra-functions.cloudfunctions.net/addMessage
  //https://us-central1-pra-functions.cloudfunctions.net/addMessage
  //console.log("msg", msg);
  //console.log("msg", msg.hasOwnProperty());//falseらしい
  //const page = figma.currentPage;

  //console.log("page", page.fill());
  //const colors = figma.currentPage.findAll()

  // const color = figma.currentPage.findAll((node) => node.name.includes("Line"));
  // const colors = figma.currentPage.findAll();
  //console.log("color", colors[0]);

  // axios.get('')
  // One way of distinguishing between different types of messages sent from
  // console.log('figmacurrent', figma.currentPage);//型PageNodeらしい
  // console.log("figmaNodeId", figma.getNodeById('0:1'));
  // console.log("figmagetStyle", figma.getLocalPaintStyles());
  // console.log('msg.q',msg.query)
  //console.log(msg)
  //console.log(figma.getLocalPaintStyles());
  // if (msg.type === "HyperlinkTarget") {
  //   const r = figma;
  //   console.log("rde", r);
  //   //console.log('link', msg); //受け取ったデータ
  // }
  // if (msg.type === "create-message") {
  //   console.log("createmsg", msg); //受け取ったデータ
  // }

  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === "create-rectangles") {
    //figma.ui.postMessage(42);
    //console.log("msg", msg); //typeしかでない
    // const create = figma.createText()
    // console.log(create)
    // console.log("got this from the UI", msg);

    //const rect = figma.createRectangle();
    //
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      // console.log('count',msg.count)
      // console.log("figma.key", figma.createPaintStyle().key);
      const rect = figma.createRectangle();
      //console.log("rects", rect);
      rect.x = i * 150;
      //console.log("id", rect.id);
      let rgb = rect.fills[0].color;
      let r = rgb.r;
      let g = rgb.g;
      let b = rgb.b;
      // console.log("255をかけている", Math.floor(255 * r));

      //console.log("parse", parseFloat(rgb.r));
      //10進数のカラーコードを16進数に直した

      //TODO:リファクタリング必須！！！！！！！！
      //RGBは0~255までの値しかない
      function ConvertRGBtoHex(red, green, blue) {
        return (
          "#" +
          ColorToHex(Math.floor(255 * red)) +
          ColorToHex(Math.floor(255 * green)) +
          ColorToHex(Math.floor(255 * blue))
        );
      }
      function ColorToHex(color) {
        let hexadecimal = color.toString(16);
        return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
      }
      //console.log("uuuuuu", ConvertRGBtoHex(r, g, b));
      console.log(rect.id);
      console.log(ConvertRGBtoHex(r, g, b));
      //nodes.push(rect.id)
      console.log(nodes)



      //figma.ui.postMessage('#hho')
      // figma.ui.postMessage(rect.id)
      // figma.ui.postMessage(ConvertRGBtoHex(r, g, b));
      // figma.ui.postMessage(rect.id);
      // figma.ui.postMessage(ConvertRGBtoHex(r, g, b));
      //ID取得//RGBも取得できた
      //rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.8, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);

      // const main = async () => {
      //   const hello = functions.httpsCallable("helloOnCall");
      //   console.log("2ooooooo");
      //   const res = await hello({ text: rect.id });
      //   console.log(res);
      // };
      // main();
      //console.log('nodes', nodes[i].id)
      //上記のコードでTSの良さがわかった.idがないのを先に警告してくれた
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }
};

// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
