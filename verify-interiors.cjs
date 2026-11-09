const assert=require('node:assert/strict');global.window={};require('./public/vendor/three.min.js');const T=window.THREE;require('./public/building.js');require('./public/lifestyle.js');require('./public/interiors.js');require('./public/showcase.js');const demo=createRainbowShowcase(T);for(const kind of ['building','room','cabinet','heart','infinity']){demo.setShape(kind);const visible=demo.group.children.filter(x=>x.visible&&x.type==='Group');assert.equal(visible.length,1);if(['building','room','cabinet'].includes(kind)){const zones=visible[0].userData.zones;assert.equal(Object.keys(zones).length,kind==='cabinet'?6:3);const selected=Object.keys(zones)[0];demo.setPlacement(kind,selected);assert.equal(Object.values(zones).filter(x=>x.visible).length,1);demo.setPlacement(kind,'all');assert.equal(Object.values(zones).filter(x=>x.visible).length,3);}}demo.group.traverse(o=>{if(o.geometry?.attributes.position)for(const x of o.geometry.attributes.position.array)assert.ok(Number.isFinite(x));});demo.update(1,{style:'breathe',brightness:0});demo.group.traverse(o=>{if(o.material?.uniforms){assert.equal(o.material.uniforms.light.value,0);assert.equal(o.material.uniforms.effect.value,2);}});console.log('Room/cabinet separation, three zones, placement filtering, finite geometry, lighting control passed.');
demo.update(0,{style:'warm',brightness:.75});demo.group.traverse(o=>{if(o.material?.uniforms){assert.equal(o.material.uniforms.effect.value,5);assert.equal(o.material.uniforms.light.value,.75);assert.equal(o.material.uniforms.tone.value.getHex(),0xffd3a1);}});demo.update(0,{style:'neutral',brightness:0});demo.group.traverse(o=>{if(o.material?.uniforms){assert.equal(o.material.uniforms.light.value,0);assert.equal(o.material.uniforms.tone.value.getHex(),0xfff0d6);}if(o.isPointLight)assert.equal(o.intensity,0);});console.log('Warm and neutral presets plus lights-off comparison passed.');


const Share=require('./public/share-model.js'), Inquiry=require('./public/inquiry-model.js');
for(const placement of ['under','shelf','display','puck','bar','toe']){
 demo.setShape('cabinet');demo.setPlacement('cabinet',placement);
 const zones=demo.group.children.find(g=>g.visible&&g.isGroup).userData.zones;
 assert.deepEqual(Object.keys(zones).filter(k=>zones[k].visible),[placement]);
 const state={lightsOn:true,settings:{shape:'cabinet',placement,style:'neutral',brightness:85,speed:0,direction:1}};
 assert.equal(Share.decode(Share.encode(state)).settings.placement,placement);
 assert.ok(!Inquiry.summarize(state).find(row=>row[0]==='安裝位置')[1].includes('自由造型'));
}
console.log('Six cabinet fixture selections, share restoration and inquiry labels passed.');
