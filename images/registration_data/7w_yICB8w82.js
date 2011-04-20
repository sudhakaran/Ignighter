/*1303151240,176820665*/

if (window.CavalryLogger) { CavalryLogger.start_js(["a3+jt"]); }

function BuddyListDataSource(a){this.parent.construct(this,copy_properties(a,{maxResults:a.maxResults||Infinity,persistOnRefresh:a.persistOnRefresh||true}));}BuddyListDataSource.extend('DataSource');BuddyListDataSource.prototype={init:function(){this.parent.init();var a=Arbiter.subscribe(['buddylist/initialized','buddylist/availability-changed'],this._availableListChanged.shield(this));if(!this.persistOnRefresh)onleaveRegister(function(){Arbiter.unsubscribe(a);});},_availableListChanged:function(){var b=this.value,a=this.flatValue;this.dirty();this.addEntries(AvailableList.getAvailableIDs().map(function(c){return {uid:c,text:ChatUserInfos[c].name,photo:ChatUserInfos[c].thumbSrc,type:AvailableList.isIdle(c)?'idle':'active'};}));if(b)this.respond(b,this.buildUids(a),true);},refreshData:function(){AvailableList.update();}};
add_properties('TypeaheadRenderers',{buddylist:function(b,d){var f=htmlize(b.text),e=b.photo,a='',c=[];if(e)c=['<img src="',e,'" alt="" />'];return ['<li class="clearfix ',b.type,'">',c.join(''),'<span class="text">'+f+'</span>','<i class="'+b.type+'">','</i>','</li>'];}});
function Rect(e,d,a,c,b){if(this===window){if(e instanceof Rect)return e;if(e instanceof Vector2)return new Rect(e.y,e.x,e.y,e.x,e.domain);return Rect.getElementBounds($(e));}copy_properties(this,{t:e,r:d,b:a,l:c,domain:b||'pure'});}copy_properties(Rect.prototype,{w:function(){return this.r-this.l;},h:function(){return this.b-this.t;},toString:function(){return '(('+this.l+', '+this.t+'), ('+this.r+', '+this.b+'))';},contains:function(b){b=Rect(b).convertTo(this.domain);var a=this;return (a.l<=b.l&&a.r>=b.r&&a.t<=b.t&&a.b>=b.b);},add:function(c,d){if(arguments.length==1){if(c.domain!='pure')c=c.convertTo(this.domain);return this.add(c.x,c.y);}var a=parseFloat(c);var b=parseFloat(d);return new Rect(this.t+b,this.r+a,this.b+b,this.l+a,this.domain);},sub:function(a,b){if(arguments.length==1){return this.add(a.mul(-1));}else return this.add(-a,-b);},boundWithin:function(a){var b=0,c=0;if(this.l<a.l){b=a.l-this.l;}else if(this.r>a.r)b=a.r-this.r;if(this.t<a.t){c=a.t-this.t;}else if(this.b>a.b)c=a.b-this.b;return this.add(b,c);},getPositionVector:function(){return new Vector2(this.l,this.t,this.domain);},getDimensionVector:function(){return new Vector2(this.w(),this.h(),'pure');},convertTo:function(a){if(this.domain==a)return this;if(a=='pure')return new Rect(this.t,this.r,this.b,this.l,'pure');if(this.domain=='pure')return new Rect(0,0,0,0);var b=new Vector2(this.l,this.t,this.domain).convertTo(a);return new Rect(b.y,b.x+this.w(),b.y+this.h(),b.x,a);}});copy_properties(Rect,{newFromVectors:function(b,a){return new Rect(b.y,b.x+a.x,b.y+a.y,b.x,b.domain);},getElementBounds:function(a){return Rect.newFromVectors(Vector2.getElementPosition(a),Vector2.getElementDimensions(a));},getViewportBounds:function(){return Rect.newFromVectors(Vector2.getScrollPosition(),Vector2.getViewportDimensions());}});
add_properties('TypeaheadBehaviors',{chatBuddyList:function(b){var a=b.getView().getElement();b.subscribe('focus',function(){b.getData().refreshData();});b.subscribe('respond',function(c,d){if(d.value&&!d.results.length){var e=$N('div',{className:'noResults'},_tx("Friend not found on chat."));DOM.setContent(a,e);}CSS.show(a);});b.subscribe('reset',function(){CSS.hide(a);});b.subscribe('select',function(c,d){Chat.openTab(d.selected.uid);});b.subscribe('highlight',function(c,e){if(e.index>=0){var h=b.getView().getItems()[e.index];if(h){var g=Rect(h);var d=h.offsetParent;var f=g.boundWithin(Rect(d)).getPositionVector();g.getPositionVector().sub(f).scrollElementBy(d);}}});}});
var ChatOnlineFriends=window.ChatOnlineFriends||{chatFriends:{},chatStatuses:['chatOnline','chatIdle','chatOffline'],_subscribe:function(event,a){this._tokens.push(Arbiter.subscribe(event,a));},clickHandler:function(event){var c=event.getTarget();var b=Parent.byClass(c,'uiListItem');if(b){var a=this.chatFriends[b.id];if(Chat.isOnline()){Chat.openTab(a.user_id,a.name,'friend');}else goURI(a.uri);return false;}},onunload:function(){this._tokens.forEach(function(a){Arbiter.unsubscribe(a);});},_setStatus:function(a,b){if(CSS.hasClass(a,b))return;this.chatStatuses.forEach(function(c){CSS.conditionClass(a,c,c==b);});},initTypeahead:function(b,a){b.subscribe('reset',function(){CSS.show(a);});b.subscribe('query',function(c,d){if(d.value){CSS.hide(a);}else CSS.show(a);});},init:function(d,e,f,a,c,b){this._initShared(d,f,a,b);this._orderedFriends=e;this._hashedFriends={};this._orderedFriends.forEach(function(g){this._hashedFriends[g]=true;}.bind(this));this._facepile=c.firstChild;this._faceFutures&&this._hideAllFaces();this._faceFutures=[];this._subscribe(['buddylist/initialized','buddylist/availability-changed'],this.update.shield(this));Event.listen(c,'click',this.clickHandlerClientRendering.bind(this));AvailableList.update();},_initShared:function(c,d,a,b){this.maxElements=c;this._faceTmpl=b;this._tokens=[];onleaveRegister(this.onunload.bind(this));this.initTypeahead(d,DOM.find(a,'div.fbFriendsOnlineFacepile'));},update:function(){var g=ge('chatFriendsOnline');if(g)CSS.conditionClass(g,'isOffline',!Chat.isOnline());if(!Chat.isOnline()||!AvailableList.isReady())return;AvailableList.getAvailableIDs().forEach(function(h){if(!this._hashedFriends[h]){this._orderedFriends.push(h);this._hashedFriends[h]=true;}}.bind(this));var b=0;for(var e=0;e<this._orderedFriends.length;e++){var d=this._orderedFriends[e];var a=AvailableList.get(d);var c=this._faceFutures[e];var f=b<this.maxElements;if(a&&f){if(!c){c=this._makeFace(e);this._faceFutures[e]=c;}b++;}this._updateFace(c,f,this._mapChatStatus(a));}},_mapChatStatus:function(a){switch(a){case AvailableList.OFFLINE:return 'chatOffline';case AvailableList.IDLE:return 'chatIdle';case AvailableList.ACTIVE:return 'chatOnline';}},_updateFace:function(b,c,a){b&&b(function(d){this._setStatus(d,a);CSS.conditionShow(d,c);}.bind(this));},_makeFace:function(c){var d=null;var a=null;var b=this._orderedFriends[c];ChatUserInfoManager.get(b,function(j){a=this._faceTmpl.render();DataStore.set(a,'friendID',b);var i=XHPTemplate.getNode(a,'img');var k=i.cloneNode(false);k.setAttribute('src',j.thumbSrc);DOM.replace(i,k);var e=XHPTemplate.getNode(a,'anchor');TooltipLink.setTooltipText(e,j.name);d&&d(a);var f=false;for(var h=c+1;h<this._orderedFriends.length&&!f;h++){var g=this._faceFutures[h];var l=g&&g();if(l){this._facepile.insertBefore(a,l);f=true;}}if(!f)this._facepile.appendChild(a);}.bind(this));return function faceFuture(e){if(e)if(a){e(a);}else d=e;return a;};},clickHandlerClientRendering:function(event){var c=event.getTarget();var a=Parent.byClass(c,'uiFacepileItem');if(a){var b=DataStore.get(a,'friendID');if(b&&Chat.isOnline()){ChatUserInfoManager.get(b,function(d){Chat.openTab(b,d.name,'friend');});return false;}}},_hideAllFaces:function(){this._faceFutures.forEach(function(a){a&&a(function(b){DOM.remove(b);});});}};
function Collection(e,d){if(!e.__collection__){var a=new Function();for(var c in e.prototype)a.prototype[c]=Collection._call.bind(null,c);e.__collection__=a;}var b=new e.__collection__();b._elements=d;return b;}Collection._call=function(b){var a=Array.prototype.slice.call(arguments,1);this._elements.each(function(c){c[b].apply(c,a);});return this;};
onloadRegister(function(){Event.listen(document.documentElement,'submit',function(b){var a=b.getTarget().getElementsByTagName('*');for(var c=0;c<a.length;c++)if(a[c].getAttribute('required')&&Input.isEmpty(a[c])){a[c].focus();return false;}},Event.Priority.URGENT);});
add_properties('TypeaheadBehaviors',{requireSelection:function(c){var a=c.getCore();var b=a.getElement().form;function d(){!a.getHiddenValue()&&a.reset();}a.subscribe('blur',d);b&&Event.listen(b,'submit',d);}});