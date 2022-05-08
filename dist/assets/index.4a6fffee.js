var Ce=Object.defineProperty,ke=Object.defineProperties;var ve=Object.getOwnPropertyDescriptors;var re=Object.getOwnPropertySymbols;var we=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable;var Q=(e,t,r)=>t in e?Ce(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,ne=(e,t)=>{for(var r in t||(t={}))we.call(t,r)&&Q(e,r,t[r]);if(re)for(var r of re(t))Se.call(t,r)&&Q(e,r,t[r]);return e},oe=(e,t)=>ke(e,ve(t));var c=(e,t,r)=>(Q(e,typeof t!="symbol"?t+"":t,r),r);import{P as Ne,E as ue,m as ee,o as k,c as z,a as B,r as C,s as S,C as de,R as he,j as i,b as v,d as p,F as H,e as se,f as Ie}from"./vendor.caea33e2.js";const Fe=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerpolicy&&(s.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?s.credentials="include":o.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}};Fe();const ae=8,te=3,Ee=2,Oe=6,D=54,Re=5,y=String("symbol_pass");var h=(e=>(e.Open="open",e.Data="data",e.Send="send",e.Connection="connection",e.Error="error",e))(h||{}),pe=(e=>(e.Room="room",e))(pe||{}),L=(e=>(e.PeerId="peer_id",e.NickName="nick_name",e))(L||{}),E=(e=>(e.Room="room",e.Game="game",e.Discard="discard",e))(E||{}),I=(e=>(e.Nick="nick",e.Player="user",e.Discard="discard",e.Restart="restart",e))(I||{}),K=(e=>(e.Info="info",e.Warn="warn",e.Error="error",e))(K||{}),u=(e=>(e[e.Number3=0]="Number3",e[e.Number4=1]="Number4",e[e.Number5=2]="Number5",e[e.Number6=3]="Number6",e[e.Number7=4]="Number7",e[e.Number8=5]="Number8",e[e.Number9=6]="Number9",e[e.Number10=7]="Number10",e[e.Jack=8]="Jack",e[e.Queen=9]="Queen",e[e.King=10]="King",e[e.Ace=11]="Ace",e[e.Number2=12]="Number2",e[e.BlackJoker=13]="BlackJoker",e[e.RedJoker=14]="RedJoker",e))(u||{}),fe=(e=>(e[e.None=0]="None",e[e.Heart=1]="Heart",e[e.Spade=2]="Spade",e[e.Diamond=3]="Diamond",e[e.Club=4]="Club",e))(fe||{}),d=(e=>(e[e.Invalid=0]="Invalid",e[e.Single=1]="Single",e[e.Pair=2]="Pair",e[e.Sequence=3]="Sequence",e[e.SequenceOfPairs=4]="SequenceOfPairs",e[e.Bomb=5]="Bomb",e))(d||{});let O;const me=async()=>O||new Promise((e,t)=>{var r;O=new Ne((r=localStorage.getItem(L.PeerId))!=null?r:void 0),O.on(h.Error,t),O.on(h.Open,n=>{localStorage.setItem(L.PeerId,n),O.off(h.Error,t),e(O)}),window.webrtc=O});let ge,xe;const De=(e=console.error,t=console.error)=>{ge=e,xe=t},J={init:De,notify:(e,t)=>ge(e,t),broadcast:e=>xe(e)};var Be=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,j=(e,t,r,n)=>{for(var o=n>1?void 0:n?Pe(t,r):t,s=e.length-1,a;s>=0;s--)(a=e[s])&&(o=(n?a(t,r,o):a(o))||o);return n&&o&&Be(t,r,o),o};const l=class{static GetShuffledCards(e){const t=l.GetCardsBySetCount(e);return l.Shuffle(t)}static GetCardsInfo(e,t){if(e===y||e.length===0)return{type:d.Invalid,base:0,order:0,range:0,cards:[]};const r=e.map(m=>l.GetCardPointById(m)),n=l.GetCardsType(r,t),o=r.length,{range:s,base:a}=l.GetCardsRangeValue(n,r);return{type:n,base:a,range:s,order:o,cards:e}}static CheckCombinationCounter(e,t){return e.type===d.Invalid?!1:t===y?(e.value=e.base+e.range,!0):e.type===d.Bomb?l.CheckBombCounter(e,t):e.type!==t.type||e.order!==t.order?!1:e.type>=d.Sequence?l.CheckSequenceCounter(e,t):l.CheckNumberCounter(e,t)}static SortCardByPoint(e,t){const r=l.GetCardPointById(e),n=l.GetCardPointById(t);return r-n||e-t}static Shuffle(e,t=Math.random){return e.sort(()=>.5-t())}static GetSingleSet(){return Array(D).fill(0).map((e,t)=>t)}static GetCardsBySetCount(e){const t=[];return Array(e).fill(l.GetSingleSet()).forEach((r,n)=>{t.push(...r.map(o=>o+n*D))}),t}static GetPointCount(e){const t=Array(u.RedJoker+1).fill(0);return e.forEach(r=>t[r]++),t}static GetCardPointById(e){const t=e%D;return t===D-2?u.BlackJoker:t===D-1?u.RedJoker:t%13}static GetCardSuitById(e){const t=e%D;return t>=D-2?fe.None:~~(t/13)+1}static GetJokerCount(e){return e.filter(t=>t>=u.BlackJoker).length}static CheckJokerRule(e){return e.some(t=>t<u.BlackJoker)}static ObeyJokerRule(e,t,r){const n=r.value;r.value=function(o){return l.CheckJokerRule(o)&&n(o)}}static GetCardsType(e,t){console.log("GetCardsType",e);const r={[d.Bomb]:l.CheckIsBomb,[d.SequenceOfPairs]:l.CheckIsSequenceOfPairs,[d.Sequence]:l.CheckIsSequence,[d.Pair]:l.CheckIsPair,[d.Single]:l.CheckIsSingle};let n=[d.Bomb,d.SequenceOfPairs,d.Sequence,d.Pair,d.Single];t&&(n=n.filter(o=>o!==t),n.unshift(t));for(let o=0;o<n.length;o++){const s=n[o],a=r[s];if(a==null?void 0:a(e))return+s}return d.Invalid}static GetCardsRangeValue(e,t){return e===d.Sequence?l.GetRangeOfSequence(t):e===d.SequenceOfPairs?l.GetRangeOfSequenceOfPairs(t):{range:0,base:t.sort((r,n)=>r-n)[0]}}static CheckIsSingle(e){return e.length===1}static CheckIsPair(e){const t=e.length===2,r=e[0]===e[1]||l.GetJokerCount(e)===1;return t&&r}static CheckIsSequence(e){if(e.length<3||e.length-1>u.Ace)return!1;const r=l.GetPointCount(e).slice(0,u.Number2);return r.some(o=>o>1)?!1:r.lastIndexOf(1)-r.indexOf(1)+1<=e.length}static CheckIsSequenceOfPairs(e){if(e.length%2!==0||e.length<4||e.length/2-1>u.Ace)return!1;const r=l.GetPointCount(e).slice(0,u.Number2);if(r.some(x=>x>2))return!1;const n=l.GetJokerCount(e),o=r.filter(x=>x===1).length;if((n+o)%2!==0)return!1;const a=r.map(x=>x>0);return a.lastIndexOf(!0)-a.indexOf(!0)+1<=e.length/2}static CheckIsBomb(e){return e.length<3?!1:l.GetPointCount(e).slice(0,u.Number2+1).filter(n=>n>0).length===1}static GetRangeOfSequence(e){const r=l.GetPointCount(e).slice(0,u.Number2),n=r.lastIndexOf(1)-r.indexOf(1)+1,s=e.length-n,a=Math.min(s,r.indexOf(1)-u.Number3,u.Ace+r.lastIndexOf(1),u.Ace+1-e.length),m=e.sort((x,_)=>x-_)[0]-Math.min(s,r.indexOf(1)-u.Number3);return{range:a,base:m}}static GetRangeOfSequenceOfPairs(e){const r=l.GetPointCount(e).slice(0,u.Number2),n=r.map(_=>_>0),o=l.GetJokerCount(e),s=r.filter(_=>_===1).length,a=(o-s)/2,m=Math.min(a,n.indexOf(!0)-u.Number3,u.Ace+n.lastIndexOf(!0),u.Ace+1-e.length/2),x=e.sort((_,F)=>_-F)[0]-Math.min(a,n.indexOf(!0)-u.Number3);return{range:m,base:x}}static CheckBombCounter(e,t){return t.type!==d.Bomb?!0:e.order!==t.order?e.order>t.order:e.base>t.base}static CheckSequenceCounter(e,t){const r=e.base,n=e.base+e.range,o=t.value+1;return o<r||o>n?!1:(e.value=o,!0)}static CheckNumberCounter(e,t){return t.base===u.Number2?!1:e.base===u.Number2?!0:e.base===t.base+1}};let w=l;j([l.ObeyJokerRule],w,"CheckIsSingle",1);j([l.ObeyJokerRule],w,"CheckIsPair",1);j([l.ObeyJokerRule],w,"CheckIsSequence",1);j([l.ObeyJokerRule],w,"CheckIsSequenceOfPairs",1);j([l.ObeyJokerRule],w,"CheckIsBomb",1);class Ae{constructor(t,r=[]){c(this,"seat");c(this,"_cards");this.seat=t,this._cards=r.concat()}get cards(){return this._cards.concat()}addCard(t){this._cards.push(t),this._cards.sort(w.SortCardByPoint)}removeCards(t){this._cards=this._cards.filter(r=>t.indexOf(r)===-1)}}class Ge{constructor(t,r){c(this,"_winner");c(this,"_seat",0);c(this,"_players");c(this,"_recent");c(this,"_cards");c(this,"_banker",0);this._winner=[],this._recent=y,this._banker=this._seat=0,this._cards=w.GetShuffledCards(t),this._initPlayer(r)}get winner(){return this._winner.concat()}get seat(){return this._seat}get players(){return this._players}get recent(){return this._recent}play(t){if(t.type===d.Invalid)return!1;const{cards:r}=t;if(this._players[this._seat].removeCards(r),this._players[this._seat].cards.length===0&&this._winner.push(this._seat),this._players.length-1===this._winner.length)return!0;const n=this._getNextSeat();return this._winner.indexOf(this._seat)>-1?this._banker=n:this._banker=this._seat,this._seat=n,this._recent=t,!1}pass(){if(this._recent===y)return console.error("\u9996\u5BB6\u4E0D\u80FDpass"),!1;const t=this._getNextSeat();return this._seat=t,this._seat===this._banker&&(this._recent=y,this._dealCard()),!1}_initPlayer(t){this._players=Array(t).fill(0).map((r,n)=>new Ae(n));for(let r=0;r<Re;r++)this._dealCard();this._dealCardForPlayer(this._banker)}_dealCard(){const t=this._players.length;for(let r=this._banker;r<this._banker+t;r++){const n=r%t;this._dealCardForPlayer(n)}}_dealCardForPlayer(t){if(this._cards.length===0)return;const r=this._players[t];if(this._winner.indexOf(r.seat)!==-1)return;const n=this._cards.shift();r.addCard(n)}_getNextSeat(){let t=this._seat;do t++,t%=this._players.length;while(this._winner.indexOf(t)>-1);return t}}class Le{constructor(){c(this,"_game");c(this,"_bankerShift",0);c(this,"_clients",[]);c(this,"_histories",[])}start(t,r=0){this._clients=t,this._bankerShift=r;const n=Math.ceil(this._clients.length/te);this._histories=[],this._shiftPlayer(),this._game=new Ge(n,this._clients.length),this._notifyGameMessage()}discard(t,r){var a;if(!this._game)return;console.warn(t,r);const n=this._clients.findIndex(m=>m.id===t),o=w.GetCardsInfo(r,(a=this._game.recent)==null?void 0:a.type);let s=n===this._game.seat;r===y?s&&(s=this._game.recent!==y):(s&&(s=o.type!==d.Invalid),s&&(s=w.CheckCombinationCounter(o,this._game.recent))),J.notify({type:E.Discard,data:s},t),!!s&&(r===y?this._game.pass():this._game.play(o),this._histories.push({seat:n,discard:o,count:this._game.players[n].cards.length}),this._notifyGameMessage())}_clear(){this._game=void 0,this._histories=[],this._bankerShift=0,this._clients=[],this._histories=[],this._notifyGameMessage()}_shiftPlayer(){const t=this._clients.concat(),r=t.length;this._clients=Array(r).fill(null).map((n,o)=>t[(o+this._bankerShift)%r])}_notifyGameMessage(){this._clients.forEach((t,r)=>{if(!this._game)return;const n=this._game.players[r],o={type:E.Game,data:{seat:r,players:this._clients,banker:this._game.seat,winner:this._game.winner,recent:this._game.recent,handcards:n.cards,playerCardCount:this._game.players.map(s=>s.cards.length),history:this._histories}};J.notify(o,t.id)})}}const Z=new Le;class Je{constructor(){c(this,"_roomId");c(this,"_playerCount",0);c(this,"_players",[])}setPlayerCount(t,r=te){this._playerCount=r,this._players.length=0,this._roomId=t,this._boardcastRoomInfo()}addPlayer(t,r){this._players.length<this._playerCount&&(this._players.push({id:t,name:r}),this._players.length===this._playerCount&&Z.start(this._players)),this._boardcastRoomInfo()}restart(t){const r=this._players.findIndex(n=>n.id===t);Z.start(this._players,r)}_boardcastRoomInfo(){console.warn("_broadcastRoomInfo",this._players),J.broadcast({type:E.Room,data:{roomId:this._roomId}})}}const V=new Je,$=e=>{const{type:t,data:r,peerId:n}=e;switch(t){case I.Player:V.setPlayerCount(n,r);break;case I.Nick:V.addPlayer(n,r);break;case I.Restart:V.restart(r);break;case I.Discard:Z.discard(n,r);break}};class ze{constructor(){c(this,"_peer");c(this,"socket",new ue)}get peerId(){return this._peer.id}async start(){return this._peer=await me(),this._peer.on(h.Connection,this._onPeerConnect.bind(this)),this.socket.on(h.Send,$),this._setMessager(),this._peer.id}stop(){this._peer.off(h.Connection,this._onPeerConnect.bind(this)),this.socket.off(h.Send,$);for(const t in this._peer.connections)this._peer.connections[t].forEach(n=>{n.off(h.Data,$),n.close()});J.init()}_setMessager(){J.init((t,r)=>{const n=this._peer.connections[r];n==null||n.forEach(o=>o.send(t)),r===this._peer.id&&this.socket.emit(h.Data,t)},t=>{for(const r in this._peer.connections)this._peer.connections[r].forEach(o=>{o.send(t)});this.socket.emit(h.Data,t)})}_onPeerConnect(t){t.on(h.Data,$)}}const P=new ze;class je{constructor(){c(this,"_cbList",[]);c(this,"id")}async init(){return P.start().then(t=>{this.id=t})}close(){P.stop(),this._cbList.forEach(t=>this.off(t)),this._cbList.length=0}send(t,r){const n={type:t,data:r,peerId:P.peerId};P.socket.emit(h.Send,n)}on(t){this._cbList.push(t),P.socket.on(h.Data,t)}off(t){this._cbList=this._cbList.filter(r=>r!==t),P.socket.off(h.Data,t)}}const qe=new je;class Me{constructor(){c(this,"_connection");c(this,"_cbList",[]);c(this,"id")}async init(t){const r=await me();return this.id=r.id,this._connection=r.connect(t),new Promise((n,o)=>{r.on(h.Error,o),this._connection.on(h.Open,()=>{r.off(h.Error,o),console.log("peer connect open",t),n()})})}close(){var t;this._cbList.forEach(r=>this.off(r)),this._cbList.length=0,(t=this._connection)==null||t.close(),this._connection=void 0,this.id=void 0}send(t,r){var o;const n={type:t,data:r,peerId:this.id};(o=this._connection)==null||o.send(n)}on(t){var r;this._cbList.push(t),(r=this._connection)==null||r.on(h.Data,t)}off(t){var r;this._cbList=this._cbList.filter(n=>n!==t),(r=this._connection)==null||r.off(h.Data,t)}}const $e=new Me;class He{constructor(){c(this,"_connect");c(this,"_dispatcher",new ue)}_clearConnection(){var t,r;(t=this._connect)==null||t.off(this._dispatch.bind(this)),(r=this._connect)==null||r.close(),this._connect=void 0}async _initConnect(t,r){this._clearConnection(),t?this._connect=qe:this._connect=$e,await this._connect.init(r),this._connect.on(this._dispatch.bind(this))}_dispatch(t){this._dispatcher.emit(t.type,t.data)}get connectId(){var t,r;return(r=(t=this._connect)==null?void 0:t.id)!=null?r:""}async createRoom(t=te,r){var n,o;await this._initConnect(!0),(n=this._connect)==null||n.send(I.Player,t),(o=this._connect)==null||o.send(I.Nick,r)}async joinRoom(t,r){var n;await this._initConnect(!1,t),(n=this._connect)==null||n.send(I.Nick,r)}async leaveRoom(){this._clearConnection(),this._dispatch({type:E.Room})}async discardCard(t){return new Promise((r,n)=>{var s;const o=a=>{this._dispatcher.off(E.Discard,o),r(a)};(s=this._connect)==null||s.send(I.Discard,t),this._dispatcher.on(E.Discard,o)})}restart(t){var r;(r=this._connect)==null||r.send(I.Restart,t)}subscribe(t,r){this._dispatcher.on(t,r)}unsubscribe(t,r){this._dispatcher.off(t,r)}}const R=new He;var Ke=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,g=(e,t,r,n)=>{for(var o=n>1?void 0:n?Ue(t,r):t,s=e.length-1,a;s>=0;s--)(a=e[s])&&(o=(n?a(t,r,o):a(o))||o);return n&&o&&Ke(t,r,o),o};class f{constructor(){c(this,"seat",0);c(this,"banker",0);c(this,"winner",[]);c(this,"recent",y);c(this,"handcards",[]);c(this,"playerCardCount",[]);c(this,"selected",[]);c(this,"history",[]);c(this,"players",[]);ee(this),R.subscribe(E.Game,this._onGameData.bind(this))}get isWin(){return this.winner.indexOf(this.seat)>-1}get gameStarted(){return this.playerCardCount.length>0}get gameOver(){return this.winner.length===this.playerCardCount.length-1}selectCard(t){const r=this.selected.concat();this.selected.indexOf(t)===-1?this.selected=[...r,t]:this.selected=r.filter(n=>n!==t)}clearSelected(){this.selected=[]}clear(){this.seat=0,this.banker=0,this.winner=[],this.recent=y,this.handcards=[],this.playerCardCount=[],this.selected=[],this.history=[],this.players=[]}_onGameData(t){this.seat=t.seat,this.banker=t.banker,this.winner=t.winner,this.recent=t.recent,this.handcards=t.handcards,this.playerCardCount=t.playerCardCount,this.history=t.history,this.players=t.players,this.selected=[]}}g([k],f.prototype,"seat",2);g([k],f.prototype,"banker",2);g([k],f.prototype,"winner",2);g([k],f.prototype,"recent",2);g([k],f.prototype,"handcards",2);g([k],f.prototype,"playerCardCount",2);g([k],f.prototype,"selected",2);g([k],f.prototype,"history",2);g([k],f.prototype,"players",2);g([z],f.prototype,"isWin",1);g([z],f.prototype,"gameStarted",1);g([z],f.prototype,"gameOver",1);g([B],f.prototype,"selectCard",1);g([B],f.prototype,"clearSelected",1);g([B],f.prototype,"clear",1);g([B],f.prototype,"_onGameData",1);const We=new f;var Ye=Object.defineProperty,Qe=Object.getOwnPropertyDescriptor,U=(e,t,r,n)=>{for(var o=n>1?void 0:n?Qe(t,r):t,s=e.length-1,a;s>=0;s--)(a=e[s])&&(o=(n?a(t,r,o):a(o))||o);return n&&o&&Ye(t,r,o),o};class q{constructor(){c(this,"roomId");ee(this),R.subscribe(E.Room,this._onRoomData.bind(this))}get inRoom(){return!!this.roomId}get isHost(){return this.roomId===R.connectId}_onRoomData(t){this.roomId=t==null?void 0:t.roomId}}U([k],q.prototype,"roomId",2);U([z],q.prototype,"inRoom",1);U([z],q.prototype,"isHost",1);U([B],q.prototype,"_onRoomData",1);const Ve=new q;var Xe=Object.defineProperty,Ze=Object.getOwnPropertyDescriptor,W=(e,t,r,n)=>{for(var o=n>1?void 0:n?Ze(t,r):t,s=e.length-1,a;s>=0;s--)(a=e[s])&&(o=(n?a(t,r,o):a(o))||o);return n&&o&&Xe(t,r,o),o},ce;class M{constructor(){c(this,"nickName",(ce=localStorage.getItem(L.NickName))!=null?ce:"");c(this,"editing",!0);ee(this)}showEdit(){this.editing=!0}editNickName(t){localStorage.setItem(L.NickName,t),this.nickName=t!=null?t:"Unknown",this.editing=!1}}W([k],M.prototype,"nickName",2);W([k],M.prototype,"editing",2);W([B],M.prototype,"showEdit",1);W([B],M.prototype,"editNickName",1);const Te=new M,_e={user:Te,game:We,room:Ve},et=C.exports.createContext(_e),N=()=>C.exports.useContext(et),tt=S.div`
    height: 100vh;
    max-width: 68vh;
    margin: 0 auto;
    position: relative;
`,rt=new URLSearchParams(location.search);var le;const nt=(le=rt.get(pe.Room))!=null?le:"",be={roomId:nt},ie=S.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    overflow: hidden;
    background-color: ${e=>e.theme.bg};
    color: ${e=>e.theme.font};

    .button {
        margin: 30px 0;
        height: 60px;
        line-height: 60px;
        width: 260px;
        text-align: center;
        border: 4px solid;
        cursor: pointer;
        user-select: none;
        border-color: ${e=>e.theme.font};
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        user-select: none;
    }

    input {
        display: block;
        outline-style: none;
        border: 0px;
        width: 260px;
        font-size: 48px;
        background-color: #fff;
        font-weight: bold;
        color: #1371c3;
        text-align: center;
        caret-color: #1371c3;
        height: 68px;
        line-height: 68px;
        margin: 30px 0;
    }

    input::placeholder {
        color: #1371c3;
    }

    input:-ms-placeholder {
        color: #1371c3;
    }

    input::-moz-placeholder {
        color: #1371c3;
    }

    input::-webkit-input-placeholder {
        color: #1371c3;
    }
