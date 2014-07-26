'use strict';

angular.module('logrunsApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, user) {

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
        console.log(entries);
        //var data = normalizeEntries(entries);
        makeGraph(entries);
      },
      error: function(error) {
        console.log(error);
      }
    });

    // var normalizeEntries = function(entries) {
    //   var data = [];
    //   $.each(entries, function(entry) {
    //     var d = moment(entry.date);

    //   })
    // }



    var makeGraph = function(data) {

var margin = {top: 20, right: 20, bottom: 50, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10, '%');

var svg = d3.select('body').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


  x.domain(data.map(function(d) { return moment(d.date).format('MM/DD'); }));
  y.domain([0, d3.max(data, function(d) { return d.distance; })]);

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) {
                return "rotate(-65)"
                });

  svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
    .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Distance');

  svg.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) { return x(moment(d.date).format('MM/DD')); })
      .attr('width', x.rangeBand())
      .attr('y', function(d) { return y(d.distance); })
      .attr('height', function(d) { return height - y(d.distance); });


    };



  });