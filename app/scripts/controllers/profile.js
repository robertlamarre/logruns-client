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

      // var margin = {top: 20, right: 50, bottom: 50, left: 50};
      // var width = $(window).width() * .8 - margin.left - margin.right;
      // var height = $(window).height() * .5 - margin.top - margin.bottom;

      // var x = d3.scale.ordinal()
      //     .rangeRoundBands([0, width], .1);

      // var y = d3.scale.linear()
      //     .range([height, 0]);

      // var xAxis = d3.svg.axis()
      //     .scale(x)
      //     .orient('bottom');

      // var yAxis = d3.svg.axis()
      //     .scale(y)
      //     .orient('left')
      //     .ticks(10);

      // $('.chart').width(width);

      // var svg = d3.select('.chart').append('svg')
      //   .attr('width', width + margin.left + margin.right)
      //   .attr('height', height + margin.top + margin.bottom)
      //   .append('g')
      //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


      // x.domain(data.map(function(d) { return moment(d.date).format('MM/DD'); }));
      // y.domain([0, d3.max(data, function(d) { return d.distance; })]);

      // svg.append('g')
      //   .attr('class', 'x axis')
      //   .attr('transform', 'translate(0,' + height + ')')
      //   .call(xAxis)
      //   .selectAll("text")
      //   .style("text-anchor", "end")
      //   .attr("dx", "-.8em")
      //   .attr("dy", ".15em")
      //   .attr("transform", function(d) {
      //     return "rotate(-65)";
      //   });

      // svg.append('g')
      //   .attr('class', 'y axis')
      //   .call(yAxis)
      //   .append('text')
      //   .attr('transform', 'rotate(-90)')
      //   .attr('y', 6)
      //   .attr('dy', '.71em')
      //   .style('text-anchor', 'end')
      //   .text('Distance');

      // svg.selectAll('.bar')
      //   .data(data)
      //   .enter().append('rect')
      //   .attr('class', 'bar')
      //   .attr('x', function(d) { return x(moment(d.date).format('MM/DD')); })
      //   .attr('width', x.rangeBand())
      //   .attr('y', function(d) { return y(d.distance); })
      //   .attr('height', function(d) { return height - y(d.distance); });


      // svg.selectAll('.barLabel')
      //   .data(data)
      //   .enter().append('text')
      //   .attr('class', 'barLabel')
      //   .attr('x', function(d) { return x(moment(d.date).format('MM/DD')) + x.rangeBand() / 2; })
      //   .attr('y', function(d) { return y(d.distance) + 12; })
      //   .attr('text-anchor', 'middle')
      //   .text(function(d) { return d.distance; })
      //   .attr('fill', 'white');


////////////////////////////////////////////

      var margin = {top: 40, right: 40, bottom: 50, left:40},
      width = $(window).width() * .9,
      height = $(window).height() * .8;

      var x = d3.time.scale()
        .domain([d3.min(data, function(d) { return new Date(d.date);}), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
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
        .attr('x', function(d) { return x(new Date(d.date)); })
        .attr('y', height - margin.bottom - margin.top)
        .attr('width', barWidth)
        .attr('height', 0)
        .transition()
        .duration(500)
        .ease('bounce')
        .attr('y', function(d) { return height - margin.top - margin.bottom - (height - margin.top - margin.bottom - y(d.distance)) })
        .attr('height', function(d) { return height - margin.top - margin.bottom - y(d.distance) })


      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
        .call(xAxis)
                .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function(d) {
          return "rotate(-90)";
        });




      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
    };


  });