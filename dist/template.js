angular.module('logrunsApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/account.html',
    "<img></img>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<!--<div>Import data from RunningAhead, a strictly inferior website</div>\n" +
    "<ul>\n" +
    "  <li>Step 1: Export XML data from RunningAhead</li>\n" +
    "  <li>Step 2: Click \"Choose File\" and select the file you just downloaded</li>\n" +
    "  <li>Step 3: (Optional) Open dev tools console</li>\n" +
    "  <li>Step 4: Click \"Upload\"</li>\n" +
    "  <li>Step 5: Leave this page open, wait a couple minutes. If you did step 3, you can stop waiting once the number in the console stops increasing</li>\n" +
    "</ul>\n" +
    "<button class=\"coolGradient\" ng-click=\"importRA()\">Upload</button>\n" +
    "<file name=\"ra\" ng-model=\"raFile\" accept=\"text/xml\"/>-->\n" +
    "\n" +
    "<div>we cool</div>\n" +
    "\n" +
    "<div>You <i>might</i> be able to upload a picture here. Good luck</div>\n" +
    "<button class=\"coolGradient\" ng-click=\"upload()\">Upload</button>\n" +
    "<file name=\"image\" ng-model=\"inputFile\" ng-change=\"preview()\" accept=\"image/png,image/jpg,image/jpeg\"/>\n" +
    "\n"
  );


  $templateCache.put('views/calendar.html',
    "<div class=\"username\">{{username}}'s calendar</div>\n" +
    "<div class=\"calendarHeader\">\n" +
    "<span class=\"clickable\" ng-click=\"getLastMonth()\">&lt;</span>\n" +
    "{{dispDate}}\n" +
    "<span class=\"clickable\" ng-click=\"getNextMonth()\">&gt;</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"stats center\">\n" +
    "<div><div class=\"label\">Streak:</div><div class=\"stat\">{{streak}} days</div></div><br>\n" +
    "<div><div class=\"label\">Last 7 Days:</div><div class=\"stat\">{{stats.rolling7 | number : 1}} miles</div></div>\n" +
    "<div><div class=\"label\">Last 30 Days: </div><div class=\"stat\">{{stats.rolling30 | number : 1}} miles</div></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"calendarContainer\">\n" +
    "<div class=\"dow\">\n" +
    "<span>Monday</span>\n" +
    "<span>Tuesday</span>\n" +
    "<span>Wednesday</span>\n" +
    "<span>Thursday</span>\n" +
    "<span>Friday</span>\n" +
    "<span>Saturday</span>\n" +
    "<span>Sunday</span>\n" +
    "<span>Totals</span>\n" +
    "</div>\n" +
    "<div class=\"calendar\">\n" +
    "<div class=\"day {{dateObj.style}}\" ng-repeat=\"dateObj in days track by $index\">\n" +
    "<a href=\"#/newentry/{{dateObj.date}}\">{{dateObj.day}}</a>\n" +
    "<div class=\"calendarEntry\" ng-repeat=\"entry in entryMap[dateObj.date]\">\n" +
    "<a href=\"#/entry/{{entry._id}}\">{{entry.type}} {{entry.distance}}</a>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class=\"totals\">\n" +
    "<div ng-repeat=\"sum in summary track by $index\"><span ng-show=\"sum > 0\">{{sum | number : 1}} miles</span></div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('views/entry.html',
    "<div class=\"entry\">\n" +
    "<div class=\"entryHeader\">{{formatDate(entry.date)}}</div>\n" +
    "<div class=\"entryBody\">\n" +
    "<div class=\"entryField\"><span class=\"bold\">Type:</span> {{entry.type}}</div>\n" +
    "<div class=\"entryField\"><span class=\"bold\">Distance:</span> {{entry.distance}} miles</div>\n" +
    "<div class=\"entryField\"><span class=\"bold\">Duration:</span> {{entry.duration}}</div>\n" +
    "<div class=\"entryField\"><span class=\"bold\">Pace:</span> {{getPace(entry.distance, entry.duration)}} </div>\n" +
    "<div class=\"entryField\"><span ng-bind-html=\"formatNotes(entry.notes)\"></span></div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"entry\">\n" +
    "<div class=\"commentHeader\">Comments</div>\n" +
    "<div class=\"entryBody\">\n" +
    "<div class=\"entryField\" ng-repeat=\"comment in entry.comments\">\n" +
    "<div><span class=\"bold\">{{comment.username}}:</span> {{comment.message}}</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class=\"commentSubmit\">\n" +
    "<div class=\"commentUsername\">{{username}}</div>\n" +
    "<textarea ng-model=\"newcomment.message\"></textarea>\n" +
    "<button style=\"float:left\" class=\"coolGradient\" ng-click=\"edit()\">edit</button>\n" +
    "<button class=\"coolGradient\" ng-click=\"postComment()\">post</button>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('views/fantasy.html',
    "<div class=\"entry logEntry\">\n" +
    "<div class=\"entryHeader\">New Fantasy Bet</div>\n" +
    "<form>\n" +
    "<div class=\"entryBody\">\n" +
    "\n" +
    "<div class=\"entryField\">\n" +
    "<label>Expiration:</label>\n" +
    "<quick-datepicker ng-model=\"bet.date\" label-format='EEEE, MMMM d, yyyy' required class=\"formInput\"></quick-datepicker>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"entryField\">\n" +
    "<label>Meet (optional):</label>\n" +
    "<input type=\"text\" ng-model=\"bet.meet\"/>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"entryField\">\n" +
    "<label>Wager:</label>\n" +
    "<input ng-pattern=\"/^\\d*$/\" ng-model=\"bet.wager\" type=\"text\" required/>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"entryField notes\">\n" +
    "<label>Condition:</label>\n" +
    "<textarea class=\"notes\" ng-model=\"bet.condition\"></textarea>\n" +
    "</div class=\"entryField\">\n" +
    "</div>\n" +
    "<button class=\"submit coolGradient\" ng-click=\"submit()\">submit</button>\n" +
    "</div>\n" +
    "</form>\n"
  );


  $templateCache.put('views/home.html',
    "<div class=\"entry\">\n" +
    "<div class=\"feed\">\n" +
    "<div ng-repeat=\"entry in entries\">\n" +
    "<entry></entry>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('views/login.html',
    "<div class=\"entry login dialog\">\n" +
    "<div class=\"entryHeader\">Login</div>\n" +
    "<div class=\"entryBody\">\n" +
    "<form>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Username:</label>\n" +
    "<input ng-model=\"user.username\" class=\"formInput\" type=\"text\"/>\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Password:</label>\n" +
    "<input ng-model=\"user.password\" type=\"password\" class=\"formInput\" type=\"text\"/>\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<a href=\"#/signup\">sign up</a>\n" +
    "<button class=\"coolGradient\" ng-click=\"login()\" type=\"submit\">submit</button>\n" +
    "</div>\n" +
    "</form>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/logout.html',
    "<div class=\"tile\">Get Outta HEEEEEEEEERE. You're OUT! SEE YA!</div>"
  );


  $templateCache.put('views/newentry.html',
    "<div class=\"entry logEntry\">\n" +
    "<div class=\"entryHeader\">New Log Entry</div>\n" +
    "<form>\n" +
    "<div class=\"entryBody\">\n" +
    "<div class=\"entryField\">\n" +
    "<label>Date:</label>\n" +
    "<quick-datepicker ng-model=\"entry.date\" label-format='EEEE, MMMM d, yyyy' required class=\"formInput\"></quick-datepicker>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Type:</label>\n" +
    "<select ng-model=\"entry.type\">\n" +
    "<option>Easy</option>\n" +
    "<option>Race</option>\n" +
    "<option>Tempo</option>\n" +
    "<option>Interval</option>\n" +
    "<option>Long</option>\n" +
    "<option>Fartlek</option>\n" +
    "<option>Recovery</option>\n" +
    "</select>\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Distance:</label>\n" +
    "<input ng-pattern=\"/^[0-9]*\\.?[0-9]*$/\" placeholder=\"miles\" ng-model=\"entry.distance\" type=\"text\" required/>\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Duration:</label>\n" +
    "<input ng-pattern=\"/^([\\d]*)([\\:]?[0-9]{2}){0,2}$/\" placeholder=\"HH:mm:ss\" ng-model=\"entry.duration\" type=\"text\" required/>\n" +
    "<span>{{getPace()}}</span>\n" +
    "</div>\n" +
    "<div class=\"entryField notes\">\n" +
    "<label>Notes:</label>\n" +
    "<textarea class=\"notes\" ng-model=\"entry.notes\"></textarea>\n" +
    "</div class=\"entryField\">\n" +
    "</div>\n" +
    "<button class=\"submit coolGradient\" ng-click=\"submit()\">submit</button>\n" +
    "</div>\n" +
    "</form>\n"
  );


  $templateCache.put('views/notifications.html',
    "<div class=\"entry\">\n" +
    "<h1>Notifcations</h1>\n" +
    "<div class=\"feed\">\n" +
    "<div ng-repeat=\"entry in entries\">\n" +
    "<entry></entry>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('views/profile.html',
    "<div class=\"chart\"></div>\n"
  );


  $templateCache.put('views/search.html',
    "<div class=\"entry\">\n" +
    "<div class=\"feed\">\n" +
    "<div ng-repeat=\"entry in entries\">\n" +
    "<entry></entry>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('views/signup.html',
    "<div class=\"entry login\" id=\"loginPane\">\n" +
    "<div class=\"entryHeader\">Signup</div>\n" +
    "<div class=\"entryBody\">\n" +
    "<form>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Username:</label>\n" +
    "<input ng-model=\"user.username\" class=\"formInput\" type=\"text\"/>\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<label>Password</label>\n" +
    "<input ng-model=\"user.password\" type=\"password\" class=\"formInput\" type=\"text\"/>\n" +
    "</div>\n" +
    "<div class=\"entryField\">\n" +
    "<button class=\"coolGradient\" ng-click=\"signup()\" type=\"submit\">submit</button>\n" +
    "</div>\n" +
    "</form>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('views/statistics.html',
    "coming soon"
  );


  $templateCache.put('views/templates/entry-template.html',
    "<div class=\"newsfeedItem entryField\">\n" +
    "<div class=\"feedHeader {{entry.type}}\">\n" +
    "<img class=\"feedPicture\" ng-src=\"{{getPicUrl(entry.username)}}\"/>\n" +
    "<div class=\"userInfo\">\n" +
    "<a href=\"#/u/{{entry.username}}/calendar\">{{entry.username}}</a>\n" +
    "ran\n" +
    "<a href=\"#/entry/{{entry._id}}\">{{entry.distance}} miles</a> in {{entry.duration}}\n" +
    "<div class=\"datestamp\">{{getDate(entry.date)}}</div>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"blockquote\" ng-bind-html=\"formatNotes(entry.notes)\"></div>\n" +
    "<div class=\"comments\" ng-show=\"entry.comments.length > 0\">\n" +
    "<div class=\"comment\" ng-repeat=\"comment in entry.comments\">\n" +
    "<img class=\"feedPicture\" ng-src=\"{{getPicUrl(comment.username)}}\"/>\n" +
    "<div><a href=\"#/u/{{comment.username}}/calendar\">{{comment.username}}:</a> {{comment.message}}</div>\n" +
    "<div class=\"datestamp\">{{getDateTime(comment.date)}}</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div ng-show=\"user !== undefined\" class=\"feedCommentContainer\">\n" +
    "  <form ng-submit=\"postComment()\">\n" +
    "    <input ng-model=\"newcomment.message\" class=\"feedComment\" type=\"text\" placeholder=\"Comment...\">\n" +
    "  </form>\n" +
    "</div>\n" +
    "</div>"
  );


  $templateCache.put('views/templates/graph-template.html',
    "<div id=\"graph\"></div>"
  );


  $templateCache.put('views/templates/leaderboard-template.html',
    "<div ng-repeat=\"leader in leaderboard\">\n" +
    "  <div class=\"name\"><a href=\"#/u/{{leader._id}}/calendar\">{{leader._id}}</a></div>\n" +
    "  <div class=\"distance\">{{leader.total.toFixed(1)}}</div>\n" +
    "</div>"
  );


  $templateCache.put('views/templates/sidebar-template.html',
    "<div ng-show=\"loggedIn && !minView\" class=\"holder\">\n" +
    "\n" +
    "<div class=\"links\">\n" +
    "  <a href=\"#\">Dashboard</a>\n" +
    "  <a href=\"#/u/{{user.local.username}}/calendar\"><i class=\"fa fa-calendar\"></i></a>\n" +
    "  <a href=\"#/notifications\">Notifications</a>\n" +
    "  <a>Personal Records</a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"profileSection\">\n" +
    "  <img class=\"profPic\" src=\"data:image/png;base64,{{user.picture}}\"/>\n" +
    "  <div class=\"profName\">\n" +
    "    <div>{{user.local.username}}</div>\n" +
    "    <a class=\"editProf\" href=\"#/account\">Edit Profile</a>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"quote\">\n" +
    "\tYo son you think I play? I don't play. You see that trout? Fukn fishy bro. Get Rekt, son.\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"section\">\n" +
    "  STATS\n" +
    "  <hr>\n" +
    "  <graph></graph>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"section\">\n" +
    "  GROUPS\n" +
    "  <hr>\n" +
    "  <div class=\"quote deets\">Stay tuned</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"section\">\n" +
    "  LEADERBOARD\n" +
    "  <hr>\n" +
    "  <leaderboard></leaderboard>\n" +
    "</div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div ng-show=\"!loggedIn\">\n" +
    "\t<a href=\"#/login\">Login!</a>\n" +
    "</div>"
  );


  $templateCache.put('views/templates/toolbar-template.html',
    "<div class=\"toolbar\" ng-show=\"attemptedLogin\">\n" +
    "<a href=\"/\" class=\"toolbarItem bold title\">LogRuns</a>\n" +
    "<a href=\"#/login\" ng-show=\"items.length == 0\" class=\"toolbarItem accountInfo\">Login</a>\n" +
    "<div ng-show=\"items.length > 0\" class=\"toolbarItem dropdown accountInfo\">\n" +
    "  <div class=\"dropdown-toggle\">\n" +
    "    <div class=\"accountName\">\n" +
    "    {{user.local.username}}\n" +
    "    </div>\n" +
    "    <div class=\"notificationCount\" ng-show=\"user.notificationCount > 0\">\n" +
    "      {{user.notificationCount}}\n" +
    "    </div>\n" +
    "    <div class=\"caret\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <ul class=\"dropdown-menu\">\n" +
    "    <li>\n" +
    "      <a class=\"dropdown-option\" href=\"#/notifications\">Notifications</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"dropdown-option\" href=\"#/account\">Account</a>\n" +
    "    </li>\n" +
    "    <li>\n" +
    "      <a class=\"dropdown-option\" href=\"#/logout\">Logout</a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "<input type=\"text\" ng-model=\"textSearch\" class=\"search\" ng-enter=\"search()\" placeholder=\"Search Entries...\"/>\n" +
    "</div>\n" +
    "<div class=\"toolbarPlaceholder\"></div>\n"
  );


  $templateCache.put('views/users.html',
    "<div class=\"entry\">\n" +
    "<div class=\"entryHeader\">Users</div>\n" +
    "<div class=\"entryBody\">\n" +
    "<div class=\"entryField\" ng-repeat=\"user in users\">\n" +
    "<a href=\"#/u/{{user.local.username}}/calendar\">{{user.local.username}}</a>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>"
  );

}]);
