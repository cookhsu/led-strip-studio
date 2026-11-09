(()=>{
const button=document.getElementById('header-cabinet');
const types=[
['under','櫃底工作燈','照亮料理檯面與工作區','━'],
['shelf','層板燈','沿層板延伸的柔和線光','☰'],
['display','展示櫃燈','多層陳列，突顯收藏與商品','▤'],
['puck','圓形櫃底燈','三盞圓形燈具的局部照明','● ● ●'],
['bar','鋁槽線型燈','帶有金屬燈體的俐落線光','▰'],
['toe','踢腳夜燈','櫃底低位照明，營造夜間氛圍','▁'],
['rod','衣桿燈','衣帽間吊衣區照明','┯'],
['drawer','抽屜燈','抽屜上緣照明與開門互動','▣']];
const dialog=document.createElement('dialog');dialog.id='cabinet-gallery';dialog.setAttribute('aria-labelledby','cabinet-gallery-title');
dialog.innerHTML='<div class="inquiry-heading"><div><small class="eyebrow">CABINET LIGHT COLLECTION</small><h2 id="cabinet-gallery-title">探索櫥櫃燈的不同樣貌</h2></div><button aria-label="關閉櫥櫃燈選單">×</button></div><p class="hint">選一款燈具，進入可旋轉、縮放的 3D 情境展示。</p><div class="cabinet-type-grid"></div><p class="hint">以下為燈具類型與安裝效果示意，實際型號、尺寸與規格請洽服務團隊。</p>';
document.body.append(dialog);
dialog.querySelector('button').onclick=()=>dialog.close();
const grid=dialog.querySelector('.cabinet-type-grid');
for(const [zone,name,description,icon]of types){const card=document.createElement('button');card.className='cabinet-type-card';card.innerHTML='<span class="fixture-icon" aria-hidden="true">'+icon+'</span><strong>'+name+'</strong><span>'+description+'</span>';card.onclick=()=>{window.StripStudio.applyPreset({shape:['rod','drawer'].includes(zone)?'wardrobe':'cabinet',placement:zone,style:zone==='toe'?'warm':'neutral',brightness:zone==='toe'?45:85,speed:0,direction:1,doorOpen:true});dialog.close();document.querySelector('.stage').scrollIntoView({block:'start',behavior:'smooth'});document.getElementById('stage-description').textContent=name+' · '+description;document.getElementById('status').textContent='正在展示：'+name+'，可旋轉觀看、切換燈效或分享方案。';};grid.append(card);}
function sync(){button.setAttribute('aria-pressed',String(['cabinet','wardrobe'].includes(window.StripStudio.read().settings.shape)));}
button.addEventListener('click',()=>dialog.showModal());
document.addEventListener('stripstudiochange',sync);sync();
})();