// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".

figma.showUI(__html__);
// let hoge: StyledTextSegment;
// console.log(hoge);
// console.log("this",this)// 普通のJS

console.log("figma", figma);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
// figma.ui.postMessage(42);
figma.ui.postMessage({ type: "networkRequest" });
// figma.ui.onmessage = async (msg) => {
//   const text = figma.createText();
//   console.log('jijijijiji')
//   // Make sure the new text node is visible where we're currently looking
//   text.x = figma.viewport.center.x;
//   text.y = figma.viewport.center.y;

//   await figma.loadFontAsync(text.fontName as FontName);
//   text.characters = msg;

//   figma.closePlugin();
// };

// import axios from 'axios'
figma.ui.onmessage = (msg) => {
  console.log('msg',msg)
  //console.log("msg", msg.hasOwnProperty());//falseらしい
  const page = figma.currentPage;

  //console.log("page", page.fill());
  //const colors = figma.currentPage.findAll()

  const color = figma.currentPage.findAll((node) =>
    node.name.includes("Line")
  );
  const colors = figma.currentPage.findAll();
  console.log("color", colors[0]);

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
    //console.log("msg", msg);//typeしかでない
    // const create = figma.createText()
    // console.log(create)
    // console.log("got this from the UI", msg);




    const rect = figma.createRectangle();
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      // console.log('count',msg.count)
      // console.log("figma.key", figma.createPaintStyle().key);
      const rect = figma.createRectangle();
      //console.log("rects", rect);
      rect.x = i * 150;
      console.log("rect", rect.fills[i].color);
      let rgb = rect.fills[i].color;
      //ここのRGBを配列に保管する
      console.log('rgb',rgb)
      // Get each letter of hex code
      //const hexValue = rgb.split('');
      let r = rgb.r
      let g = rgb.g
      let b = rgb.b
      console.log("255をかけている", Math.floor(255 * r));
      // console.log('r',r);
      // console.log(g);
      // console.log(b);
      // 3 digit hex code (repeat same letter to make it as 6 digits)




      console.log('parse',parseFloat(rgb.r));
      //10進数のカラーコードを16進数に直した
      function ColorToHex(color) {
        var hexadecimal = color.toString(16);
        return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
      }

      function ConvertRGBtoHex(red, green, blue) {
        return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
      }
      console.log(
        "uuuuuu",
        ConvertRGBtoHex(
          Math.floor(255 * r),
          Math.floor(255 * r),
          Math.floor(255 * r)
        )
      );
      //RGBは0~255までの値しかない





       //console.log('rgbから変換済み',r + ', ' + g + ', ' + b)
     //ID取得//RGBも取得できた
      //rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.8, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
      //console.log('nodes', nodes[i].id)
      //上記のコードでTSの良さがわかった.idがないのを先に警告してくれた
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
