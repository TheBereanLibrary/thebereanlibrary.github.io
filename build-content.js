// Node.js script
const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname,'content');
const outputFile = path.join(__dirname,'assets/js/content-routes.js');

function getJsonFiles(dir){
  let results = [];
  const list = fs.readdirSync(dir,{withFileTypes:true});
  list.forEach(f=>{
    const fullPath = path.join(dir,f.name);
    if(f.isDirectory()) results = results.concat(getJsonFiles(fullPath));
    else if(f.isFile() && f.name.endsWith('.json')) results.push(fullPath);
  });
  return results;
}

const files = getJsonFiles(contentDir);
const routes = {};
const searchFiles = [];

files.forEach(f=>{
  let route = f.replace(contentDir,'').replace(/\\/g,'/').replace(/\.json$/,'');
  if(!route.startsWith('/')) route='/' + route;
  routes[route] = f.replace(__dirname+'/','');
  searchFiles.push(f.replace(__dirname+'/',''));
});

const jsContent = `
// Auto-generated content routes
const ROUTES = ${JSON.stringify(routes,null,2)};
const CONTENT_FILES = ${JSON.stringify(searchFiles,null,2)};
export { ROUTES, CONTENT_FILES };
`;

fs.writeFileSync(outputFile, jsContent);
console.log('✅ content-routes.js generated with', files.length,'files');
