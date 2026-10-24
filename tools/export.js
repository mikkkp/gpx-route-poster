// 无头导出：node export.js <out.png|pdf> '<JSON 设置>' <gpx...>
// 设置键 = 页面控件 id，例如 {"layout":"bar","style":"浅灰 Light","size":"50x70","orient":"p","title":"…","distance":"42.2 km","sh_pace":false}
const pc=require('puppeteer-core'),fs=require('fs'),path=require('path'),http=require('http');
const root=path.resolve(__dirname,'..'),MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.woff2':'font/woff2'};
(async()=>{const [out,json,...gpx]=process.argv.slice(2),fmt=out.endsWith('.pdf')?'pdf':'png',cfg=JSON.parse(json||'{}');
 const srv=http.createServer((q,r)=>{const f=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(!f.startsWith(root)||!fs.existsSync(f))return r.writeHead(404).end();r.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)}).listen(0);
 const b=await pc.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const p=await b.newPage();await p.setViewport({width:1500,height:1000});p.on('pageerror',e=>console.error('pageerror',e.message));p.on('console',m=>m.type()=='error'&&console.error('console',m.text()));p.setDefaultTimeout(900000);
 await p.goto(`http://127.0.0.1:${srv.address().port}/index.html`);
 const order=['style','layout',...Object.keys(cfg).filter(k=>k!='style'&&k!='layout')];
 for(const k of order)if(k in cfg)await p.evaluate((k,v)=>__api.set(k,v),k,cfg[k]);
 for(const g of gpx)await p.evaluate((n,t)=>__api.load(n,t),path.basename(g),fs.readFileSync(g,'utf8'));
 await p.evaluate(()=>__api.refit());await p.evaluate(()=>__api.ready());await new Promise(r=>setTimeout(r,1500));await p.evaluate(()=>__api.ready());
 fs.writeFileSync(out,Buffer.from(await p.evaluate(f=>__api.exportB64(f),fmt),'base64'));
 console.log(out,JSON.stringify(await p.evaluate(()=>__api.sizePx())),JSON.stringify(await p.evaluate(()=>__api.lastExport())));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