`,ot={font:"#1371c3",bg:"#fff"},st={font:"#fff",bg:"#1371c3"},T=de`
    box-shadow: 0px 1px 2.2px rgba(0, 0, 0, 0.028),
        0px 2.4px 5.3px rgba(0, 0, 0, 0.04), 0px 4.5px 10px rgba(0, 0, 0, 0.05),
        0px 8px 17.9px rgba(0, 0, 0, 0.06), 0px 15px 33.4px rgba(0, 0, 0, 0.072),
        0px 36px 80px rgba(0, 0, 0, 0.1);
`,at=S.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    text-align: center;

    div {
        width: 260px;
        padding: 10px;
        color: #1371c3;
        background-color: #fff;
        word-break: break-all;
        margin-top: 10px;
        ${T}
    }

    .error {
        color: coral;
    }

    .fade {
        opacity: 0;
        transition: all 0.5s;
    }
`;let it=0,Y,A=[];const X=1e3*3,ct=1e3*.5,lt=()=>{const[e,t]=C.exports.useState([]);Y=n=>{n.key=++it,A.push(n),r()};const r=()=>{A=A.sort((n,o)=>n.key-o.key).filter(n=>Date.now()-n.ts<X+ct).map(n=>(n.display=Date.now()-n.ts>X?"fade":"",n)),t(A),A.length&&setTimeout(()=>{r()},X)};return i(at,{children:e.reverse().map(n=>i("div",{className:[n.level,n.display].join(" "),children:n.content},n.level+n.ts))})};let G=document.getElementById("tips-container");G||(G=document.createElement("div"),G.id="tips-container",document.body.append(G));he.render(i(lt,{}),G);const ut=e=>{Y({level:K.Info,ts:Date.now(),content:e})},dt=e=>{Y({level:K.Warn,ts:Date.now(),content:e})},ht=e=>{Y({level:K.Error,ts:Date.now(),content:e})},b={info:ut,warn:dt,error:ht},pt=v(()=>{const{user:e}=N(),t=C.exports.useRef(null);return p(H,{children:[i("input",{type:"number",placeholder:"\u51E0\u4E2A\u4EBA",min:"2",max:"6",step:"1",onChange:()=>{var s,a;let o=+((a=(s=t.current)==null?void 0:s.value)!=null?a:0);o=Math.min(Oe,o),o=Math.max(0,o),t.current.value=o.toFixed(0)},ref:t}),i("div",{onClick:()=>{var s,a;const o=+((a=(s=t.current)==null?void 0:s.value)!=null?a:0);if(o<Ee){b.info("\u81F3\u5C11\u4E24\u4E2A\u4EBA, \u61C2?");return}R.createRoom(o,e.nickName).catch(m=>{console.warn("err",m),b.error("\u521B\u5EFA\u623F\u95F4\u5931\u8D25, \u5237\u65B0\u4E00\u6CE2?")})},className:"button",children:"\u5F00\u641E"})]})}),ft=v(()=>{const{user:e}=N(),t=C.exports.useRef(null);return C.exports.useEffect(()=>{t.current.value=be.roomId},[]),p(H,{children:[i("input",{type:"text",placeholder:"\u623F\u95F4\u53F7",ref:t}),i("div",{onClick:()=>{var o;const n=(o=t.current)==null?void 0:o.value;if(!n){b.info("\u8981\u586B\u623F\u95F4\u53F7, OK?");return}R.joinRoom(n,e.nickName).catch(()=>{b.error("\u52A0\u5165\u623F\u95F4\u5931\u8D25, \u623F\u4E3B\u6E9C\u4E86?")})},className:"button",children:"\u5BF9\u5934"})]})}),mt=v(()=>{const[e,t]=C.exports.useState(0);return C.exports.useEffect(()=>{be.roomId&&t(2)},[]),i(H,{children:e===0?p(ie,{theme:ot,children:[i("div",{className:"button",onClick:()=>t(1),children:"\u5F00\u623F"}),i("div",{className:"button",onClick:()=>t(2),children:"\u52A0\u5165"})]}):p(ie,{theme:st,children:[e===1&&i(pt,{}),e===2&&i(ft,{}),i("div",{className:"close",onClick:()=>t(0),children:"X"})]})})}),gt=S.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #1371c3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    z-index: 99;

    input {
        display: block;
        outline-style: none;
        border: 0px;
        width: 260px;
        font-size: 48px;
        background-color: #fff;
        font-weight: bold;
        color: #1371c3;
        text-align: center;
        caret-color: #1371c3;
        height: 68px;
        line-height: 68px;
    }

    input::placeholder {
        color: #1371c3;
    }

    input:-ms-placeholder {
        color: #1371c3;
    }

    input::-moz-placeholder {
        color: #1371c3;
    }

    input::-webkit-input-placeholder {
        color: #1371c3;
    }

    div {
        margin-top: 60px;
        cursor: pointer;
        user-select: none;
        text-align: center;
        height: 60px;
        line-height: 60px;
        width: 260px;
        border: 4px solid #fff;
    }
