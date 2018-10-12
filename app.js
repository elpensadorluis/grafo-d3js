lines = `
╔═══════════════════════════════════════════════╗
║ ███████╗███████╗███╗   ██╗████████╗██╗   ██╗  ║
║ ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██║   ██║  ║
║ ███████╗█████╗  ██╔██╗ ██║   ██║   ██║   ██║  ║
║ ╚════██║██╔══╝  ██║╚██╗██║   ██║   ██║   ██║  ║
║ ███████║███████╗██║ ╚████║   ██║   ╚██████╔╝  ║
║ ╚══════╝╚══════╝╚═╝  ╚═══╝   ╚═╝    ╚═════╝   ║
╚═════════════════════════════ Luis Echenique ══╝`;
console.log(lines);
// var width = window.innerWidth,
//     height = window.innerHeight - 20;

// var tree = d3.layout.tree()
//     .size([width - (20 * 2), height - (20 * 2)]);

// var root = {};
// root.parent = root;
// root.px = root.x;
// root.py = root.y;
// root.valor = 12;
// root.listo = 0;
// root.id = 0;
// root.color = "rgb(14, 116, 199)";
// root.restado = 0;

// var contador = 0;
// var jo = 0;
// var tictac = 1;
// var imprimir = 0;

// var nodes = tree(root),
//     base = 1,
//     matriz = [11, 9, 6, 1];


// var diagonal = d3.svg.diagonal();

// // var svg = d3.select("body").select("svg")
// //     .attr("width", width)
// //     .attr("height", height);

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(20,20)");

// var node = svg.selectAll(".node"),
//     link = svg.selectAll(".link"),
//     ltext = svg.selectAll(".ltext"),
//     text = svg.selectAll(".text");


console.log("inicia el análisis...");
var duration = 400,
    timer = setInterval(update, duration);



function update() {

    if (nodes[jo].valor - matriz[contador] >= 0) {

        if (tictac <= 0) {
            console.log("Análisis Completado Exitosamente...");
            return clearInterval(timer);
        }

        // Agrega un nuevo nodo a un pariente aleatorio.
        var n = {
                id: nodes.length,
                valor: nodes[jo].valor - matriz[contador],
                listo: 0,
                restado: matriz[contador],
                color: "rgb(14, 116, 199)"
            },
            p = nodes[jo];
        if (nodes[jo].valor - matriz[contador] <= 0) {
            n.listo = 1;
            n.color = "rgb(255, 0, 0)";

            tictac--;

        }

        if (p.children) {
            p.children.push(n);

        } else p.children = [n];
        nodes.push(n);
        tictac++;

        //Recalcula el layaout y datos de unión.
        node = node.data(tree.nodes(root), function (d) {
            return d.id;
        });

        text = text.data(tree.nodes(root), function (d) {
            return d.id;
        });

        link = link.data(tree.links(nodes), function (d) {
            return d.source.id + "-" + d.target.id;
        });

        ltext = ltext.data(tree.links(nodes), function (d) {
            return d.source.id + "-" + d.target.id;
        });

        // Agrega un nodo entero en el pariente de la vieja posición.
        node.enter().append("circle")
            .attr("class", "node")
            .attr("r", 10)
            .attr("cx", function (d) {
                return d.parent.px;
            })
            .style("stroke", function (d) {
                return d.color;
            })
            .attr("cy", function (d) {
                return d.parent.py;
            });
        //Prueba de introduccion de texto
        text.enter().append("text")
            .attr("class", "text")
            .attr("y", function (d) {
                return d.parent.py + 2;
            })
            .attr("x", function (d) {
                return d.parent.px;
            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                return imprimirNodo(d);
            });


        // Agrega una entera conexión en el pariente con la vieja posición.
        link.enter().insert("path", ".node")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {
                    x: d.source.px,
                    y: d.source.py
                };
                return diagonal({
                    source: o,
                    target: o
                });
            });


        // Agrega texto al comienzo de la conexión
        link.enter().insert("text")
            .attr("class", "ltext")
            .attr("font-family", "Arial, Helvetica, sans-serif")
            .attr("fill", "Red")
            .style("font", "normal 12px Arial")



            .attr("x", function (d) {
                return d.source.x;
            })
            .attr("y", function (d) {
                return d.source.y;
            })
            .attr("dy", ".35em")
            .attr('startOffset', '50%')

            .attr('xlink:href', function (d) {
                return '#' + d.target.id;
            })
            .text(function (d) {
                return "-" + d.target.restado;
            });

        // Transición de nodos y links a su nueva posición.
        var t = svg.transition()
            .duration(duration);

        t.selectAll(".link")
            .attr("d", diagonal);

        t.selectAll(".ltext")
            .attr("x", function (d) {
                return (d.source.x + d.target.x) / 2;
            })
            .attr("y", function (d) {
                return (d.source.y + d.target.y) / 2;
            })
            .attr("dy", ".35em")
            .attr('startOffset', '50%')

            .attr('xlink:href', function (d) {
                return '#' + d.target.id;
            })
            .text(function (d) {
                return "-" + d.target.restado;
            });

        t.selectAll(".node")
            .attr("cx", function (d) {
                return d.px = d.x;
            })

            .attr("cy", function (d) {
                return d.py = d.y;
            })
            .style("stroke", function (d) {
                return d.color;
            });

        t.selectAll(".text")
            .attr("x", function (d) {
                return d.px = d.x;
            })
            .text(function (d) {
                return imprimirNodo(d);
            })
            .attr("y", function (d) {
                return d.py = d.y + 3;
            });

    }
    if (contador > matriz.length - 2) {
        nodes[jo].listo = 1;
        tictac--;
        if (tictac <= 0) {
            console.log("Análisis Completado Exitosamente...");
            return clearInterval(timer);
        }
        jo = 0;

        while (nodes[jo].listo == 1) {
            if (tictac < 4) {
                jo++;
            } else {
                jo = Math.floor(Math.random() * nodes.length);
            }
        }
        contador = 0;
    } else {
        contador++;
    }
}

function imprimirNodo(d) {
    if (imprimir == 0) {
        return d.valor;

    } else if (imprimir == 1) {
        return d.listo;

    } else if (imprimir == 2) {
        return d.id + 1;
    } else {
        return d.depth + 1;
    }
}

function imprimirlink(d) {
    return "translate(" +
        d.source.x + "," +
        d.source.y + ")";

}