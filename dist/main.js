(()=>{"use strict";class t{static frequencyLookup={c:261.63,"c#":277.18,d:293.66,"d#":311.13,e:329.63,f:349.23,"f#":369.99,g:392,"g#":415.3,a:440,"a#":466.16,b:493.88};constructor(e,a){this.note=e,this.octave=a;const s=t.frequencyLookup[e.toLowerCase()];if(!s)throw new Error(`that note (${e}) does not exist, only sharps are accepted`);this.frequency=s*Math.pow(2,a)}static NoteFromFequency(){Object.values(t.frequencyLookup).filter()}}const e=[0,12],a=[0,1],s=[10,90],i=[100,300],o=[2,2,2,4,4,4,4,4,8,8,8,16,16,32],r=[2,32],h=[(n=new t("a",-1),new class{constructor(t,e){if(this.steps=t,this.startingNote=e,!e.note||!e.frequency||!e.octave)throw new Error("Make sure to pass a note object to the scale constructor")}getNoteAtScaleStep(e){const a=Math.floor(e/this.steps.length)+this.startingNote.octave,s=this.steps[e%this.steps.length],i=(Object.keys(t.frequencyLookup).indexOf(this.startingNote.note)+s)%12,[o]=Object.entries(t.frequencyLookup)[i];if(!o)throw new Error(`could not get note ${this.startingNote} in ${Object.keys(t.frequencyLookup)}`);return new t(o,a)}}([0,2,4,6,7,9,11],n))];var n;const l=[0,16],c=["square","sawtooth"],d=[-1,1],u=(t,[e,a])=>t<e?e:t>a?a:t;class p{constructor({stemHeight:t,petalCurve:o,petalWidth:h,petalHeight:n,petalColor:c,petalCount:p,headScalePattern:w,scale:f,petalOffset:g,waveType:v,panning:C}){this.stemHeight=u(t,e),this.petalCurve=u(o,a),this.petalWidth=u(h,s),this.petalHeight=u(n,i),this.petalColor=c,this.petalCount=u(p,r),this.petalOffset=u(g,l),this.waveType=v,this.panning=u(C,d),this.headScalePattern=w,this.scale=f}static getSerialization(){}static MergeFlowerData(t,e){}static RandomFlowerData(){return new p({stemHeight:Math.floor(Math.random()*e[1]),petalCurve:Math.random()*a[1],petalWidth:Math.random()*s[1]+20,petalHeight:Math.random()*i[1]+100,petalColor:[Math.floor(255*Math.random()),Math.floor(255*Math.random()),Math.floor(255*Math.random())],petalCount:o[Math.floor(Math.random()*o.length)],headScalePattern:[0],scale:h[0],petalOffset:Math.random()*l[1],waveType:c[Math.floor(c.length*Math.random())],panning:u(2*Math.random()-1,d)})}}class w{constructor(t,e,a){this.state=a,this.data=e,this.ctx=t}draw(){const t=window.innerHeight-(70*this.data.stemHeight+100),e=window.innerWidth/2+this.data.panning*window.innerWidth/2;this.ctx.translate(e,t),this.drawStem(10,t),this.drawHead(),this.drawPetals(),this.ctx.translate(-1*e,-1*t)}drawStem(t,e){this.ctx.fillStyle="#73ba8d",this.ctx.fillRect(-.5*t,0,t,flowerCanvas.height-e)}drawPetals(){var t=Math.PI/180;const e=t*(360/l[1]*this.data.petalOffset);this.ctx.rotate(e);for(var a=0;a<this.data.petalCount;a++){const e=a==this.state.currentStep&&this.state.isPlaying,s=this.data.petalColor,i=`#${s[0].toString(16)}${s[1].toString(16)}${s[2].toString(16)}`,o=e?i:i+"88";this.ctx.fillStyle=o,this.ctx.beginPath(),this.ctx.moveTo(0,0),c[1]==this.data.waveType?(this.ctx.bezierCurveTo(this.data.petalCurve*this.data.petalHeight,this.data.petalWidth,this.data.petalCurve*this.data.petalHeight,this.data.petalWidth,this.data.petalHeight,0),this.ctx.moveTo(0,0),this.ctx.bezierCurveTo(this.data.petalCurve*this.data.petalHeight,-1*this.data.petalWidth,this.data.petalCurve*this.data.petalHeight,this.data.petalWidth,this.data.petalHeight,0)):(this.ctx.quadraticCurveTo(this.data.petalCurve*this.data.petalHeight,this.data.petalWidth,this.data.petalHeight,0),this.ctx.moveTo(0,0),this.ctx.quadraticCurveTo(this.data.petalCurve*this.data.petalHeight,-1*this.data.petalWidth,this.data.petalHeight,0)),this.ctx.fill(),this.ctx.rotate(t*(360/this.data.petalCount))}this.ctx.rotate(t*(360-360/this.data.petalCount*a)),this.ctx.rotate(-1*e)}drawHead(){this.ctx.fillStyle="#fced7e",this.ctx.beginPath(),this.ctx.arc(0,0,15,0,2*Math.PI),this.ctx.fill()}}class f{constructor({currentStep:t}={}){this.currentStep=t||0,this.receivedBeats=0,this.isPlaying=!1}reset(){this.currentStep=0,this.receivedBeats=0}}class g{constructor(t,e,a){this.state=a,this.data=e,this.audioCtx=t,this.amount=Math.random()<.5?.5:1}destroy(){this.stopCurrentNote()}playCurrentNote(){const t=this.data.scale.getNoteAtScaleStep(this.data.stemHeight);if(!this.state.isPlaying&&Math.random()<this.amount){this.oscillator=new OscillatorNode(this.audioCtx,{type:this.data.waveType,frequency:t.frequency}),this.filter=new BiquadFilterNode(this.audioCtx,{frequency:200,Q:0}),this.panning=new StereoPannerNode(this.audioCtx,{pan:this.data.panning});const e=this.data.petalCount<16?Math.floor(this.data.petalWidth/10):Math.floor(4*Math.random());this.filter.frequency.setTargetAtTime(400,this.audioCtx.currentTime,e),this.oscillator.connect(this.filter).connect(this.audioCtx.destination),this.oscillator.start(),this.state.isPlaying=!0}}stopCurrentNote(){this.state.isPlaying&&(this.oscillator.stop(),this.oscillator.disconnect(),this.oscillator=null,this.state.isPlaying=!1)}}class v{constructor(t,e){this.state=new f,this.data=p.RandomFlowerData(),this.visualizer=new w(t,this.data,this.state),this.audio=new g(e,this.data,this.state)}beatUpdate(){const t=Math.floor(128/this.data.petalCount);0===this.state.receivedBeats&&this.audio.playCurrentNote(),this.state.receivedBeats===Math.floor(128/this.data.petalCount)-2&&this.audio.stopCurrentNote(),this.state.receivedBeats+=1,this.state.receivedBeats===t&&(this.state.receivedBeats=0,this.state.currentStep=(this.state.currentStep+1)%this.data.petalCount)}destroy(){this.audio.destroy()}}class C{static BPM=120;static MSPB=6e4/C.BPM;constructor(){this.count=0}render(t){this.count++,32==this.count&&(this.count=0),t.forEach((t=>{t.beatUpdate()}))}}class x{constructor(t){this.ctx=t}render(t){this.clearCanvas(),t.forEach((t=>{t.visualizer.draw()}))}clearCanvas(){this.ctx.fillStyle="#dde0cc",this.ctx.fillRect(0,0,flowerCanvas.width,flowerCanvas.height)}}class y{constructor(){this.flowers={};const t=window.AudioContext||window.webkitAudioContext;this.audioContext=new t;const e=document.getElementById("flowerCanvas");this.canvasContext=e.getContext("2d"),this.audioRenderer=new C,this.visualRenderer=new x(this.canvasContext),window.setInterval((()=>{this.audioRenderer.render(this.getFlowers())}),C.MSPB/16),window.setInterval((()=>{this.visualRenderer.render(this.getFlowers())}),16),this.visualRenderer.render(this.getFlowers())}addFlower(t=!0){const e=new v(this.canvasContext,this.audioContext),a=e.data.stemHeight%4;if(this.flowers[a]){if(this.flowers[a].length>=(a<2?1:3)){if(!t)return void console.warn("flower not added too many similiar notes");this.flowers[a].splice(0,1)}this.flowers[a].push(e)}else this.flowers[a]=[e]}getFlowers(){return Object.values(this.flowers).reduce(((t,e)=>[...t,...e]),[])}resetFlowers(){this.getFlowers().forEach((t=>{t.destroy()})),this.flowers={}}}let m;function M(){const t=document.getElementById("flowerCanvas"),e=window.innerHeight,a=window.innerWidth;t.setAttribute("width",a),t.setAttribute("height",e)}window.onload=function(){window.onclick=()=>{if(console.log("clicked"),m){m.resetFlowers();const t=Math.floor(5*Math.random())+1;for(let e=0;e<=t;e++)m.addFlower(!0)}else m=new y,m.addFlower(),M(),window.onresize=function(t){M()}}}})();