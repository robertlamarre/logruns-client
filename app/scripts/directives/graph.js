'use strict';

angular.module('logrunsApp')
  .directive('graph', function(user) {
    return {
      restrict: 'E',
      templateUrl: '../../views/templates/graph-template.html',
      controller: function($rootScope, $scope) {
        $rootScope.$watch('user.local', function(newVal, oldVal) {
          if (!$rootScope.user) { return; }
          if (_.isEqual(newVal, oldVal)) { return; }
          loadGraph();
        }, true);

        function loadGraph() {
          user.getEntries({
            startDate: moment().subtract('days',7).toISOString(),
            endDate: moment().toISOString(),
            username: $rootScope.user.local.username,
            success: function(data) {
              data = organizeData(data);
              makeGraph(data);
            }
          });
        }

        $scope.$on('$routeChangeStart', loadGraph);


        function organizeData(data) {
          console.log(data);
          var newData = [];
          var currDay = moment().startOf('day').subtract('days', 6);
          var pushed = false;
          function pushDate(val) {
            var mDate = moment(val.date).endOf('day');
            if (currDay.diff(mDate, 'minutes') === 0) {
              newData.push({
                x: i,
                y: val.distance
              });
              pushed = true;
            }
          }
          for (var i = 0; i < 7; ++i) {
            _.each(data, pushDate);
            if (!pushed) {
              newData.push({
                x: i,
                y: 0
              });
              pushed = false;
            }
            currDay = currDay.add('days', 1);
          }
          console.log(newData);
          return newData;

        }


        function makeGraph(data) {
          var n = 1; // number of layers
          var m = 7; // number of samples per layer
          var stack = d3.layout.stack();
          var layers = stack(d3.range(n).map(function() { return data; }));
          var yStackMax = d3.max(layers, function(layer) { return d3.max(layer, function(d) { return d.y0 + d.y; }); });

          var margin = {top: 5, right: 5, bottom: 5, left: 5},
          width = 240 - margin.left - margin.right,
          height = 120 - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangeRoundBands([0, width], 0.08);

          var y = d3.scale.linear()
            .domain([0, yStackMax])
            .range([height, 0]);

          var color = d3.scale.linear()
            .domain([0, n - 1])
            .range(['#00b8f1', '#556']);

          var ticks = ['M', 'T', 'W', 'R', 'F', 'S', 'U'];
          var newTicks = [];
          var dayIndex = moment().day();
          for (var i = dayIndex; i < 7 + dayIndex; ++i) {
            newTicks.push(ticks[i % 7]);
          }

          var xAxis = d3.svg.axis()
            .scale(x)
            .tickSize(0)
            .tickPadding(6)
            .tickFormat(function(d) {
              return ticks[(d + dayIndex) % 7];
            })
            .orient('top');

          d3.select('#graph svg').remove();
          var svg = d3.select('#graph').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

          var layer = svg.selectAll('.layer')
            .data(layers)
            .enter().append('g')
            .attr('class', 'layer')
            .style('fill', function(d, i) { return color(i); });

          layer.selectAll('rect')
            .data(function(d) { return d; })
            .enter().append('rect')
            .attr('x', function(d) { return x(d.x); })
            .attr('y', function(d) { return y(d.y0 + d.y); })
            .attr('width', x.rangeBand())
            .attr('height', function(d) { return y(d.y0) - y(d.y0 + d.y);});

          svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis);
        }
        
      }
    };
  });