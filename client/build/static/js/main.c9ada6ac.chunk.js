(this.webpackJsonpholdemapp=this.webpackJsonpholdemapp||[]).push([[0],{17:function(e,t,a){e.exports=a(34)},28:function(e,t,a){},29:function(e,t,a){},30:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),u=a(8),s=a(5),r=a(16),l=a(1),d=a(9),c="GENERATE_DECK",o="DEAL_CARDS",v="DEAL_HANDS",p="ADD_PLAYER",m="Clubs",f="Diamonds",h="Hearts",b="Spades",C=2,g=3,D=4,k=5,y=6,S=7,E=8,H=9,j=10,O=11,w=12,A=13,N=14,x={twoSpades:{value:C,suit:b,id:"2S"},twoClubs:{value:C,suit:m,id:"2C"},twoHearts:{value:C,suit:h,id:"2H"},twoDiamonds:{value:C,suit:f,id:"2D"},threeSpades:{value:g,suit:b,id:"3S"},threeClubs:{value:g,suit:m,id:"3C"},threeHearts:{value:g,suit:h,id:"3H"},threeDiamonds:{value:g,suit:f,id:"3D"},fourSpades:{value:D,suit:b,id:"4S"},fourClubs:{value:D,suit:m,id:"4C"},fourHearts:{value:D,suit:h,id:"4H"},fourDiamonds:{value:D,suit:f,id:"4D"},fiveSpades:{value:k,suit:b,id:"5S"},fiveClubs:{value:k,suit:m,id:"5C"},fiveHearts:{value:k,suit:h,id:"5H"},fiveDiamonds:{value:k,suit:f,id:"5D"},sixSpades:{value:y,suit:b,id:"6S"},sixClubs:{value:y,suit:m,id:"6C"},sixHearts:{value:y,suit:h,id:"6H"},sixDiamonds:{value:y,suit:f,id:"6D"},sevenSpades:{value:S,suit:b,id:"7S"},sevenClubs:{value:S,suit:m,id:"7C"},sevenHearts:{value:S,suit:h,id:"7H"},sevenDiamonds:{value:S,suit:f,id:"7D"},eightSpades:{value:E,suit:b,id:"8S"},eightClubs:{value:E,suit:m,id:"8C"},eightHearts:{value:E,suit:h,id:"8H"},eightDiamonds:{value:E,suit:f,id:"8D"},nineSpades:{value:H,suit:b,id:"9S"},nineClubs:{value:H,suit:m,id:"9C"},nineHearts:{value:H,suit:h,id:"9H"},nineDiamonds:{value:H,suit:f,id:"9D"},tenSpades:{value:j,suit:b,id:"10S"},tenClubs:{value:j,suit:m,id:"10C"},tenHearts:{value:j,suit:h,id:"10H"},tenDiamonds:{value:j,suit:f,id:"10D"},jackSpades:{value:O,suit:b,id:"JS"},jackClubs:{value:O,suit:m,id:"JC"},jackHearts:{value:O,suit:h,id:"JH"},jackDiamonds:{value:O,suit:f,id:"JD"},queenSpades:{value:w,suit:b,id:"QS"},queenClubs:{value:w,suit:m,id:"QC"},queenHearts:{value:w,suit:h,id:"QH"},queenDiamonds:{value:w,suit:f,id:"QD"},kingSpades:{value:A,suit:b,id:"KS"},kingClubs:{value:A,suit:m,id:"KC"},kingHearts:{value:A,suit:h,id:"KH"},kingDiamonds:{value:A,suit:f,id:"KD"},aceSpades:{value:N,suit:b,id:"AS"},aceClubs:{value:N,suit:m,id:"AC"},aceHearts:{value:N,suit:h,id:"AH"},aceDiamonds:{value:N,suit:f,id:"AD"}},J=function(){return T(Object.values(x))},T=function(e){for(var t=e.slice(),a=t.length-1;a>=0;a--){var n=q(a),i=t[n];t[n]=t[a],t[a]=i}return t},K=function(e,t,a){for(var n=e.slice(),i=t.slice(),u=a;u>0;){var s=n.pop();i.push(s),u--}return{deck:n,target:i}},q=function(e){return Math.floor(Math.random()*e)},B=a(2),L=a.n(B),M={deck:[],tableCards:[],players:[]},P=Object(l.c)({deck:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];arguments.length>1&&arguments[1];return e},player:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d.a.Map();arguments.length>1&&arguments[1];return e},game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d.a.Map(M),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c:return e.set("deck",J());case v:var a=e.get("deck").slice(),n=e.get("players").slice();L.a.forEach(n,(function(e){var t=void 0===e.hand?[]:e.hand,n=K(a,t,2);e.hand=n.target,a=n.deck}));var i=e;return(i=i.set("players",n)).set("deck",a);case o:var u=e.get("deck"),s=e.get("tableCards");if(0===u.length)return e;var r=K(u,s,t.payload),l=e.set("deck",r.deck);return l=l.set("tableCards",r.target);case p:var m={playerName:t.payload},f=e.get("players").slice();return f.push(m),e.set("players",f);default:return e}}}),Q=(a(28),a(3)),_=a(4),z=a(6),G=a(7),R=function(){return{type:c}},W=function(){return{type:v}},I=function(e){return{type:p,payload:e}},V=(a(29),a(30),a(31),function(e){var t="/pokercards/"+e.id+".png";return i.a.createElement("img",{key:e.id,className:"Card",src:t,alt:e.Value+"of"+e.Suit})}),Y=function(e){Object(G.a)(a,e);var t=Object(z.a)(a);function a(){return Object(Q.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"Table"},i.a.createElement("div",null,L.a.map(this.props.cards,V)))}}]),a}(i.a.Component),$=(a(32),function(e){Object(G.a)(a,e);var t=Object(z.a)(a);function a(){return Object(Q.a)(this,a),t.apply(this,arguments)}return Object(_.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"Player-Section"},i.a.createElement("header",null,"'Hello'"),L.a.map(this.props.players,(function(e){return i.a.createElement("div",{className:"One-Player"},e.playerName,i.a.createElement("div",null,L.a.map(e.hand,V)))})))}}]),a}(i.a.Component)),F=Object(s.b)((function(e){return{minBet:null,curBet:null}}),(function(e){return{bet:null,check:null,fold:null}}))($),U=function(e){Object(G.a)(a,e);var t=Object(z.a)(a);function a(e){var n;return Object(Q.a)(this,a),(n=t.call(this,e)).serverTest=function(){fetch("/flower").then((function(e){return e.json()})).then((function(e){n.setState({serverData:e})}))},n.props.startGame(),n.state={serverData:{}},n.serverTest(),n}return Object(_.a)(a,[{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement("button",{onClick:this.props.dealCard},"DEAL"),i.a.createElement("div",null,this.state.serverData.name),i.a.createElement(Y,{cards:this.props.tableCards}),i.a.createElement("hr",{className:"divider"}),i.a.createElement(F,{players:this.props.players}))}}]),a}(i.a.Component),X=Object(s.b)((function(e){return{deck:e.game.get("deck"),tableCards:e.game.get("tableCards"),players:e.game.get("players")}}),(function(e){return{startGame:function(){e((function(e){e(I("zac")),e(I("zacc")),e(I("zuck")),e(I("bill")),e(R()),e(W())}))},dealCard:function(){e({type:o,payload:1})}}}))(U);a(33);var Z=function(){return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},"Poker App"),i.a.createElement(X,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var ee=Object(l.e)(P,Object(l.d)(Object(l.a)(r.a),window.devToolsExtension?window.devToolsExtension():function(e){return e}));Object(u.render)(i.a.createElement(s.a,{store:ee},i.a.createElement(Z,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.c9ada6ac.chunk.js.map