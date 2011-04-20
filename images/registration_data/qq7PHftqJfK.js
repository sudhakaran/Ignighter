/*1303151273,169776318*/

if (window.CavalryLogger) { CavalryLogger.start_js(["\/QDrR"]); }

function Token(a,b){this.info=a;this.paramName=b;}Token.prototype={getInfo:function(){return this.info;},getText:function(){return this.info.text;},getValue:function(){return this.info.uid;},isFreeform:function(){return !!this.info.freeform;},getElement:function(){if(!this.element)this.setElement(this.createElement());return this.element;},setElement:function(a){DataStore.set(a,'Token',this);this.element=a;return this;},isRemovable:function(){return CSS.hasClass(this.element,'removable');},createElement:function(){var b=this.paramName;var d=this.getText();var f=this.getValue();var c=$N('a',{href:'#',title:_tx("Remove {item}",{item:d}),className:'remove uiCloseButton uiCloseButtonSmall'});var g=$N('input',{type:'hidden',value:f,name:b+'[]',autocomplete:'off'});var e=$N('input',{type:'hidden',value:d,name:'text_'+b+'[]',autocomplete:'off'});var a=$N('span',{title:d,className:'removable uiToken'},[d,g,e,c]);return a;}};
function Tokenizer(){}Tokenizer.getInstance=function(a){var b=Parent.byClass(a,'uiTokenizer');return b?DataStore.get(b,'Tokenizer'):null;};Tokenizer.mixin('Arbiter',{inline:false,freeform:false,maxTokens:null,excludeDuplicates:true,placeholder:'',init:function(d,f,e,c,a,b){this.init=bagofholding;this.element=d;this.typeahead=f;this.input=f.getCore().getElement();this.tokenarea=e;this.paramName=c;this.placeholder=this.input.getAttribute('data-placeholder')||'';DataStore.set(d,'Tokenizer',this);copy_properties(this,b||{});if(typeof this.freeform=='string')this.freeformMatcher=new RegExp(this.freeform,'i');this.initEvents();this.initTypeahead();this.reset(a);Arbiter.inform('Tokenizer/init',this,Arbiter.BEHAVIOR_PERSISTENT);},reset:function(a){this.tokens=[];this.unique={};if(a){this.populate(a);}else DOM.empty(this.tokenarea);this.updateTokenarea();},populate:function(a){var b=[];this.tokens=this.getTokenElements().map(function(c,d){var e=a[d];b.push(this._tokenKey(e));return this.createToken(e,c);},this);this.unique=Object.from(b,this.tokens);},getElement:function(){return this.element;},getTypeahead:function(){return this.typeahead;},initTypeahead:function(){var a=this.typeahead.getCore();a.resetOnSelect=true;a.setValueOnSelect=false;a.preventFocusChangeOnTab=true;this.typeahead.subscribe('select',function(b,c){var d=c.selected;if('uid' in d){this.updateInput();this.addToken(this.createToken(d));}}.bind(this));this.typeahead.subscribe('blur',this.handleBlur.bind(this));},handleBlur:function(){this.freeform&&this.handleFreeformBlur();this.updatePlaceholder();},handleFreeformBlur:function(){this.checkFreeform();this.typeahead.getCore().reset();},initEvents:function(){var a=this.handleEvents.bind(this);var b=ua.firefox()<4?'keypress':'keydown';Event.listen(this.tokenarea,{click:a,keydown:a});Event.listen(this.input,'paste',this.paste.bind(this));Event.listen(this.input,b,this.keydown.bind(this));},handleEvents:function(event){var b=event.getTarget();var a=b&&this.getTokenElementFromTarget(b);if(!a)return;if(event.type!='keydown'||Event.getKeyCode(event)==KEYS.RETURN)this.processEvents(event,b,a);},processEvents:function(event,c,a){if(Parent.byClass(c,'remove')){var b=a.nextSibling;b=b&&DOM.scry(a.nextSibling,'.remove')[0];this.removeToken(this.getTokenFromElement(a));Input.focus(event.type=='keydown'&&b||this.input);event.kill();}},keydown:function(event){var a=Event.getKeyCode(event);var b=this.input;if(this.freeform)if(a==KEYS.COMMA||a==KEYS.RETURN){var d=this.typeahead.getView();if(d.getSelection()){d.select();event.kill();}else this.checkFreeform(event);}if(this.inline&&a==KEYS.BACKSPACE&&Input.isEmpty(b)){var c=this.getLastToken();if(c&&c.isRemovable())this.removeToken(c);}this.updateInput();},paste:function(event){this.freeform&&this.checkFreeform.bind(this,event).defer(20);this.updateInput(true);},focusInput:function(){Input.focus(this.input);},updateInput:function(b){if(!this.inline)return;var a=this.input;setTimeout(function(){a.size=a.value.length||1;if(b)a.value=a.value;},20);},updatePlaceholder:function(){if(!this.inline)return;var a=!this.tokens.length;this.input.size=a?this.placeholder.length||1:1;Input.setPlaceholder(this.input,a?this.placeholder:'');},checkFreeform:function(event){var b=Input.getValue(this.input).trim();if(b&&(!this.freeformMatcher||this.freeformMatcher.test(b))){var a={uid:b,text:b,freeform:true};this.addToken(this.createToken(a));if(event){this.typeahead.getCore().afterSelect();event.kill();}}},getToken:function(b,a){if(a)b+=':';return this.unique[b]||null;},getTokens:function(){return this.tokens;},getTokenElements:function(){return DOM.scry(this.tokenarea,'span.uiToken');},getTokenElementFromTarget:function(a){return Parent.byClass(a,'uiToken');},getTokenFromElement:function(a){return DataStore.get(a,'Token');},getTokenValues:function(){return this.tokens.map(function(a){return a.getValue();});},getFirstToken:function(){return this.tokens[0]||null;},getLastToken:function(){return this.tokens[this.tokens.length-1]||null;},hasMaxTokens:function(){return this.maxTokens&&this.maxTokens<=this.tokens.length;},createToken:function(b,a){var c=this.getToken(this._tokenKey(b));c=c||new Token(b,this.paramName);a&&c.setElement(a);return c;},addToken:function(b){if(this.hasMaxTokens())return;var a=this._tokenKey(b.getInfo());if(a in this.unique)return;this.unique[a]=b;this.tokens.push(b);this.tokenarea.appendChild(b.getElement());this.updateTokenarea();this.inform('addToken',b);Arbiter.inform('Form/change',{node:this.element});},removeToken:function(b){if(!b)return;var a=this.tokens.indexOf(b);if(a<0)return;this.tokens.splice(this.tokens.indexOf(b),1);delete this.unique[this._tokenKey(b.getInfo())];DOM.remove(b.getElement());this.updateTokenarea();this.inform('removeToken',b);Arbiter.inform('Form/change',{node:this.element});},updateTokenarea:function(){var a=this.getTokenValues();CSS.conditionShow(this.tokenarea,a.length!==0);this.excludeDuplicates&&this.typeahead.getCore().setExclusions(a);this.typeahead.getCore().setEnabled(!this.hasMaxTokens());this.updatePlaceholder();},_tokenKey:function(a){return a.uid+(a.freeform?':':'');}});
function HubsListTokenizer(){this.parent.construct(this);}HubsListTokenizer.extend('Tokenizer');HubsListTokenizer.prototype={description:false,getTokenElements:function(){return DOM.scry(this.tokenarea,'div.fbHubsListToken');},getTokenElementFromTarget:function(a){return Parent.byClass(a,'fbHubsListToken');},createToken:function(b,a){var c=this.parent.createToken(b,a);return c.setElement(a||this.createTokenElement(b));},createTokenElement:function(i){var j=$N('input',{type:'hidden',value:i.uid,name:this.paramName+'[id][]',autocomplete:'off'});var h=$N('img',{src:i.photo,className:'photo img'});var l=$N('label',{className:'remove uiCloseButton'},[$N('input',{title:_tx("Remove {item}",{item:i.text}),type:'button'})]);var g=$N('div',{className:'name'},[h,i.text,l]);var n=[j,g];if(this.description){var f='Description:';var k=$N('th',{className:'label'},[f]);var e=$N('textarea',{name:this.paramName+'[description][]'});var d=$N('div',{className:'description'},[e]);var a=$N('td',{className:'data'},[d]);var b=$N('tr',{className:'dataRow'},[k,a]);var c=$N('table',{className:'uiInfoTable noBorder'},[b]);n.push(c);}var m=$N('div',{className:'fbHubsListToken'},n);return m;}};
var HubsTypeaheadView=function(a,b){this.parent.construct(this,a,b);};HubsTypeaheadView.extend('TypeaheadView');HubsTypeaheadView.prototype={render:function(g,e,f){if(this.alwaysRender&&g!==''){var c=g.toLowerCase().trim(),a=false;for(var b=0;b<e.length;b++)if(c==e[b].text.toLowerCase()){a=true;break;}var d=_tx("Add \"{hub-text}\"",{'hub-text':htmlize(g)})+'<span class="arrow"></span>';if(!a)e.push({text:g,type:'calltoaction',markup:d});}return this.parent.render(g,e,f);}};
function UIForm(a,d,b){UIForm.instances[a.id]=this;this.controller=a;this.message=d;onafterloadRegister(function(){this.originalState=Form.serialize(this.controller);}.bind(this));this.forceDirty=b;this.submitClicked=false;Event.listen(this.controller,'submit',this.prepareSubmit.bind(this));var c=true;onbeforeunloadRegister(this.checkUnsaved.bind(this),c);}UIForm.instances={};UIForm.prototype.prepareSubmit=function(){this.submitClicked=true;};UIForm.prototype.checkUnsaved=function(){if(!this.submitClicked&&DOM.contains(document.body,this.controller)){var b=this.forceDirty;if(!b){var a=Form.serialize(this.controller);b=!are_equal(a,this.originalState);}if(b)return this.message;}return null;};copy_properties(UIForm,{prepare:function(a){UIForm.instances[a.id].prepareSubmit();}});
function TypeaheadMetrics(a){this.extraData={};copy_properties(this,a);}TypeaheadMetrics.prototype={endPoint:'/ajax/typeahead/record_basic_metrics.php',init:function(a){this.init=bagofholding;this.core=a.getCore();this.view=a.getView();this.data=a.getData();this.stats={};this._reset();this.initEvents();},_reset:function(){this.stats={};this.sid=Math.random();this.data.setQueryData({sid:this.sid});},recordSelect:function(a){var b=a.selected;if(b.uid==null){this.recordStat('selected_id','SELECT_NULL');}else this.recordStat('selected_id',b.uid);this.recordStat('selected_position',a.index);this.recordStat('selected_with_mouse',a.clicked?1:0);this.submit();},initEvents:function(){this.core.subscribe('blur',function(event){this.submit();}.bind(this));this.view.subscribe('select',function(a,b){this.recordSelect(b);}.bind(this));this.view.subscribe('render',function(a,b){this.results=b;}.bind(this));this.data.subscribe('beforeQuery',function(a,b){if(!b.value)return;this.query=b.value;this.recordCountStat('num_queries');}.bind(this));},recordStat:function(a,b){this.stats[a]=b;},recordCountStat:function(a){var b=this.stats[a];this.stats[a]=b?b+1:1;},submit:function(){if(count(this.stats)>0){copy_properties(this.stats,this.extraData);if(this.results){var a=(this.results).map(function(c,b){return c.uid;});this.recordStat('candidate_results',JSON.stringify(a));}if(this.query)this.recordStat('query',this.query);if(this.sid)this.recordStat('sid',this.sid);new AsyncRequest().setURI(this.endPoint).setMethod('POST').setData({stats:this.stats}).send();this._reset();}}};
add_properties('TypeaheadBehaviors',{setPhotoOnSelect:function(e){var c=DOM.scry(e.getElement(),'.photo')[0];if(c){if(!DOM.isNode(c,'img')){var b=DOM.create('img',{className:c.className});DOM.replace(c,b);c=b;}var a=CSS.hide.curry(c);var d=CSS.show.curry(c);Event.listen(c,{load:d,error:a,abort:a});e.subscribe('select',function(f,g){var h=g.selected.photo||e.view.fallbackPhoto;h?c.setAttribute('src',h):a();});}}});