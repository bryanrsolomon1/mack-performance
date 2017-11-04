(function() {
    "use strict";
    
    function CalendarCtrl($compile, $timeout, $mdDialog) {
        
        var self = this;
        
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        
        /* event source that contains custom events on the scope */
        self.events = [];
        
        $timeout(function() {
            self.events.push([
              {title: 'All Day Event', start: new Date(y, m, 1), stick: true},
              {title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), stick: true},
              {id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false, stick: true},
              {id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false, stick: true},
              {title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, stick: true},
              {title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', stick: true}
            ]);
        }, 500);

        /* alert on eventClick */
        self.alertOnEventClick = function(date, jsEvent, view){
            console.log(date.title + ' was clicked');
            console.log(jsEvent);
            console.log(view);
            var confirm = $mdDialog.confirm()
                            .title("Dialog test")
                          .textContent('Calendar Popup!')
                          .ok('Great')
                            .targetEvent(jsEvent);

            $mdDialog.show(confirm);
        };
        /* alert on Drop */
         self.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
           console.log('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        self.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
           console.log('Event Resized to make dayDelta ' + delta);
        };
        
         /* Render Tooltip */
        self.eventRender = function( event, element, view ) { 
//            element.attr({'tooltip': event.title,
//                         'tooltip-append-to-body': true});
//            $compile(element)(self);
        };
        
        /* config object */
        self.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                center: '',
                    right: 'today prev,next'
                },
                eventClick: self.alertOnEventClick,
                eventDrop: self.alertOnDrop,
                eventResize: self.alertOnResize,
                eventRender: self.eventRender,
                viewRender: function(view) {
                    console.log(view);
                    console.log("View Changed: ", view.start.format(), view.end.format());
                }
            }
        };
    }

    angular.module("mack").controller("CalendarCtrl", CalendarCtrl);
    
})();