// 开源底图：OpenFreeMap 矢量瓦片（OpenMapTiles schema）+ 自配色；可选地名/街名标注
const OFM_SRC="https://tiles.openfreemap.org/planet";
const OFM_GLYPHS="https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf";
const ATTRIB="© OpenFreeMap  © OpenMapTiles  Data © OpenStreetMap contributors";
function nameExpr(lang){return lang=="en"?["coalesce",["get","name:en"],["get","name_en"],["get","name"]]:lang=="local"?["get","name"]:["coalesce",["get","name:zh-Hans"],["get","name:zh"],["get","name"]]}
function buildStyle(p,o){o=o||{};const rm=o.roadMul||1,tu=o.textU||1;const W=(a,b)=>["interpolate",["exponential",1.5],["zoom"],8,a*rm,16,b*rm];
 const road=(id,cls,c,w0,w1,minz)=>({id,type:"line",source:"o","source-layer":"transportation",minzoom:minz||0,filter:["in",["get","class"],["literal",cls]],layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":c,"line-width":W(w0,w1)}});
 const L=[{id:"bg",type:"background",paint:{"background-color":p.land}},
  {id:"landuse",type:"fill",source:"o","source-layer":"landuse",paint:{"fill-color":p.landuse}},
  {id:"park",type:"fill",source:"o","source-layer":"park",paint:{"fill-color":p.park}},
  {id:"landcover",type:"fill",source:"o","source-layer":"landcover",filter:["in",["get","class"],["literal",["grass","wood","farmland"]]],paint:{"fill-color":p.park,"fill-opacity":.7}},
  {id:"water",type:"fill",source:"o","source-layer":"water",paint:{"fill-color":p.water}},
  {id:"waterway",type:"line",source:"o","source-layer":"waterway",paint:{"line-color":p.water,"line-width":W(.5,3)}}];
 if(!p.minimal)L.push({id:"building",type:"fill",source:"o","source-layer":"building",minzoom:13,paint:{"fill-color":p.building}},
  road("minor",["minor","service","track","path"],p.roadMinor,.2,3,11),road("rail",["rail","transit"],p.rail,.3,1.5,10));
 L.push(road("mid",["secondary","tertiary"],p.roadMid,.4,6),road("major",["motorway","trunk","primary"],p.roadMajor,.7,9));
 if(o.labels){const n=nameExpr(o.lang),halo={"text-color":p.label,"text-halo-color":p.land,"text-halo-width":1.2*tu};
  L.push({id:"water_name",type:"symbol",source:"o","source-layer":"water_name",layout:{"text-field":n,"text-font":["Noto Sans Italic"],"text-size":10*tu},paint:{...halo,"text-color":p.water=="#ffffff"?p.label:p.label}},
   {id:"road_name",type:"symbol",source:"o","source-layer":"transportation_name",minzoom:12,filter:["in",["get","class"],["literal",["motorway","trunk","primary","secondary","tertiary"]]],
    layout:{"symbol-placement":"line","text-field":n,"text-font":["Noto Sans Regular"],"text-size":9*tu,"symbol-spacing":250*tu},paint:halo},
   {id:"place",type:"symbol",source:"o","source-layer":"place",filter:["in",["get","class"],["literal",["city","town","suburb","quarter"]]],
    layout:{"text-field":n,"text-font":["Noto Sans Regular"],"text-size":["match",["get","class"],"city",16*tu,"town",13*tu,"suburb",11*tu,10*tu],"text-transform":o.lang=="en"?"uppercase":"none","text-letter-spacing":.08},paint:{...halo,"text-opacity":.85}})}
 return{version:8,glyphs:OFM_GLYPHS,sources:{o:{type:"vector",url:OFM_SRC,attribution:ATTRIB}},layers:L}}
const MAPSTYLES={
 "浅灰 Light":{bg:"#ffffff",route:"#f05a5a",text:"#3c3c3c",accent:"#9aa0a6",map:{land:"#f4f4f2",landuse:"#eeeeec",park:"#e3e8df",water:"#cfd8de",building:"#e6e6e3",roadMajor:"#ffffff",roadMid:"#ffffff",roadMinor:"#fbfbfa",rail:"#dddddd",label:"#8a8f94"}},
 "深夜 Dark":{bg:"#141517",route:"#ffb000",text:"#eeeeee",accent:"#8b8e94",map:{land:"#141517",landuse:"#17181b",park:"#1a1e1c",water:"#0b0c0e",building:"#1d1e21",roadMajor:"#3a3c41",roadMid:"#2e3035",roadMinor:"#24262a",rail:"#2a2b2f",label:"#7c8088"}},
 "极简 Minimal":{bg:"#ffffff",route:"#111111",text:"#111111",accent:"#999999",map:{minimal:true,land:"#ffffff",landuse:"#ffffff",park:"#ffffff",water:"#e9eef2",building:"#ffffff",roadMajor:"#e2e2e2",roadMid:"#ececec",roadMinor:"#f2f2f2",rail:"#eeeeee",label:"#9a9a9a"}},
 "纸张 Paper":{bg:"#f7f1e6",route:"#b23a2a",text:"#3a2e25",accent:"#a08c72",map:{land:"#efe6d5",landuse:"#ebe1cf",park:"#dfdcc2",water:"#c9d3cf",building:"#e4d9c5",roadMajor:"#fbf6ec",roadMid:"#f6efe2",roadMinor:"#f2eadb",rail:"#d9cdb8",label:"#8f7d66"}},
 "蓝图 Blueprint":{bg:"#173a63",route:"#ffffff",text:"#ffffff",accent:"#8fb0d6",map:{land:"#173a63",landuse:"#193e69",park:"#1b4470",water:"#10294a",building:"#1d4472",roadMajor:"#5d84b3",roadMid:"#41699a",roadMinor:"#2c5383",rail:"#2c5383",label:"#9fbde0"}}};
