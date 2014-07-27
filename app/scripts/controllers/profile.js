'use strict';

angular.module('logrunsApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, $location, $rootScope, user) {

    var username = $routeParams.username;


    var urlRoot = user.getUrlRoot();
    $scope.picUrl = urlRoot + '/pictures/' + username;

    $scope.stats = {};

    user.getStats({
      username: username,
      success: function(data) {
        $scope.stats = _.extend($scope.stats, data);
      }
    });

    user.getStreak({
      username: username,
      success: function(data) {
        $scope.stats.streak = data;
      }
    });

    var start = moment().subtract('months',3).toISOString();
    var end = moment().toISOString();
    user.getEntries({
      username: username,
      startDate: start,
      endDate: end,
      success: function(entries) {
        $scope.entries = entries;
        makeGraph(entries);
      },
      error: function(error) {
        console.log(error);
      }
    });

    var makeGraph = function(data) {

      var margin = {top: 40, right: 40, bottom: 50, left:40},
      width = $(window).width() * 0.9,
      height = $(window).height() * 0.8;

      var getDate = function(d) {
        d = new Date(d);
        d.setHours(12);
        d.setMinutes(0);
        d.setSeconds(0);
        d.setMilliseconds(0);
        return d;
      };

      var x = d3.time.scale()
        .domain([d3.min(data, function(d) { return getDate(d.date);}), d3.time.day.offset(getDate(data[data.length - 1].date), 1)])
        .rangeRound([0, width - margin.left - margin.right]);

      var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.distance; })])
        .range([height - margin.top - margin.bottom, 0]);

      var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(d3.time.days, 1)
        .tickFormat(d3.time.format('%b %d'))
        .tickSize(0)
        .tickPadding(0);

      var barWidth = width / 95;

      var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .tickPadding(8);

      var svg = d3.select('.chart').append('svg')
        .attr('class', 'chart')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      svg.selectAll('.chart')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function(d) { return x(getDate(d.date)); })
        .attr('y', height - margin.bottom - margin.top)
        .attr('width', barWidth)
        .attr('height', 0)
        .on('click', function(d) {
          console.log(d._id);
          $rootScope.$apply(function() {
            $location.path('/entry/' + d._id);
          });
        })
        .transition()
        .duration(500)
        .ease('bounce')
        .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.distance)); })
        .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.distance); });



      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
        .call(xAxis)
                .selectAll('text')
        .style('text-anchor', 'end')
        .attr('dx', '-.8em')
        .attr('dy', '.15em')
        .attr('transform', function() {
          return 'rotate(-90)';
        });

      svg.selectAll('.barLabel')
        .data(data)
        .enter().append('text')
        .attr('class', 'barLabel')
        .attr('x', function(d) { return x(getDate(d.date)) + barWidth / 2;})
        .attr('y', function(d) { return y(d.distance) + 12; })
        .attr('text-anchor', 'middle')
        .text(function(d) { return d.distance; })
        .attr('fill', 'white');




      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    };

    $(window).on('resize', function() {
      $('svg.chart').remove();
      makeGraph($scope.entries);
    });


  });