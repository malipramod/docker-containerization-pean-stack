var app = angular.module("parkinglotApp", []);
app.constant("APIURL","http://localhost:3000/api/dataService/");

app.controller("parkinglotController", function ($http) {
    var graphData = {
        name: "parking-lot-graph",
        children: []
    };
    function showGraph() {
        var svg = d3.select("svg"),
            margin = 20,
            diameter = +svg.attr("width"),
            g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        var color = d3.scaleLinear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.pack()
            .size([diameter - margin, diameter - margin])
            .padding(2);

        d3.json("../data/data.json", function (error, root) {
            if (error) throw error;

            root = d3.hierarchy(root)
                .sum(function (d) { return d.size; })
                .sort(function (a, b) { return b.value - a.value; });

            var focus = root,
                nodes = pack(root).descendants(),
                view;

            var circle = g.selectAll("circle")
                .data(nodes)
                .enter().append("circle")
                .attr("class", function (d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
                .style("fill", function (d) { return d.children ? color(d.depth) : null; })
                .on("click", function (d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

            var text = g.selectAll("text")
                .data(nodes)
                .enter().append("text")
                .attr("class", "label")
                .style("fill-opacity", function (d) { return d.parent === root ? 1 : 0; })
                .style("display", function (d) { return d.parent === root ? "inline" : "none"; })
                .text(function (d) { return d.data.name; });

            var node = g.selectAll("circle,text");

            svg
                .style("background", color(-1))
                .on("click", function () { zoom(root); });

            zoomTo([root.x, root.y, root.r * 2 + margin]);

            function zoom(d) {
                var focus0 = focus; focus = d;

                var transition = d3.transition()
                    .duration(d3.event.altKey ? 7500 : 750)
                    .tween("zoom", function (d) {
                        var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                        return function (t) { zoomTo(i(t)); };
                    });

                transition.selectAll("text")
                    .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
                    .style("fill-opacity", function (d) { return d.parent === focus ? 1 : 0; })
                    .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
                    .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
            }

            function zoomTo(v) {
                var k = diameter / v[2]; view = v;
                node.attr("transform", function (d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
                circle.attr("r", function (d) { return d.r * k; });
            }
        });
    }

    function getData() {
        let body = {
            "table": "shipments_data",
            "fields": [
                "shipment_id",
                "source_id",
                "destination_id",
                "date",
                "weight",
                "cost",
                "new_shipment_id",
                "new_weight",
                "new_cost",
                "total_tls"
            ]
        };
        var res = $http.post('http://localhost:3000/api/dataService/getdata', body);
        res.then(function (response) {
            prepareGraphData(response.data.data);
        }, function (err) {
            console.log("failure message: " + JSON.stringify({ data: err }));
        });
    }

    function storeData(fileContent){
        var res = $http.post('http://localhost:3000/api/fileService/updateJson', fileContent);
        res.then(function (response) {
            showGraph();
        }, function (err) {
            console.log("failure message: " + JSON.stringify({ data: err }));
        });
    }

    function prepareGraphData(data) {
        for (let i = 0; i < data.length; i++) {
            //If Master doesn't contains any children
            if (graphData.children.length === 0) {
                graphData.children.push({
                    name: `${data[i].source_id}`,
                    value:data[i].source_id,
                    children: [
                        {
                            name: `${data[i].new_cost}`,
                            value:data[i].new_shipment_id,
                            children: [
                                {
                                    size: parseInt(data[i].weight),
                                    name: `${data[i].cost}`,
                                    value: data[i].shipment_id
                                }
                            ]
                        }
                    ]
                });
            } else {
                //If Master contains data, loop through it's children
                for (let j = 0; j < graphData.children.length; j++) {
                    // if Master contains same key
                    if (graphData.children[j].value === data[i].source_id) {
                        //loop through parent
                        for (let k = 0; k < graphData.children[j].children.length; k++) {
                            //If parent has the same key
                            if (graphData.children[j].children[k].value === data[i].new_shipment_id) {
                                graphData.children[j].children[k].children.push(
                                    { 
                                        name: `${data[i].cost}`, 
                                        value: data[i].shipment_id,                                         
                                        "size": parseInt(data[i].weight) 
                                    }
                                );
                                break;
                            } else if((graphData.children[j].children[k].value !== data[i].new_shipment_id &&
                                !graphData.children[j].children.some(ele => ele.value === data[i].new_shipment_id))) {
                                //if Parent doesn't exist, push new parent data
                                    graphData.children[j].children.push({
                                        name: `${data[i].new_cost}`,
                                        value: data[i].new_shipment_id,
                                        children: [
                                            {
                                                size: parseInt(data[i].weight),
                                                name: `${data[i].cost}`,
                                                value: data[i].shipment_id
                                            }
                                        ]
                                    });
                                break;
                            }
                        }
                    } else {
                        //If Master contains children but new data is different than all
                        graphData.children.push({
                            value: data[i].source_id,
                            name: `${data[i].source_id}`,
                            children: [
                                {
                                    name: `${data[i].new_cost}`,
                                    value: data[i].new_shipment_id,
                                    children: [
                                        {
                                            size: parseInt(data[i].weight),
                                            name: `${data[i].shipment_id}`,
                                            value: data[i].shipment_id
                                        }
                                    ]
                                }
                            ]
                        })
                    }

                }
            }
        }
        storeData(graphData);
    }

    getData();

});