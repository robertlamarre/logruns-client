"use strict";angular.module("logrunsApp",["ngCookies","ngResource","ngSanitize","ngRoute","ngQuickDate"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/u/:username",{templateUrl:"views/profile.html",controller:"ProfileCtrl"}).when("/u/:username/calendar",{templateUrl:"views/calendar.html",controller:"CalendarCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/newentry/:date?",{templateUrl:"views/newentry.html",controller:"NewEntryCtrl"}).when("/entry/:id",{templateUrl:"views/entry.html",controller:"EntryCtrl"}).when("/users",{templateUrl:"views/users.html",controller:"UsersCtrl"}).when("/logout",{templateUrl:"views/logout.html",controller:"LogoutCtrl"}).when("/account",{templateUrl:"views/account.html",controller:"AccountCtrl"}).when("/notifications",{templateUrl:"views/notifications.html",controller:"NotificationsCtrl"}).when("/u/:username/statistics",{templateUrl:"views/statistics.html",controller:"StatisticsCtrl"}).when("/search/:text",{templateUrl:"views/search.html",controller:"SearchCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("logrunsApp").factory("user",["$http",function(a){var b={pictures:{}},c=function(){},d="http://mysterious-ravine-3794.herokuapp.com",e=function(){return d},f=function(e){var f=e.success||c,g=e.error||c;return e.user?void a({method:"POST",url:d+"/signup",data:e.user,withCredentials:!0}).success(function(a){b.user=a,f(b.user)}).error(g):void g()},g=function(e){var f=e.success||c,g=e.error||c;return e.user?void a({method:"POST",url:d+"/login",data:e.user,withCredentials:!0}).success(function(a){b.user=a,f(b.user)}).error(g):void g()},h=function(e){e=e||{};var f=e.success||c,g=e.error||c;a({method:"GET",url:d+"/logout",withCredentials:!0}).success(function(){b.user=void 0,f()}).error(g)},i=function(e){var f=e.success||c,g=e.error||c;return e.cache="undefined"==typeof e.cache?!0:e.cache,e.cache&&b.user?void f(b.user):void a({method:"GET",url:d+"/profile",withCredentials:!0}).success(function(a){b.user=a.user,f(b.user)}).error(g)},j=function(a){a.success=a.success||c,a.error=a.error||c,a.id?a.success(d+"/pictures/"+a.id):this.getUser({success:function(b){a.success(d+"/pictures/"+b._id)},error:function(){a.error()}})},k=function(e){var f=e.success||c,g=e.error||c;return e.id?b.pictures[e.id]?void e.success(b.pictures[e.id]):void a({method:"GET",url:d+"/pictures/"+e.id}).success(function(a){f(a),console.log("SUCCESS!")}).error(g):void g()},l=function(b){a({method:"POST",url:d+"/picture",data:{picture:b.picture},withCredentials:!0}).success(function(){b.success()})},m=function(c){return b.users?void c.success(b.users):void a({method:"GET",url:d+"/users"}).success(function(a){b.users=a,c.success(a)})},n=function(b){a({method:"GET",url:d+"/entries",params:{username:b.username,startDate:b.startDate,endDate:b.endDate},withCredentials:!0}).success(function(a){b.success(a)})},o=function(b){a({method:"GET",url:d+"/search",params:{text:b.text}}).success(function(a){b.success(a)})},p=function(b){a({method:"GET",url:d+"/streak",params:{username:b.username}}).success(function(a){b.success(a)})},q=function(b){a({method:"GET",url:d+"/stats",params:{username:b.username}}).success(function(a){b.success(a)})},r=function(b){a({method:"POST",url:d+"/entriesByIds",data:{ids:b.ids},withCredentials:!0}).success(function(a){b.success(a)})},s=function(b){a({method:"POST",url:d+"/entry",data:b.entry,withCredentials:!0}).success(function(a){b.success(a)}).error(function(a){b.error(a)})},t=function(b){a({method:"GET",url:d+"/entry",params:{id:b.id}}).success(function(a){b.success(a)})},u=function(b){a({method:"GET",url:d+"/comments",params:{entryId:b.entryId}}).success(b.success)},v=function(b){a({method:"POST",url:d+"/comment",data:{comment:b.comment,entryId:b.entryId},withCredentials:!0}).success(b.success)};return{signup:f,login:g,logout:h,getUser:i,getPicture:k,getPictureUrl:j,getUsers:m,getEntries:n,getEntriesByIds:r,postEntry:s,getEntry:t,getComments:u,postComment:v,getStats:q,getStreak:p,setPicture:l,searchEntriesForText:o,getUrlRoot:e}}]),angular.module("logrunsApp").factory("time",function(){var a=/^[\d\:\.]*$/,b=function(b){if(!a.test(b))return 0;var c=b.split(":");return c.length>3?0:c=_.reduce(c,function(a,b,d){return a+parseFloat(b)*Math.pow(60,c.length-d-1)},0)},c=function(a){return 10>a?"0"+a:a},d=function(a){if(!a.duration||!a.distance)return"";var d=b(a.duration),e=d/parseFloat(a.distance),f="";if(a.format){d=Number(c(e%60)).toFixed(2);var g=parseInt(e/60)%60,h=parseInt(e/3600)%60;if(f=h||"",f?f+=":"+c(g):f=g||"",!f)return"";f+=":"+c(d)}return f};return{getSeconds:b,getPace:d}}),angular.module("logrunsApp").controller("HomeCtrl",["$scope","$route","user",function(a,b,c){a.date=moment(),c.getUsers({success:function(b){a.users=b}}),c.getUser({success:function(b){a._user=b}}),c.getEntries({startDate:a.date.startOf("month").toISOString(),endDate:a.date.endOf("month").toISOString(),success:function(b){a.entries=b},error:function(a){console.log(a)}})}]),angular.module("logrunsApp").controller("CalendarCtrl",["$scope","$location","$routeParams","user",function(a,b,c,d){a.date=moment(),a.username=c.username,a.days=[],a.entryMap={};var e=function(b){var c={};_.each(b,function(a){var b=moment(a.date).zone(0).format("MM-DD-YYYY");c[b]?c[b].push(a):c[b]=[a]}),a.entryMap=c},f=a.getEntries=function(){var b=a.date.clone().subtract("months",1).toISOString(),c=a.date.clone().add("months",1).toISOString();d.getEntries({username:a.username,startDate:b,endDate:c,success:function(b){a.entries=e(b),i()},error:function(a){console.log(a)}})};f();var g=function(){a.daysInMonth=new Array(a.date.daysInMonth()),a.dispDate=a.date.format("MMMM")+" "+a.date.year()};g();var h=function(){var b=a.date.clone(),c=b.startOf("month").day()-1;3>=c&&(c+=7),b.subtract("days",c);var d=[],e=a.date.month(),f="active";a.firstDay=b.clone();for(var g=0;42>g;g++)f=e===b.month()?"active":"inactive",d.push({day:b.date(),style:f,date:b.format("MM-DD-YYYY")}),b.add("days",1);a.days=d},i=function(){for(var b=[0,0,0,0,0,0],c=0;6>c;++c){var d=[],e=a.firstDay.clone();e.add("days",7*c);for(var f=0;7>f;++f)if(d=a.entryMap[e.format("MM-DD-YYYY")]){for(var g=0;g<d.length;++g)b[c]+=d[g].distance;e.add("days",1)}else e.add("days",1)}a.summary=b},j=function(){d.getStats({username:a.username,success:function(b){a.stats=b}}),d.getStreak({username:a.username,success:function(b){a.streak=b}})};h(),j(),a.getLastMonth=function(){a.date.subtract("months",1),h(),g(),f(),i(),j()},a.getNextMonth=function(){a.date.add("months",1),h(),g(),f(),i(),j()}}]),angular.module("logrunsApp").controller("LoginCtrl",["$scope","$location","user",function(a,b,c){a.login=function(){a.user&&c.login({user:a.user,success:function(a){console.log(a),window.history.back()},error:function(){console.log("Invalid Credentials")}})}}]),angular.module("logrunsApp").controller("SignupCtrl",["$scope","$location","user",function(a,b,c){a.signup=function(){c.signup({user:a.user,success:function(a){b.path("/u/"+a.local.username)},error:function(){console.log("Username ALREADY EXISTS")}})}}]),angular.module("logrunsApp").controller("EntryCtrl",["$scope","$routeParams","$route","user","time",function(a,b,c,d,e){d.getUser({success:function(b){a.username=b.local.username},error:function(){a.username="You must sign in to comment!"}}),a.newcomment={message:""},d.getEntry({id:b.id,success:function(b){a.entry=b}}),a.formatDate=function(a){return moment(a).zone(0).format("MMMM DD, YYYY")},a.postComment=function(){console.log("message",a.newcomment.message),a.newcomment.username=a.username,a.newcomment.date=moment(),d.postComment({comment:a.newcomment,entryId:a.entry._id,success:function(a){console.log(a),c.reload()}})},a.getPace=function(a,b){var c=e.getPace({distance:a,duration:b,format:!0});return c}}]),angular.module("logrunsApp").controller("NewEntryCtrl",["$scope","$location","$routeParams","user","time",function(a,b,c,d,e){a.value=new Date(2013,9,22),a.entry={type:"Easy",date:c.date||new Date},d.getUser({success:function(b){a.user=b}}),a.submit=function(){console.log(a.entry),d.postEntry({entry:a.entry,success:function(c){console.log(c),a.user&&b.path("/u/"+a.user.local.username)},error:function(a){console.error("busted",a)}})},a.getPace=function(){var b=e.getPace({distance:a.entry.distance,duration:a.entry.duration,format:!0});return b}}]),angular.module("logrunsApp").controller("LogoutCtrl",["user","$location",function(a,b){a.logout({success:function(){b.path("/")}})}]),angular.module("logrunsApp").controller("UsersCtrl",["$scope","user",function(a,b){a.account="Sign in",a.date=moment(),b.getUsers({success:function(b){a.users=b}})}]),angular.module("logrunsApp").controller("NotificationsCtrl",["$scope","user",function(a,b){console.log("made it");var c=function(c){var d=c.notifications.entries;0!==d.length&&b.getEntriesByIds({ids:d,success:function(b){console.log(b),a.entries=b.reverse()}})};a.getDate=function(a){return moment(a).format("MMM DD, YYYY h:mm a")},b.getUser({success:function(b){a.user=b,console.log(b),c(b)}})}]),angular.module("logrunsApp").controller("StatisticsCtrl",function(){}),angular.module("logrunsApp").controller("AccountCtrl",["$scope","$location","user",function(a,b,c){c.getUser({success:function(b){a.user=b,console.log(b)}}),a.preview=function(){var b=a.inputFile;if(b){var c=document.getElementsByTagName("img")[0],d=new FileReader;d.onload=function(a){c.src=a.target.result},d.readAsDataURL(b)}},a.upload=function(){var d=a.inputFile;if(d){var e=document.createElement("canvas"),f=document.getElementsByTagName("img")[0];if(f.src){var g=new FileReader;g.readAsDataURL(d);var h=e.getContext("2d");h.drawImage(f,0,0);var i=40,j=40,k=f.width,l=f.height;console.log(k,l),k>l?k>i&&(l*=i/k,k=i):l>j&&(k*=j/l,l=j),e.width=k,e.height=l,h.drawImage(f,0,0,40,40);var m=e.toDataURL("image/png");m=m.replace("data:image/png;base64,",""),c.setPicture({picture:m,success:function(){b.path("/")}})}}}}]),angular.module("logrunsApp").controller("SearchCtrl",["$scope","$routeParams","$timeout","user",function(a,b,c,d){a.text=b.text,d.searchEntriesForText({text:b.text,success:function(b){a.entries=b,c(function(){var b=new RegExp("("+a.text+")","i");$(".blockquote").each(function(a,c){var d=$(c).html().replace(b,'<span class="hit">$1</span>');$(c).html(d)})})}})}]),angular.module("logrunsApp").controller("ProfileCtrl",["$scope","$routeParams","user",function(a,b,c){var d=b.username,e=c.getUrlRoot();a.picUrl=e+"/pictures/"+d,a.stats={},c.getStats({username:d,success:function(b){a.stats=_.extend(a.stats,b)}}),c.getStreak({username:d,success:function(b){a.stats.streak=b}});var f=moment().subtract("months",3).toISOString(),g=moment().toISOString();c.getEntries({username:d,startDate:f,endDate:g,success:function(b){a.entries=b,console.log(b),h(b)},error:function(a){console.log(a)}});var h=function(a){var b={top:20,right:50,bottom:50,left:50},c=.8*$(window).width()-b.left-b.right,d=.5*$(window).height()-b.top-b.bottom,e=d3.scale.ordinal().rangeRoundBands([0,c],.1),f=d3.scale.linear().range([d,0]),g=d3.svg.axis().scale(e).orient("bottom"),h=d3.svg.axis().scale(f).orient("left").ticks(10);$(".chart").width(c);var i=d3.select(".chart").append("svg").attr("width",c+b.left+b.right).attr("height",d+b.top+b.bottom).append("g").attr("transform","translate("+b.left+","+b.top+")");e.domain(a.map(function(a){return moment(a.date).format("MM/DD")})),f.domain([0,d3.max(a,function(a){return a.distance})]),i.append("g").attr("class","x axis").attr("transform","translate(0,"+d+")").call(g).selectAll("text").style("text-anchor","end").attr("dx","-.8em").attr("dy",".15em").attr("transform",function(){return"rotate(-65)"}),i.append("g").attr("class","y axis").call(h).append("text").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Distance"),i.selectAll(".bar").data(a).enter().append("rect").attr("class","bar").attr("x",function(a){return e(moment(a.date).format("MM/DD"))}).attr("width",e.rangeBand()).attr("y",function(a){return f(a.distance)}).attr("height",function(a){return d-f(a.distance)}),i.selectAll(".barLabel").data(a).enter().append("text").attr("class","barLabel").attr("x",function(a){return e(moment(a.date).format("MM/DD"))+e.rangeBand()/2}).attr("y",function(a){return f(a.distance)+12}).attr("text-anchor","middle").text(function(a){return a.distance}).attr("fill","white")}}]),angular.module("logrunsApp").constant("dropdownConfig",{openClass:"open"}).service("dropdownService",["$document",function(a){var b=null;this.open=function(e){b||(a.bind("click",c),a.bind("keydown",d)),b&&b!==e&&(b.isOpen=!1),b=e},this.close=function(e){b===e&&(b=null,a.unbind("click",c),a.unbind("keydown",d))};var c=function(a){a&&a.isDefaultPrevented()||b.$apply(function(){b.isOpen=!1})},d=function(a){27===a.which&&(b.focusToggleElement(),c())}}]).controller("DropdownController",["$scope","$attrs","$parse","dropdownConfig","dropdownService","$animate",function(a,b,c,d,e,f){var g,h=this,i=a.$new(),j=d.openClass,k=angular.noop,l=b.onToggle?c(b.onToggle):angular.noop;this.init=function(d){h.$element=d,b.isOpen&&(g=c(b.isOpen),k=g.assign,a.$watch(g,function(a){i.isOpen=!!a}))},this.toggle=function(a){var b=i.isOpen=arguments.length?!!a:!i.isOpen;return b},this.isOpen=function(){return i.isOpen},i.focusToggleElement=function(){h.toggleElement&&h.toggleElement[0].focus()},i.$watch("isOpen",function(b,c){f[b?"addClass":"removeClass"](h.$element,j),b?(i.focusToggleElement(),e.open(i)):e.close(i),k(a,b),angular.isDefined(c)&&b!==c&&l(a,{open:!!b})}),a.$on("$locationChangeSuccess",function(){i.isOpen=!1}),a.$on("$destroy",function(){i.$destroy()})}]).directive("dropdown",function(){return{restrict:"CA",controller:"DropdownController",link:function(a,b,c,d){d.init(b)}}}).directive("dropdownToggle",function(){return{restrict:"CA",require:"?^dropdown",link:function(a,b,c,d){if(d){d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.bind("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.unbind("click",e)})}}}}),angular.module("logrunsApp").directive("toolbar",function(){return{restrict:"E",templateUrl:"../../views/templates/toolbar-template.html",controller:["$scope","$document","$location","user",function(a,b,c,d){a.items=[],a.loggedIn=!1,a.search=function(){c.path("/search/"+a.textSearch)};var e=function(){d.getUser({cache:!1,success:function(b){a.href="",a.user=b,a.loggedIn=!0,a.items=[{text:"Notifications",href:"#/notifications"},{text:"Logout",href:"#/logout"}]},error:function(){a.items=[],a.loggedIn=!1}})};a.$on("$routeChangeSuccess",e)}]}}),angular.module("logrunsApp").directive("entry",function(){return{restrict:"E",templateUrl:"../../views/templates/entry-template.html",controller:["$scope","user",function(a,b){a.user=a.$parent.user,a.getDate=function(a){return moment(a).zone(0).format("MMM DD, YYYY")},a.getDateTime=function(a){return moment(a).format("MMM DD, YYYY h:mm a")};var c=b.getUrlRoot();a.getPicUrl=function(a){return console.log(c+a),c+"/pictures/"+a},a.postComment=function(){var c={username:a.user.local.username,message:a.newcomment.message,date:moment()};b.postComment({comment:c,entryId:a.entry._id,success:function(){a.newcomment.message="",a.entry.comments.push(c)}})}}],link:function(a,b,c){a.entry=a.entry||c.data}}}),angular.module("logrunsApp").directive("file",function(){return{restrict:"E",template:'<input type="file" />',replace:!0,require:"ngModel",link:function(a,b,c,d){var e=function(){a.$apply(function(){d.$setViewValue(c.multiple?b[0].files:b[0].files[0])})};b.bind("change",e)}}});