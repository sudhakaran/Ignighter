;(function($){window.validDaterNum=0;var php={empty:function(mixed_var){var key;if(mixed_var===""||mixed_var===0||mixed_var==="0"||mixed_var===null||mixed_var===false||mixed_var===undefined||mixed_var==="undefined"){return true;}
if(typeof mixed_var=='object'){for(key in mixed_var){return false;}
return true;}
return false;},is_binary:function(vr){return typeof vr==='string';},is_bool:function(mixed_var)
{return(typeof mixed_var==='boolean');},is_double:function(mixed_var){return this.is_float(mixed_var);},is_float:function(mixed_var){return parseFloat(mixed_var*1)!=parseInt(mixed_var*1,10);},is_int:function(mixed_var){if(typeof mixed_var!=='number'){return false;}
if(parseFloat(mixed_var)!=parseInt(mixed_var,10)){return false;}
return true;},is_integer:function(mixed_var){return this.is_int(mixed_var);},is_long:function(mixed_var){return this.is_float(mixed_var);},is_null:function(mixed_var){return(mixed_var===null);},is_numeric:function(mixed_var){if(mixed_var===''){return false;}
return!isNaN(mixed_var*1);},is_object:function(mixed_var){if(mixed_var instanceof Array){return false;}else{return(mixed_var!==null)&&(typeof(mixed_var)=='object');}},is_real:function(mixed_var){return this.is_float(mixed_var);},is_string:function(mixed_var){return(typeof(mixed_var)=='string');},is_unicode:function(vr){if(typeof vr!=='string'){return false;}
var arr=[],any='([\s\S])',highSurrogate='[\uD800-\uDBFF]',lowSurrogate='[\uDC00-\uDFFF]',highSurrogateBeforeAny=new RegExp(highSurrogate+any,'g'),lowSurrogateAfterAny=new RegExp(any+lowSurrogate,'g'),singleLowSurrogate=new RegExp('^'+lowSurrogate+'$'),singleHighSurrogate=new RegExp('^'+highSurrogate+'$');while((arr=highSurrogateBeforeAny.exec(vr))!==null){if(!arr[1]||!arr[1].match(singleLowSurrogate)){return false;}}
while((arr=lowSurrogateAfterAny.exec(vr))!==null){if(!arr[1]||!arr[1].match(singleHighSurrogate)){return false;}}
return true;},isset:function(){var a=arguments,l=a.length,i=0;if(l===0){throw new Error('Empty isset');}
while(i!==l){if(typeof(a[i])=='undefined'||a[i]===null){return false;}else{i++;}}
return true;},in_array:function(needle,haystack,argStrict){var key='',strict=!!argStrict;if(strict){for(key in haystack){if(haystack[key]===needle){return true;}}}else{for(key in haystack){if(haystack[key]==needle){return true;}}}
return false;},strtotime:function(str,now){var i,match,s,strTmp='',parse='';strTmp=str;strTmp=strTmp.replace(/\s{2,}|^\s|\s$/g,' ');strTmp=strTmp.replace(/[\t\r\n]/g,'');if(strTmp=='now'){return(new Date()).getTime()/1000;}else if(!isNaN(parse=Date.parse(strTmp))){return(parse/1000);}else if(now){now=new Date(now*1000);}else{now=new Date();}
strTmp=strTmp.toLowerCase();var __is={day:{'sun':0,'mon':1,'tue':2,'wed':3,'thu':4,'fri':5,'sat':6},mon:{'jan':0,'feb':1,'mar':2,'apr':3,'may':4,'jun':5,'jul':6,'aug':7,'sep':8,'oct':9,'nov':10,'dec':11}};var process=function(m){var ago=(m[2]&&m[2]=='ago');var num=(m[0]=='last'?-1:1)*(ago?-1:1);switch(m[0]){case'last':case'next':switch(m[1].substring(0,3)){case'yea':now.setFullYear(now.getFullYear()+num);break;case'mon':now.setMonth(now.getMonth()+num);break;case'wee':now.setDate(now.getDate()+(num*7));break;case'day':now.setDate(now.getDate()+num);break;case'hou':now.setHours(now.getHours()+num);break;case'min':now.setMinutes(now.getMinutes()+num);break;case'sec':now.setSeconds(now.getSeconds()+num);break;default:var day;if(typeof(day=__is.day[m[1].substring(0,3)])!='undefined'){var diff=day-now.getDay();if(diff==0){diff=7*num;}else if(diff>0){if(m[0]=='last'){diff-=7;}}else{if(m[0]=='next'){diff+=7;}}
now.setDate(now.getDate()+diff);}}
break;default:if(/\d+/.test(m[0])){num*=parseInt(m[0],10);switch(m[1].substring(0,3)){case'yea':now.setFullYear(now.getFullYear()+num);break;case'mon':now.setMonth(now.getMonth()+num);break;case'wee':now.setDate(now.getDate()+(num*7));break;case'day':now.setDate(now.getDate()+num);break;case'hou':now.setHours(now.getHours()+num);break;case'min':now.setMinutes(now.getMinutes()+num);break;case'sec':now.setSeconds(now.getSeconds()+num);break;}}else{return false;}
break;}
return true;};match=strTmp.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);if(match!=null){if(!match[2]){match[2]='00:00:00';}else if(!match[3]){match[2]+=':00';}
s=match[1].split(/-/g);for(i in __is.mon){if(__is.mon[i]==s[1]-1){s[1]=i;}}
s[0]=parseInt(s[0],10);s[0]=(s[0]>=0&&s[0]<=69)?'20'+(s[0]<10?'0'+s[0]:s[0]+''):(s[0]>=70&&s[0]<=99)?'19'+s[0]:s[0]+'';return parseInt(this.strtotime(s[2]+' '+s[1]+' '+s[0]+' '+match[2])+(match[4]?match[4]/1000:''),10);}
var regex='([+-]?\\d+\\s'+'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+'|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'+'|thu\.?|thursday|fri\.?|friday|sat\.?|saturday)'+'|(last|next)\\s'+'(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?'+'|sun\.?|sunday|mon\.?|monday|tue\.?|tuesday|wed\.?|wednesday'+'|thu\.?|thursday|fri\.?|friday|sat\.?|saturday))'+'(\\sago)?';match=strTmp.match(new RegExp(regex,'g'));if(match==null){return false;}
for(i=0;i<match.length;i++){if(!process(match[i].split(' '))){return false;}}
return(now.getTime()/1000);},implode:function(glue,pieces){return((pieces instanceof Array)?pieces.join(glue):pieces);},getdate:function(timestamp){var _w=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];var _m=['January','February','March','April','May','June','July','August','September','October','November','December'];var d=(typeof timestamp=='number')?new Date(timestamp*1000):new Date();var w=d.getDay();var m=d.getMonth();var y=d.getFullYear();var r={};r.seconds=d.getSeconds();r.minutes=d.getMinutes();r.hours=d.getHours();r.mday=d.getDate();r.wday=w;r.mon=m+1;r.year=y;r.yday=Math.floor((d-(new Date(y,0,1)))/86400000);r.weekday=_w[w];r.month=_m[m];r['0']=parseInt(d.getTime()/1000,10);return r;},mktime:function(){var no=0,i=0,ma=0,mb=0,d=new Date(),dn=new Date(),argv=arguments,argc=argv.length;var dateManip={0:function(tt){return d.setHours(tt);},1:function(tt){return d.setMinutes(tt);},2:function(tt){var set=d.setSeconds(tt);mb=d.getDate()-dn.getDate();return set;},3:function(tt){var set=d.setMonth(parseInt(tt,10)-1);ma=d.getFullYear()-dn.getFullYear();return set;},4:function(tt){return d.setDate(tt+mb);},5:function(tt){if(tt>=0&&tt<=69){tt+=2000;}
else if(tt>=70&&tt<=100){tt+=1900;}
return d.setFullYear(tt+ma);}};for(i=0;i<argc;i++){no=parseInt(argv[i]*1,10);if(isNaN(no)){return false;}else{if(!dateManip[i](no)){return false;}}}
for(i=argc;i<6;i++){switch(i){case 0:no=dn.getHours();break;case 1:no=dn.getMinutes();break;case 2:no=dn.getSeconds();break;case 3:no=dn.getMonth()+1;break;case 4:no=dn.getDate();break;case 5:no=dn.getFullYear();break;}
dateManip[i](no);}
return Math.floor(d.getTime()/1000);},array_unique:function(array){var key='',tmp_arr1={},tmp_arr2={};var val='';tmp_arr1=array;var __array_search=function(needle,haystack){var fkey='';for(fkey in haystack){if((haystack[fkey]+'')===(needle+'')){return fkey;}}
return false;};for(key in tmp_arr1){val=tmp_arr1[key];if(false===__array_search(val,tmp_arr2)){tmp_arr2[key]=val;}
delete tmp_arr1[key];}
return tmp_arr2;},arr_length:function(arr){if(typeof(arr.length)!="undefined"){return arr.length;}
var len=0;for(var i in arr){len++;}
return len;}}
$.extend($.fn,{validate:function(options){options=$.extend({validators:[{functionName:'valid',functionArgs:null,errorMsg:'Invalid'}],formSelector:'form',container:$(this),allowDefaultValues:false,errorCallback:function($field,value,options){},validCallback:function($field,value,options){},focusClass:'validDaterFocus',debug:false,formSubmitCallback:false},options);presence=function(input){return!php.empty(input);};orPresence=function(input,alternative){return(!php.empty(input)||!php.empty(alternative));};isStringEmpty=function(input){if(php.empty(input))return true;if(input.length>0){str_nospaces=input.replace(/ /g,'');if(php.empty(str_nospaces))
return true;}
return false;};presenceWithoutSpaces=function(input){if(is_array(input)){for(_key in input){val=input[_key];if(is_array(val)){for(key in val){if(isStringEmpty(val[key])){return false;}}}else{if(php.is_string(val)&&isStringEmpty(val)){return false;}}}}
else if(php.is_string(input)&&isStringEmpty(input)){return false}
return true;};arrayPresenceOfIndices=function(input,indices){for(key in indices){index=indices[key];if(!input[index])
return false;}
return true;};is=function(input,compare){return(input==compare);};num_filled_items=function(args){var numFilled=0;for(key in args){var arg=args[key];if(is_array(arg)&&php.arr_length(arg)>0){numFilled+=(num_filled_items(arg)/php.arr_length(arg));}
else if(!php.empty(arg)){numFilled++;}}
return numFilled;};filled=function(args,num){var numFilled=num_filled_items(args);return(numFilled>=num);};completelyFilled=function(args){var numFilled=num_filled_items(args);return numFilled==php.arr_length(args);};validEmail=function(email){validEmailExp=/^[^@]+@[^@]+.[a-z]{2,}$/i;if(email.search(validEmailExp)==-1){return false;}
return true;};validURL=function(url){regexp=/(http):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return regexp.test(url);};uniqueEmail=function(email){return true;};validPassword=function(password){return(password.length>=6);};validZip=function(zip){return true;};ign_matches=function(input,compare){return php.in_array(input,compare,false);};numeric=function(input){return php.is_numeric(input);};age=function(time,minAge){if(is_array(time)){time_int=php.mktime(0,0,0,time.month,time.day,time.year);}else{time_int=time;}
today=php.getdate(false);userBirthday=php.mktime(0,0,0,today['mon'],today['mday'],(today['year']-minAge));return userBirthday>=time_int;};ign_length=function(input,len){return(input.length>=len);};unique=function(obj){arr=arrayValues(obj);var unique_arr=arrayCopy(arr);unique_arr=php.array_unique(unique_arr);unique_arr=arrayValues(unique_arr);return(arr.length==unique_arr.length);};type=function(input,type){return(typeof(input)==type);};fileUpload=function(file){return true;};fileUploadSize=function(file){return true;};fileUploadPhoto=function(file){return true;};fileUploadDimension=function(file,dimension){return true;};urlUpload=function(url){return true;};urlUploadSize=function(url){return true;};urlUploadPhoto=function(url){return true;};relationshipStatus=function(relstatus){validoptions=new Array('Yes','No','Maybe','N/A');return php.in_array(relstatus,validoptions,false);};userGender=function(gender){validoptions=new Array('Male','Female');return php.in_array(gender,validoptions,false);};groupGender=function(gender){validoptions=new Array('Males','Females','Mixed','Any');return php.in_array(gender,validoptions,false);};zipCode=function(zipCode){return true;};userBirthday=function(birthday){if(is_array(birthday))
timeStr=birthday.month+'/'+birthday.day+'/'+birthday.year;else
timeStr=birthday;time=strtotime(timeStr);IsOldEnough=age(time,18);if(IsOldEnough)
return time;else
return false;};ValidateGroupQuestionID=function(id){return(id>0&&id<12);};GroupmatchingResponse=function(response){array=new Array('Yes-BecomeGroupie','Yes-AskOut','NoThanks','Yes-Anonymous');return php.in_array(response,array,false);};contains=function(string,values){for(key in values){value=values[key];contains|=stristr(string,value);}
return(contains!=false);};alphanumeric=function(string){regexp=/^[A-Za-z0-9]+$/;return regexp.test(string);};creditCard=function(number,name){return true;};arrayIndexFilled=function(array,indicies){if(!is_array(array)){return false;}
depth=php.arr_length(indices);for(key in indices){index=indices[key];currentDepth++;indexMap+='['+index+']';eval("temp = array"+indexMap+";");if(!is_array(temp)&&currentDepth!=depth){return false;}}
return!php.empty(temp);};userFormServiceHash=function(userID,userHash){return true;};groupFormServiceHash=function(groupID,groupHash){return true;};length_range=function(val,range){var min=range[0];var max=range[1];var length=val.length;return length>=min&&length<=max;};ign_valid=function(value){return true;};creditCardNumber=function(number){var number=number.replace(/\D/g,'');var number_length=number.length;var parity=number_length%2;var total=0;for(i=0;i<number_length;i++){var digit=number.charAt(i);if(i%2==parity){digit=digit*2;if(digit>9){digit=digit-9;}}
total=total+parseInt(digit);}
return!(total%10);};formSubmit=function(e){if(!$(this).hasClass('validDater'))return true;var valid=new Boolean(true);var validatedArrayElements=new Array();var invalidFields=new Array();$(this).find(':input.validDater').each(function(){var $field=$(this);var baseName=$field.data('baseName');$field[0].blur();if(baseName!=$field.attr('name')){if($.inArray(baseName,validatedArrayElements)!=-1){return;}else{validatedArrayElements.push(baseName);}}
result=$field.triggerHandler('blur.validDater',{ignoreTimeout:true});if(result==false){invalidFields.push($field.attr('name'));}
if(valid&&(result==false)){$target=$field.data('validDaters')[0].options.container;$('html,body').animate({scrollTop:$target.offset().top},500,function(){$(this).stop();$field.focus();});}
valid&=new Boolean(result);});$(this).trigger({type:'validDaterCallback',valid:valid,invalidFields:invalidFields});if(valid!=true){e.stopImmediatePropagation();}
return(valid==true);};valHelper=function($field,defaultValue){getVal=function($field,allowDefault){if($field.is(':checkbox, :radio')){$field=$field.filter(':checked');}
return($field.val()!=$field.attr('defaultValue')||!$field.hasClass('autoValue')||allowDefault?$field.val():'');};val=new Object();$field.each(function(){name=$(this).attr('name');baseName=$(this).data('baseName');if(name!=baseName){indicies=name.substr(name.indexOf("[")+1).replace(/\]/g,"").split("[");evalStr="tempVal = ";for(var i in indicies){evalStr+="{"+indicies[i]+": ";}
evalStr+="\""+getVal($(this),defaultValue)+"\"";for(var i in indicies){evalStr+="}";}
eval(evalStr);$.extend(true,val,tempVal);}else{val=getVal($(this),defaultValue);}});return val;};arrayValues=function(obj){var arr=new Array();for(key in obj){val=obj[key];if(val)
arr.push(val);}
return arr;}
arrayCopy=function(arr){var arrCopy=new Array();for(key in arr){arrCopy.push(arr[key]);}
return arrCopy;}
useDefaultHelper=function($field){return($field.filter('.autoValue').length==0);};arrayEquals=function(arr1,arr2){Object.prototype.size=function(){var len=this.length?--this.length:-1;for(var k in this)
len++;return len;};if(arr1==arr2){return true;}
if(arr1.size()!=arr2.size()){return false;}
for(key in arr1){if(is_array(arr1[key])){return arrayEquals(arr1[key],arr2[key]);}
else{if(arr1[key]!=arr2[key]){return false;}}}
return true;};hasDefaultValues=function(arr1,arr2){var hasDefault=false;for(key in arr1){if(is_array(arr1[key])){return hasDefaultValues(arr1[key],arr2[key]);}
else{if(arr1[key]!=arr2[key]){hasDefault|=true;break;}}}
return hasDefault;};fieldBlurHelper=function(e,data){var valid=true;validDaters=$(e.target).data('validDaters');for(key in validDaters){validDater=validDaters[key];$field=validDater.$field;$field=$field.filter('.validDater');if(($field.filter('.'+data.focusClass).length>0)&&!(data.ignoreTimeout)){break;}
if(validDater.options.allowDefaultValues||useDefaultHelper($field)){val=valHelper($field,true);}else{val=valHelper($field,false);}
functionName=validDater.options.functionName;var specialFunctionNames=new Array('matches','length','valid');if(php.in_array(functionName,specialFunctionNames,false)){functionName='ign_'+functionName;}
if(!eval(functionName+"(val, validDater.options.functionArgs);")){validDater.options.errorCallback($field,val,validDater.options);valid&=false;break;}else{validDater.options.validCallback($field,val,validDater.options);}}
return(valid==true);};fieldBlur=function(e,data){if(e.data){data=$.extend({ignoreTimeout:e.data.ignoreTimeout,focusClass:e.data.focusClass},data);}
data=$.extend({ignoreTimeout:false},data);$(this).removeClass(data.focusClass);if(data.ignoreTimeout){return fieldBlurHelper(e,data);}else{$.doTimeout(100,function(){fieldBlurHelper(e,data);});}};fieldFocus=function(e,data){if(e.data){data=$.extend({focusClass:e.data.focusClass},data);}
$(this).addClass(data.focusClass);$(this).data('_validDater.lastValue',$(this).val());};return $(this).each(function(){$form=$(this).closest(options.formSelector);$container=options.container;name=$(this).attr('name');baseName=name.substring(0,(name.indexOf('[')!=-1?name.indexOf('['):name.length));if(name!=baseName){$field=$form.find(':input[name^="'+baseName+'["]');}else{$field=$(this);}
$field.data('baseName',baseName);validDaters=$(this).data('validDaters');if(!validDaters){validDaters=new Array();}
for(var i in options.validators){validator=options.validators[i];validDater=new Object();validDater.$field=$field;validDater.options={allowDefaultValues:options.allowDefaultValues,functionName:validator.functionName,functionArgs:validator.functionArgs,errorMsg:validator.errorMessage,errorCallback:options.errorCallback,validCallback:options.validCallback,container:$container};validDaters.push(validDater);}
$(this).data('validDaters',validDaters).addClass('validDater').unbind('blur.validDater').bind('blur.validDater',{ignoreTimeout:($field.length==1),focusClass:options.focusClass},fieldBlur).bind('focus.validDater',{focusClass:options.focusClass},fieldFocus);if(options.formSubmitCallback)
$form.bind('validDaterCallback',options.formSubmitCallback);if(!$form.hasClass('validDater')){$form.bind('submit.validDater',formSubmit).addClass('validDater');}
return this;});},unValidate:function(){return this.each(function(){$(this).removeClass('validDater').unbind('.validDater');});}});})(jQuery);