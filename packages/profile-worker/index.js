const shell = require('shelljs');
const { cd, exec, cp } = shell;

const path = require('path');
let VUE_PROFILE_PATH = path.resolve(__dirname, './playground');
let VUE_PROFILE_NAME = 'vue-profile';

// bind fetcher to vm, when vm created send the request
  // `trigger-created`
  // `action-xhr`: can modify xhr's properties
// when recieve response, translate data by adaptor(code adaptor)
  // `trigger-getResponse`: only can bind to `action-xhr`
  // set the vm'data with tanslated data
  // `action-set-vmdata`
function createVueProject(projectPath) {
  const defaultPresetPath = path.resolve(__dirname, './preset.json');

  VUE_PROFILE_PATH = projectPath;
  cd(VUE_PROFILE_PATH);
  exec(`rm -rf ${VUE_PROFILE_NAME}`);
  exec(`vue create --preset ${defaultPresetPath} ${VUE_PROFILE_NAME}`);
}

const fs = require('fs');
const sfcParser = require('./src/sfc-generator');

function updateVueProjectContent(ast) {
  const nextSFC = sfcParser.generateSFC(ast);
  fs.writeFileSync(getProfileContentPath(), nextSFC);
}

function getProfileContentPath() {
  return path.resolve(getProfilePath(), './src/App.vue');
}

function runDevServer() {
  cd(getProfilePath());
  exec(`npm run serve`);
}

function getProfilePath() {
  return path.resolve(VUE_PROFILE_PATH, VUE_PROFILE_NAME);
}

function updateStaticFile(sourceStaticDirPath) {
  const profilePath = getProfilePath();  
  const profileStaticPath = path.resolve(profilePath, './src');
  cp('-r', sourceStaticDirPath, profileStaticPath);
}

module.exports = {
  createVueProject,
  updateVueProjectContent,
  runDevServer,
  updateStaticFile,
}