`,xt=v(()=>{const{user:e}=N(),t=C.exports.useRef(null);return C.exports.useEffect(()=>{var n;t.current.value=(n=e.nickName)!=null?n:""},[]),p(gt,{children:[i("input",{type:"text",placeholder:"\u6635\u79F0",ref:t}),i("div",{onClick:()=>{var o,s;const n=(s=(o=t.current)==null?void 0:o.value)!=null?s:"";if(!n){b.info("\u53D6\u4E2A\u540D\u5B57\u5148!");return}if(n.length>ae){b.info(`${ae}\u4E2A\u5B57\u5C31\u591F\u4E86\u561B`);return}e.editNickName(n)},children:"\u662F\u6211"})]})}),_t=S.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    overflow: hidden;
    background-color: #fff;
    color: #1371c3;

    .roomid {
        text-align: center;
        color: #fff;
        background-color: #1371c3;
        margin-bottom: 30px;
        width: 248px;
        padding: 10px;
    }

    .title {
        font-size: 48px;
        margin-bottom: 20px;
        letter-spacing: 4px;
    }

    .id {
        font-size: 12px;
        font-weight: normal;
        user-select: text;
    }

    .button {
        margin: 30px 0;
        height: 60px;
        line-height: 60px;
        width: 260px;
        text-align: center;
        border: 4px solid #1371c3;
        cursor: pointer;
        user-select: none;
        font-size: 38px;
    }
`,bt=v(()=>{const{room:e}=N(),t=()=>{se(location.origin+location.pathname+"?room="+e.roomId,{format:"text/plain",onCopy:()=>{b.info("\u7F51\u5740\u62F7\u8D77\u4E86")}})},r=()=>{se(e.roomId,{format:"text/plain",onCopy:()=>{b.info("\u623F\u95F4\u53F7\u62F7\u8D77\u4E86")}})};return p(_t,{children:[p("div",{className:"roomid",children:[i("div",{className:"title",children:"\u623F\u95F4\u53F7"}),i("div",{className:"id",children:e.roomId})]}),i("div",{className:"button",onClick:t,children:"\u590D\u5236\u7F51\u5740"}),i("div",{className:"button",onClick:r,children:"\u590D\u5236\u623F\u53F7"})]})}),yt=S.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    background-color: #fff;

    .bottom {
        ${T}
    }

    .list-container {
        padding: 0 20px;
        height: 100%;
        overflow-y: scroll;
    }

    .list {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .tips {
            width: 100%;
            text-align: center;
            color: ${e=>e.isSelf?"#1371c3":"#aaa"};
            font-size: 16px;
            padding: 24px 0;
            font-weight: ${e=>e.isSelf?"bold":"normal"};
        }
    }

    .win {
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-size: 32px;
        color: #1371c3;
        font-weight: bold;
    }

    .gameover {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        text-align: center;
        ${T}
    }
