var sys = require('sys');

var CROSSOVER_RATE = 0.7,
    MUTATION_RATE = 0.001,
    POP_SIZE = 500,
    GENE_LENGTH = 4,
    CHROMO_LENGTH = 300,
    MAX_ALLOWABLE_GENERATIONS = 400;

function randomBits(length, cb) {
    var bits = '';
    for (var i = 0; i < length; i++) {
        if (Math.random() > 0.5) {
            bits += '1';
        } else {
            bits += '0';
        }
    }

    cb(bits);
};

function parseBits(bits, cb) {
    var parsed = [];
    var previousDec;
    var bitLen = bits.length;
    for (var i = 0; i < bitLen; i++) {
        var gene = parseInt(bits.slice(0, GENE_LENGTH), 2);

        if (i > 0 && gene == 0 && parsed[i-1] == 13) {
            // fix divide by zero...changing to '+0' shouldn't affect the result.
            parsed[i-1] = 10;
        }
        if ((gene > 9 && gene < 14) || (gene < 10)) {
            parsed.push(gene);
        }
    }
    cb(parsed);
};

function assignFitness(bits, target, cb) {
    parseBits(bits, function(genes) {
        var result = 0;
        var len = genes.length;
        for (var i = 0; i < len; i++) {
            var gene = genes[i];
            if (i === 0 && gene < 9) {
                result = gene;
            } else if (gene === 10) {
                result += genes[++i];
            } else if (gene === 11) {
                result -= genes[++i];
            } else if (gene === 12) {
                result *= genes[++i];
            } else if (gene === 13) {
                result /= genes[++i];
            }
        }

        if (result === target) {
            cb(999);
        } else {
            cb(1/Math.abs(target - result));
        }
    });
};

function printChromo(bits) {
    parseBits(bits, function(genes) {
        var len = genes.length;
        for (var i = 0; i < len; i++) {
            var gene = genes[i];
            if (gene === 10) {
                genes[i] = '+';
            } else if (gene === 11) {
                genes[i] = '-';
            } else if (gene === 12) {
                genes[i] = '*';
            } else if (gene === 13) {
                genes[i] = '/';
            }
        }

        sys.debug(genes.join(' '));
    });
};

function mutate(bits, cb) {
    var len = bits.length;
    for (var i = 0; i < len; i++) {
        if (Math.random() < MUTATION_RATE) {
            if (bits[i] === '1') {
                bits[i] = '0';
            } else {
                bits[i] = '1';
            }
        }
    }

    cb(bits);
};

function crossover(bits1, bits2, cb) {
    if (Math.random() < CROSSOVER_RATE) {
        var pt = Math.random() * bits1.length;
        var newbits1 = [bits1.substring(0, pt),bits2.substring(pt)].join('');
        var newbits2 = [bits2.substring(0, pt),bits1.substring(pt)].join('');
        bits1 = newbits1;
        bits2 = newbits2;
    }
    cb(bits1, bits2);
};

// roulette wheel selection scheme
function roulette(total_fitness, pop, cb) {
    cb(pickOff(total_fitness, pop), pickOff(total_fitness, pop));
};

function pickOff(total_fitness, population) {
    var slice = Math.random() * total_fitness;
    var fitness = 0;
    var len = population.length;
    for (var i = 0; i < len; i++) {
        var off = population[i];
        if (off) {
            fitness += off.fitness;
            if (fitness >= slice) {
                return off;
            }
        }
    }
    return {bits:''};
};

function firstPopulation(cb) {
    var population = [];
    for (var i = 0; i < POP_SIZE; i++) {
        randomBits(CHROMO_LENGTH, function(bits) {
            population.push({
                bits: bits,
                fitness: 0
            });
        });
    }

    cb(population);
};

function genPopulation(total_fitness, population, cb) {
    var newPopulation = [];
    var len = population.length;
    for (var i = 0; i < len; i+=2) {
        //althought uses callbacks, still synchronous
        roulette(total_fitness, population, function(off1, off2) {
            crossover(off1.bits, off2.bits, function(bits1, bits2) {
                mutate(bits1, function(newBits1) {
                    newPopulation.push({
                        bits: newBits1,
                        fitness: 0
                    });
                });
                mutate(bits2, function(newBits2) {
                    newPopulation.push({
                        bits: newBits2,
                        fitness: 0
                    });
                });
            });
        });
    }

    cb(newPopulation);
};

var target = process.argv[2];

firstPopulation(
    function(population) {
        var generationCount = 0;
        var solutionFound = false;

        while(!solutionFound) {
            sys.puts('generationCount: ' + generationCount);
            var total_fitness = 0;

            for(var i = 0; i < POP_SIZE; i++) {
                var off = population[i];
                if (off.fitness === 999) {
                    sys.puts('Solution found in ' + generationCount + ' generations.');
                    sys.puts('off: ' + sys.inspect(off));
                    solutionFound = true;
                    break;
                }
                assignFitness(new Buffer(off.bits), target, function(fitness) {
                    off.fitness = fitness;
                    total_fitness += off.fitness;
                    population[i] = off;
                });
            }

            if (solutionFound) break;

            genPopulation(total_fitness, population, function(newPopulation) {
                population = newPopulation;
            });

            // need some stopping point
            if (++generationCount > MAX_ALLOWABLE_GENERATIONS) {
                sys.puts('No solution found');
                break;
            }
        }
    });
