"use strict";var myModule=angular.module("logrunsApp",["ngCookies","ngResource","ngSanitize","ngRoute"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/u/:username",{templateUrl:"views/calendar.html",controller:"CalendarCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/entry/:date",{templateUrl:"views/entry.html",controller:"EntryCtrl"}).otherwise({redirectTo:"/"})}]);myModule.factory("user",["$http",function(a){var b,c=function(){},d="http://mysterious-ravine-3794.herokuapp.com",e=function(e){var f=e.success||c,g=e.error||c;return e.user?void a({method:"POST",url:d+"/signup",data:e.user,withCredentials:!0}).success(function(a){b=a,f(b)}).error(g):void g()},f=function(e){var f=e.success||c,g=e.error||c;return e.user?void a({method:"POST",url:d+"/login",data:e.user,withCredentials:!0}).success(function(a){console.log(a),b=a,f(b)}).error(g):void g()},g=function(e){var f=e.success||c,g=e.error||c;b&&f(b),a({method:"GET",url:d+"/profile",withCredentials:!0}).success(function(a){b=a.user,f(b)}).error(g)},h=function(e){var f=e.success||c,g=e.error||c;a({method:"GET",url:d+"/logout",withCredentials:!0}).success(function(){b=void 0,f()}).error(g)},i=function(b){a({method:"GET",url:d+"/entries",params:{username:b.username,startDate:b.startDate,endDate:b.endDate},withCredentials:!0}).success(function(a){b.success(a)})},j=function(b){a({method:"GET",url:d+"/users"}).success(function(a){b.success(a)})};return{signup:e,login:f,getUser:g,logout:h,getEntries:i,getUsers:j}}]),angular.module("logrunsApp").controller("HomeCtrl",["$scope","user","$location",function(a,b,c){a.account="Sign in",b.getUser({success:function(b){a.account=b.local.username}}),b.getUsers({success:function(b){a.users=b}});var d=function(){c.path("/login")},e=function(){a.account="Sign in",b.logout({success:function(){console.log("Successfully signed out")},error:function(){console.log("Error signing out")}})};a.logInOut=function(){return"sign in"===a.account.toLowerCase()?void d():void e()}}]),angular.module("logrunsApp").controller("CalendarCtrl",["$scope","$location","$routeParams","user",function(a,b,c,d){a.account="Sign in",a.date=moment(),a.username=c.username,console.log("User: ",c.username);var e=a.getEntries=function(){d.getEntries({username:a.username,startDate:a.date.startOf("month").toISOString(),endDate:a.date.endOf("month").toISOString(),success:function(b){a.entries=b,console.log(b)},error:function(a){console.log(a)}})};e(),a.getEntry=function(b){if(a.entries&&b){for(var c=a.entries,d=[],e=a.date.startOf("day").date(b),f=0;f<c.length;++f)e.isSame(c[f].date,"day")&&d.push(c[f]);return d}};var f=function(){a.daysInMonth=new Array(a.date.daysInMonth()),a.dispDate=a.date.format("MMMM")+" "+a.date.year()};f(),d.getUser({success:function(b){a.account=b.local.username},error:function(){console.log("Not signed in"),a.account="Sign in"}});var g=function(){b.path("/login")},h=function(){a.account="Sign in",d.logout({success:function(){console.log("Successfully signed out")},error:function(){console.log("Error signing out")}})};a.logInOut=function(){return"sign in"===a.account.toLowerCase()?void g():void h()},a.getDays=function(){var b=a.date.startOf("month").day()-1;b=0>b?6:b;for(var c=new Array(b),d=0;d<a.date.daysInMonth();++d)c.push(d+1);return c},a.getLastMonth=function(){a.date.subtract("months",1),f()},a.getNextMonth=function(){a.date.add("months",1),f()}}]),angular.module("logrunsApp").controller("LoginCtrl",["$scope","$location","user",function(a,b,c){a.login=function(){a.user&&c.login({user:a.user,success:function(a){console.log(a),b.path("/u/"+a.local.username)},error:function(){console.log("Invalid Credentials")}})}}]),angular.module("logrunsApp").controller("SignupCtrl",["$scope","$location","user",function(a,b,c){a.signup=function(){c.signup({user:a.user,success:function(a){b.path("/u/"+a.local.username)},error:function(){console.log("Username ALREADY EXISTS")}})}}]),angular.module("logrunsApp").controller("EntryCtrl",["$scope","$http","$location",function(a,b,c){a.entry={};var d="http://mysterious-ravine-3794.herokuapp.com";a.submit=function(){console.log(a.entry),b({method:"POST",url:d+"/entry",data:a.entry,withCredentials:!0}).success(function(a){console.log("POSTED!"),console.log(a),c.path("/")}).error(function(){console.log("BUSTED")})}}]);