`,Ct=S.div`
    max-height: 180px;
    overflow-y: scroll;
    padding: 10px 20px 0;
    margin: 20px 0 10px;

    .hand {
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fill, 60px);
        grid-template-rows: repeat(auto-fill, 78px);
        row-gap: 8px;
    }
`,kt=de`
    animation-name: shake-little;
    animation-duration: 100ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    @keyframes shake-little {
        2% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        4% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        6% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        8% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        10% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        12% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        14% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        16% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        18% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        20% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        22% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        24% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        26% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        28% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        30% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        32% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        34% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        36% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        38% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        40% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        42% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        44% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        46% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        48% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        50% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        52% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        54% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        56% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        58% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        60% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        62% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        64% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        66% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        68% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        70% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        72% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        74% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        76% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        78% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        80% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        82% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        84% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        86% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        88% {
            transform: translate(0px, 0px) rotate(0.5deg);
        }

        90% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        92% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        94% {
            transform: translate(1px, 1px) rotate(0.5deg);
        }

        96% {
            transform: translate(0px, 1px) rotate(0.5deg);
        }

        98% {
            transform: translate(1px, 0px) rotate(0.5deg);
        }

        0%,
        100% {
            transform: translate(0, 0) rotate(0);
        }
    }
`,vt=S.div`
    ${e=>e.selected?kt:""}

    width: 48px;
    height: 64px;
    font-size: 16px;
    line-height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    padding: 4px;
    background-color: #fff;
    border: 1px solid black;
    position: relative;
    font-weight: bold;

    top: ${e=>e.selected?"-3px":"0"};

    .info {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .cardid {
        font-size: 12px;
        color: gray;
    }

    .suit0 .point {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }

    .suit {
        font-size: 24px;
        text-align: center;
    }

    .suit1,
    .suit3,
    .point14 {
        color: coral;
    }

    .suit2,
    .suit4,
    .point13 {
        color: black;
    }

    @keyframes shakeTopx {
        0%,
        100% {
            transform: rotate(0deg);
            transform-origin: 50% 0;
        }

        5% {
            transform: rotate(2deg);
        }

        10%,
        20%,
        30% {
            transform: rotate(-4deg);
        }

        15%,
        25%,
        35% {
            transform: rotate(4deg);
        }

        40% {
            transform: rotate(-2deg);
        }

        45% {
            transform: rotate(2deg);
        }

        50% {
            transform: rotate(0deg);
        }
    }
`,ye=v(e=>{const{game:t}=N(),{cardId:r}=e,n=w.GetCardSuitById(r),o=w.GetCardPointById(r),s=["3","4","5","6","7","8","9","10","J","Q","K","A","2","JOKER","JOKER"][o],a=["\u{1F47B}","\u2665\uFE0F","\u2660\uFE0F","\u2666\uFE0F","\u2663\uFE0F"][n];return i(vt,{selected:t.selected.indexOf(r)>-1,onClick:()=>t.selectCard(r),children:p("div",{className:`suit${n}`,children:[i("div",{className:`point point${o}`,children:s}),i("div",{className:"suit",children:a})]})})}),wt=v(()=>{const{game:e}=N();return i(Ct,{children:i("div",{className:"hand",children:e.handcards.map((t,r)=>i(ye,{cardId:t},t.toFixed(0)+r))})})}),St=S.div`
    width: 100%;
    overflow: hidden;
    padding: 12px 0;
    border-bottom: 1px solid #efefef;

    .player {
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;

        span {
            color: #aaa;
            font-size: 14px;
            padding-left: 10px;
        }

        .few {
            color: coral;
        }
    }

    .cards {
        padding-top: 10px;
        height: ${64+10}px;
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        overflow-x: scroll;
    }

    .card-wrapper {
        width: 28px;
    }
`,Nt=v(e=>{var a,m;const{history:t}=e,{game:r}=N(),n=(m=(a=r.players[t.seat])==null?void 0:a.name)!=null?m:"",o=t.discard.type===d.Invalid,s=t.count===0;return p(St,{children:[p("div",{className:"player",children:[p("div",{children:[n,":",o&&" \u4E0D\u8981",s&&" \u6E9C\u4E86!"]}),!s&&p("span",{className:t.count<=2?"few":"",children:["(\u8FD8\u5269",t.count,"\u5F20\u724C)"]})]}),!o&&i("div",{className:"cards",children:t.discard.cards.map(x=>i("div",{className:"card-wrapper",children:i(ye,{cardId:x})},x))})]})}),It=S.div`
    display: flex;
    justify-content: center;
    gap: 40px;

    .button {
        width: 120px;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 600;
        height: 38px;
        line-height: 38px;
        margin: 2vh 0 5vh;
        color: #fff;
        background-color: #1371c3;
        user-select: none;
        cursor: pointer;
    }
`,Ft=v(()=>{const{game:e}=N();return p(It,{children:[i("div",{className:"button",onClick:()=>{if(e.seat!==e.banker){b.info("\u4E0D\u8BE5\u4F60\u51FA\u724C, \u83AB\u614C\u561B");return}if(e.seat===e.banker&&e.recent===y){b.info("\u81F3\u5C11\u8981\u51FA\u4E00\u5F20, \u61C2?");return}R.discardCard(y),e.clearSelected()},children:"\u4E0D\u8981"}),i("div",{className:"button",onClick:()=>{if(e.seat!==e.banker){b.info("\u4E0D\u8BE5\u4F60\u51FA\u724C, \u83AB\u614C\u561B");return}if(!e.selected.length){b.info("\u4E00\u5F20\u724C\u90FD\u6CA1\u9009, \u60F3\u51FA?");return}R.discardCard(e.selected.concat()).then(n=>{n||b.info("\u6CA1\u6574\u5BF9\uFF0C\u91CD\u65B0\u51FA")}),e.clearSelected()},children:"\u51FA\u724C"})]})}),Et=S.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0;
    animation: show 0.5s ease 3.5s 1 normal forwards;

    @keyframes show {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .title {
        text-align: center;
        font-size: 32px;
        color: #1371c3;
        font-weight: bold;
    }

    .button {
        width: 120px;
        text-align: center;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 600;
        height: 38px;
        line-height: 38px;
        color: #fff;
        background-color: #1371c3;
        user-select: none;
        cursor: pointer;
    }

    .rank {
        margin: 60px 0 100px;
        font-size: 18px;

        span {
            color: #1371c3;
            font-weight: 900;
            font-size: 28px;
            display: inline-block;
            width: 120px;
        }

        .comment {
            font-size: 12px;
            color: #aaa;
            padding-left: 2px;
            margin-bottom: 10px;
        }
    }
`,Ot=v(()=>{var m,x;const{room:e,game:t}=N(),r=t.winner.map(_=>t.players[_]),n=(m=t.players)==null?void 0:m.find((_,F)=>t.winner.indexOf(F)===-1);r.push(n);const o=["st","nd","rd","th","th","th"],s=["\u5E72\u5565\u5565\u4E0D\u884C\uFF0C\u6253\u724C\u7B2C\u4E00\u540D",`\u53CB\u8C0A\u7B2C\u4E00\uFF0C${r[1].name}\u7B2C\u4E8C`,"\u4E09\u4EBA\u884C\uFF0C\u5FC5\u6709\u7B2C\u4E09",`\u53E4\u4EBA\u4E91\uFF0C\u4E09\u5341\u800C\u7ACB\uFF0C\u56DB\u662F${(x=r[3])==null?void 0:x.name}`,"55555555555555555","\u5931\u8D25\u662F\u6210\u529Ftm"],a=()=>{const _=t.winner[0],F=t.players[_].id;R.restart(F)};return p(Et,{children:[i("div",{className:"title",children:"\u6E38\u620F\u7ED3\u675F"}),i("div",{className:"rank",children:r.map((_,F)=>p("div",{children:[p("span",{children:[F+1,o[F]]}),_.name,i("div",{className:"comment",children:s[F]})]},_.id))}),e.isHost&&i("div",{className:"button",onClick:a,children:"\u518D\u6765\u4EBF\u628A"})]})}),Rt=v(()=>{var o;const{game:e}=N(),t=C.exports.useRef(null);C.exports.useEffect(()=>{var s;(s=t.current)==null||s.scrollIntoView()});const r=e.banker===e.seat,n=(o=e.players[e.banker])==null?void 0:o.name;return p(yt,{isSelf:r,children:[i("div",{className:"list-container",children:p("div",{className:"list",children:[e.history.map((s,a)=>i(Nt,{history:s},a)),i("div",{className:"tips",ref:t,children:r?"\u8BE5\u51FA\u724C\u4E86":`\u7B49\u5F85${n}\u51FA\u724C`})]})}),i("div",{className:"bottom",children:e.isWin?i("div",{className:"win",children:"\u8D62\u4E86\u6492\u270C\uFE0F"}):p(H,{children:[i(wt,{}),i(Ft,{})]})}),e.gameOver&&i(Ot,{})]})}),Dt=v(()=>{const{user:e,room:t,game:r}=N(),n=r.gameStarted?i(Rt,{}):i(bt,{}),o=t.inRoom?n:i(mt,{});return i(tt,{children:e.editing?i(xt,{}):o})}),Bt=()=>i(Ie,oe(ne({},_e),{children:i(Dt,{})}));he.render(i(Bt,{}),document.getElementById("root"));
