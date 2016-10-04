!function(){"use strict";function a(){var b=this;this.defaults={},this.settings={},this.defaultsPromise=a.$$resource.fetch("jsonDefaults").then(function(c){var d=c||{},e=_.fromPairs(_.map(d.SOGoMailLabelsColors,function(a,b){return"$"==b.charAt(0)?["_"+b,a]:[b,a]}));return d.SOGoMailLabelsColors=e,d.SOGoMailAutoSave=parseInt(d.SOGoMailAutoSave)||0,d.SOGoMailComposeFontSizeEnabled=parseInt(d.SOGoMailComposeFontSize)>0,window.CKEDITOR&&d.SOGoMailComposeFontSizeEnabled&&(window.CKEDITOR.config.fontSize_defaultLabel=d.SOGoMailComposeFontSize,window.CKEDITOR.addCss(".cke_editable { font-size: "+d.SOGoMailComposeFontSize+"px; }")),d.Vacation?(d.Vacation.startDate?d.Vacation.startDate=new Date(1e3*parseInt(d.Vacation.startDate)):(d.Vacation.startDateEnabled=0,d.Vacation.startDate=new Date),d.Vacation.endDate?d.Vacation.endDate=new Date(1e3*parseInt(d.Vacation.endDate)):(d.Vacation.endDateEnabled=0,d.Vacation.endDate=new Date),d.Vacation.autoReplyEmailAddresses&&d.Vacation.autoReplyEmailAddresses.length?d.Vacation.autoReplyEmailAddresses=d.Vacation.autoReplyEmailAddresses.join(","):delete d.Vacation.autoReplyEmailAddresses):d.Vacation={},angular.isUndefined(d.Vacation.autoReplyEmailAddresses)&&angular.isDefined(window.defaultEmailAddresses)&&(d.Vacation.autoReplyEmailAddresses=window.defaultEmailAddresses),angular.isUndefined(d.Vacation.daysBetweenResponse)&&(d.Vacation.daysBetweenResponse=7),angular.isUndefined(d.Vacation.startDate)&&(d.Vacation.startDateEnabled=0,d.Vacation.startDate=new Date),angular.isUndefined(d.Vacation.endDate)&&(d.Vacation.endDateEnabled=0,d.Vacation.endDate=new Date),d.Forward&&d.Forward.forwardAddress&&(d.Forward.forwardAddress=d.Forward.forwardAddress.join(",")),angular.isUndefined(d.SOGoCalendarCategoriesColors)&&(d.SOGoCalendarCategoriesColors={},d.SOGoCalendarCategories=[]),angular.isUndefined(d.SOGoContactsCategories)&&(d.SOGoContactsCategories=[]),angular.extend(b.defaults,d),b.$mdDateLocaleProvider=a.$mdDateLocaleProvider,angular.extend(b.$mdDateLocaleProvider,d.locale),angular.extend(b.$mdDateLocaleProvider,{firstDayOfWeek:d.SOGoFirstDayOfWeek,firstWeekOfYear:d.SOGoFirstWeekOfYear}),b.$mdDateLocaleProvider.firstDayOfWeek=parseInt(d.SOGoFirstDayOfWeek),b.$mdDateLocaleProvider.weekNumberFormatter=function(a){return l("Week %d",a)},b.$mdDateLocaleProvider.msgCalendar=l("Calender"),b.$mdDateLocaleProvider.msgOpenCalendar=l("Open Calendar"),b.$mdDateLocaleProvider.parseDate=function(a){return a?a.parseDate(b.$mdDateLocaleProvider,d.SOGoShortDateFormat):new Date(NaN)},b.$mdDateLocaleProvider.formatDate=function(a){return a?a.format(b.$mdDateLocaleProvider,a.$dateFormat||d.SOGoShortDateFormat):""},b.$mdDateLocaleProvider.parseTime=function(a){return a?a.parseDate(b.$mdDateLocaleProvider,d.SOGoTimeFormat):new Date(NaN)},b.$mdDateLocaleProvider.formatTime=function(a){return a?a.format(b.$mdDateLocaleProvider,d.SOGoTimeFormat):""},b.defaults}),this.settingsPromise=a.$$resource.fetch("jsonSettings").then(function(c){return c.Calendar&&(c.Calendar.PreventInvitationsWhitelist?c.Calendar.PreventInvitationsWhitelist=_.map(c.Calendar.PreventInvitationsWhitelist,function(c,d){var e=/^(.+)\s<(\S+)>$/.exec(c),f=new a.$User({uid:d,cn:e[1],c_email:e[2]});return f.$$image||b.avatar(f.c_email,32,{no_404:!0}).then(function(a){f.$$image=a}),f}):c.Calendar.PreventInvitationsWhitelist=[]),angular.extend(b.settings,c),b.settings})}a.$factory=["$q","$timeout","$log","$mdDateLocale","sgSettings","Gravatar","Resource","User",function(b,c,d,e,f,g,h,i){return angular.extend(a,{$q:b,$timeout:c,$log:d,$mdDateLocaleProvider:e,$gravatar:g,$$resource:new h(f.activeUser("folderURL"),f.activeUser()),$resourcesURL:f.resourcesURL(),$User:i}),new a}];try{angular.module("SOGo.PreferencesUI")}catch(a){angular.module("SOGo.PreferencesUI",["SOGo.Common"])}angular.module("SOGo.PreferencesUI").factory("Preferences",a.$factory),a.prototype.ready=function(){return a.$q.all([this.defaultsPromise,this.settingsPromise])},a.prototype.avatar=function(b,c,d){var e=this;return this.ready().then(function(){var f,g=e.defaults.SOGoAlternateAvatar;return f=e.defaults.SOGoGravatarEnabled?a.$gravatar(b,c,g,d):[a.$resourcesURL,"img","ic_person_grey_24px.svg"].join("/"),d&&d.dstObject&&d.dstAttr&&(d.dstObject[d.dstAttr]=f),f})},a.prototype.$save=function(){return a.$$resource.save("Preferences",this.$omit(!0)).then(function(a){return a})},a.prototype.$omit=function(a){var b,c,d;return b={},d={},angular.forEach(this,function(c,d){"constructor"!=d&&"$"!=d[0]&&(a?b[d]=angular.copy(c):b[d]=c)}),c=_.fromPairs(_.map(b.defaults.SOGoMailLabelsColors,function(a,b){return"_"==b.charAt(0)&&"$"==b.charAt(1)?b.length>2&&"$"==b.charAt(2)?[a[0].toLowerCase().replace(/[ \(\)\/\{%\*<>\\\"]/g,"_"),a]:[b.substring(1),a]:[b,a]})),b.defaults.SOGoMailLabelsColors=c,b.defaults.SOGoMailComposeFontSizeEnabled||(b.defaults.SOGoMailComposeFontSize=0),delete b.defaults.SOGoMailComposeFontSizeEnabled,b.defaults.Vacation&&(b.defaults.Vacation.startDateEnabled?b.defaults.Vacation.startDate=b.defaults.Vacation.startDate.getTime()/1e3:b.defaults.Vacation.startDate=0,b.defaults.Vacation.endDateEnabled?b.defaults.Vacation.endDate=b.defaults.Vacation.endDate.getTime()/1e3:b.defaults.Vacation.endDate=0,b.defaults.Vacation.autoReplyEmailAddresses?b.defaults.Vacation.autoReplyEmailAddresses=_.filter(b.defaults.Vacation.autoReplyEmailAddresses.split(","),function(a){return a.length}):b.defaults.Vacation.autoReplyEmailAddresses=[]),b.defaults.Forward&&b.defaults.Forward.forwardAddress&&(b.defaults.Forward.forwardAddress=b.defaults.Forward.forwardAddress.split(",")),b.settings.Calendar&&b.settings.Calendar.PreventInvitationsWhitelist&&(_.forEach(b.settings.Calendar.PreventInvitationsWhitelist,function(a){d[a.uid]=a.$shortFormat()}),b.settings.Calendar.PreventInvitationsWhitelist=d),b}}();
//# sourceMappingURL=Preferences.services.js.map