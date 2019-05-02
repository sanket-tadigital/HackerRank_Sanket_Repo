var VALUE = 0;
var LEFT = 1;
var RIGHT = 2;
var UP = 3;
var COLOR = 4;
var WIDTH = 5;

var RED = 0;
var BLACK = 1;

var MIN_SIZE = 4;

var RBTree = function(cmp) {
    // optionally takes a compare function for sorting
    if (cmp === undefined) {
	cmp = function(a, b) {
	    if (a < b) {
		return -1;
	    }
	    if (a > b) {
		return 1;
	    }
	    return 0;
	};
    }
    
    this.cmp = cmp;
    this.nodes = [];
    this.size = 0; // total used and unused nodes
    this.next = null; //head of linked list of unused nodes
    this.count = 0; // number of used nodes
    this.root = null //the root index node
};

RBTree.prototype.resize = function(new_size) {
    if (new_size > this.size) {
	var min_i = this.nodes.length;
	var i = new_size * WIDTH;
	var next = this.next;
	this.nodes.length = i;	
	while (i > min_i) {
	    i -= WIDTH;
	    // initialize node i as unused
	    this.nodes[i] = next;
	    next = i;
	}
	this.next = next;
	this.size = new_size;
    } else {
	// TODO can we safely shrink the node array?
	// Probably, by swapping unused nodes near the end for used nodes in the tail
    }
}

RBTree.prototype.insert = function(x) {
    // make room for this node
    if (this.count >= this.size) {
	if (this.size < MIN_SIZE ) {
	    this.resize(MIN_SIZE);
	} else {
	    this.resize(this.size*2);
	}
    }
    // use the next unused node
    var idx = this.next;
    this.next = this.nodes[idx];
    this.nodes[idx+VALUE] = x;
    this.nodes[idx+LEFT] = null;
    this.nodes[idx+RIGHT] = null;
    this.nodes[idx+COLOR] = RED;
    this.count++;

    if (this.root === null) {
	// this node is the first in the tree
	this.nodes[idx+UP] = null;
	this.root = idx;
    } else {
	var parent = this.root;
	// find the natural parent of this node
	while (true) {
	    if (this.cmp(x,this.nodes[parent+VALUE]) < 0) {
		// x is to the left of this node
		var leaf = this.nodes[parent+LEFT];
		if (leaf == null) {
		    // we found it!
		    this.nodes[parent+LEFT] = idx;
		    this.nodes[idx+UP] = parent;
		    break;
		} else {
		    parent = leaf;
		}
	    } else {
		// x is to the right of this node
		var leaf = this.nodes[parent+RIGHT];
		if (leaf == null) {
                    // we found it!
                    this.nodes[parent+RIGHT] = idx;
                    this.nodes[idx+UP] = parent;
                    break;
                } else {
                    parent = leaf;
		}
	    }
	}
    }
    // the tree is good except that the coloring may be off near idx
    this.fix_coloring_near(idx);
};

RBTree.prototype.fix_coloring_near = function(idx) {
    // only called on red nodes
    var parent = this.nodes[idx+UP];
    if (parent == null) {
	//root node
	this.nodes[idx+COLOR] = BLACK;
    } else if (this.nodes[parent+COLOR] == RED) {
	// something has to change!
	var gramps = this.nodes[parent+UP];
	var uncle  = gramps;
	var g_dir;
	if (this.nodes[gramps+LEFT] == parent) {
	    g_dir = LEFT;
	    uncle = this.nodes[gramps+RIGHT];
	} else {
	    g_dir = RIGHT;
	    uncle = this.nodes[gramps+LEFT];
	}
	var uncle_color = BLACK;
	if (uncle !== null) {
	    uncle_color = this.nodes[uncle+COLOR];
	}
	if (uncle_color == RED) {
	    // we can try to repaint our way out of this!
	    this.nodes[uncle+COLOR] = BLACK;
	    this.nodes[parent+COLOR] = BLACK;
	    this.nodes[gramps+COLOR] = RED;
	    this.fix_coloring_near(gramps);
	} else {
	    // we've got a red parent and a black uncle
	    // do we need to pre-rotate?
	    if (this.nodes[parent+g_dir] !== idx) {
		// we need to pre-rotate!
		var p_dir = LEFT+RIGHT-g_dir;
		var child = this.nodes[idx+g_dir];
		this.nodes[parent+p_dir] = child;
		if (child !== null) {
		    this.nodes[child+UP] = parent;
		}

		this.nodes[idx+g_dir] = parent;
		this.nodes[parent+UP] = idx;
		
		this.nodes[gramps+g_dir] = idx;
		this.nodes[idx+UP] = gramps;
		// swap parent and idx
		idx = parent;
		parent = this.nodes[parent+UP];
	    }
	    // now we paint and rotate for the last time
	    this.nodes[gramps+COLOR] = RED;
	    this.nodes[parent+COLOR] = BLACK;
	    var c_dir = LEFT+RIGHT-g_dir;
	    var child = this.nodes[parent+c_dir];
	    this.nodes[gramps+g_dir] = child;
	    if (child !== null) {
		this.nodes[child+UP] = gramps;
	    }

	    var ggramps = this.nodes[gramps+UP];
	    if (ggramps === null) {
		this.nodes[parent+UP] = null;
		// new root!
		this.root = parent;
	    } else {
		if (this.nodes[ggramps+LEFT] === gramps) {
		    this.nodes[ggramps+LEFT] = parent;
		} else {
		    this.nodes[ggramps+RIGHT] = parent;
		}
		this.nodes[parent+UP] = ggramps;
	    }

	    this.nodes[parent+c_dir] = gramps;
	    this.nodes[gramps+UP] = parent;
	}
    }
};

RBTree.prototype.remove = function(idx) {
    // remove the node at idx from the tree
    // swap values if both children are non-leaves
    if (this.nodes[idx+LEFT] !== null && this.nodes[idx+RIGHT] !== null) {
	// find the next node to the right
	var single_parent = this.nodes[idx+RIGHT];
	while (this.nodes[single_parent+LEFT] !== null) {
	    single_parent = this.nodes[single_parent+LEFT];
	}
	// copy the single parent's value to idx
	this.nodes[idx+VALUE] = this.nodes[single_parent+VALUE];
	// now we want to delete the single parent
	idx = single_parent;
    }
    var parent = this.nodes[idx+UP];
    if (this.nodes[idx+COLOR] === RED) {
	// we can simply replace this node with one of its leaf children
	if (this.nodes[parent+LEFT] === idx) {
	    this.nodes[parent+LEFT] = null;
	} else {
	    this.nodes[parent+RIGHT] = null;
	}
    } else {
	var child = this.nodes[idx+LEFT];
	if (child === null) {
	    child = this.nodes[idx+RIGHT];
	}
	if (child !== null) {
	    // the only child must be red with two leaves
	    this.nodes[child+COLOR] = BLACK;
	    if (parent === null) {
		// the child is the new root!
		this.nodes[child+UP] = null;
		this.root = child;
	    } else {
		if (this.nodes[parent+LEFT] === idx) {
		    this.nodes[parent+LEFT] = child;
		} else {
		    this.nodes[parent+RIGHT] = child;
		}
		this.nodes[child+UP] = parent;
	    }
	} else {
	    // we're deleting a childless node
	    if (parent === null) {
		// which was root.
		// so now the tree is empty
		this.root = null;
	    } else {
		// which is going to make its branch of the tree too short
		if (this.nodes[parent+LEFT] === idx) {
		    this.nodes[parent+LEFT] = null;
		    this.fix_short_branch(parent, LEFT);
		} else {
		    this.nodes[parent+RIGHT] = null;
		    this.fix_short_branch(parent, RIGHT);
		}
	    }
	}
    }
    // free idx
    this.nodes[idx] = this.next;
    this.next = idx;
    this.count--;
};

RBTree.prototype.fix_short_branch = function(idx, short_dir) {
    //idx is the parent of a subtree where the black topped short branch is one depth shorter than the other branch.
    var long_dir = LEFT+RIGHT-short_dir;
    var short_child = this.nodes[idx+short_dir];
    var long_child = this.nodes[idx+long_dir];
    if (this.nodes[long_child+COLOR] === RED) {
	// paint and rotate such that the long sibling is black before proceeding
	this.nodes[long_child+COLOR] = BLACK;
	this.nodes[idx+COLOR] = RED;
	var kid = this.nodes[long_child+short_dir];
	var gramps = this.nodes[idx+UP];
	if (gramps === null) {
	    // idx was root!
	    this.root = long_child;
	} else {
	    if (this.nodes[gramps+LEFT] === idx) {
		this.nodes[gramps+LEFT] = long_child;
	    } else {
		this.nodes[gramps+RIGHT] = long_child;
	    }
	}
	this.nodes[long_child+UP] = gramps;
	
	this.nodes[long_child+short_dir] = idx;
	this.nodes[idx+UP] = long_child;

	this.nodes[idx+long_dir] = kid;
	this.nodes[kid+UP] = idx;
	long_child = kid;
    }
    // now both branches are black topped
    var long_long = this.nodes[long_child+long_dir];
    var long_short = this.nodes[long_child+short_dir];
    var long_long_color = BLACK;
    if (long_long !== null && this.nodes[long_long+COLOR] === RED) {
	long_long_color = RED;
    }
    var long_short_color = BLACK;
    if (long_short !== null && this.nodes[long_short+COLOR] === RED) {
	long_short_color = RED;
    }
    if (this.nodes[idx+COLOR] === BLACK && long_long_color === BLACK && long_short_color === BLACK) {
	// we can shorten the long side by painting the long child red
	this.nodes[long_child+COLOR] = RED;
        var gramps = this.nodes[idx+UP];
        if (gramps === null) {
            // idx was root! We shortened the whole tree
        } else {
	    // recurse!
            if (this.nodes[gramps+LEFT] === idx) {
		this.fix_short_branch(gramps,LEFT);
            } else {
		this.fix_short_branch(gramps,RIGHT);
            }
	}
    } else if (this.nodes[idx+COLOR] === RED && long_long_color === BLACK && long_short_color === BLACK) {
	// we can lengthen the short side by repainting
	this.nodes[long_child+COLOR] = RED;
	this.nodes[idx+COLOR] = BLACK;
    } else {
	// we've got at least one red child on the long side
	// rotate it to the long long side if necessary
	if (long_long_color === BLACK) {
	    //paint and rotate!
	    this.nodes[long_child+COLOR] = RED;
	    this.nodes[long_short+COLOR] = BLACK;
	    
	    var kid = this.nodes[long_short+long_dir];
	    if (kid === null) {
		this.nodes[long_child+short_dir] = null;
	    } else {
		this.nodes[long_child+short_dir] = kid;
		this.nodes[kid+UP] = long_child;
	    }
	    
	    this.nodes[long_short+long_dir] = long_child;
	    this.nodes[long_child+UP] = long_short;

	    this.nodes[idx+long_dir] = long_short;
	    this.nodes[long_short+UP] = idx;
	    //reset convenience variables
	    long_long = long_child;
	    long_child = long_short;
	}
	// now the long long child is red
	// the long child and the short child are black
	// repaint and rotate to lengthen short side
	this.nodes[long_child+COLOR] = this.nodes[idx+COLOR];
	this.nodes[idx+COLOR] = BLACK;
	this.nodes[long_long+COLOR] = BLACK;

	var gramps = this.nodes[idx+UP];
	var kid = this.nodes[long_child+short_dir];
        if (gramps === null) {
            // idx was root!
            this.root = long_child;
        } else {
            if (this.nodes[gramps+LEFT] === idx) {
                this.nodes[gramps+LEFT] = long_child;
            } else {
                this.nodes[gramps+RIGHT] = long_child;
            }
        }
        this.nodes[long_child+UP] = gramps;

        this.nodes[long_child+short_dir] = idx;
        this.nodes[idx+UP] = long_child;

	if (kid === null) {
	    this.nodes[idx+long_dir] = null;
	} else {
	    this.nodes[idx+long_dir] = kid;
	    this.nodes[kid+UP] = idx;
	}
    }
};

RBTree.prototype.pop_min_over_x = function(x) {
    // find the smallest node grater than x
    var best_idx = null;
    var best_value;
    var idx = this.root;
    while (idx !== null) {
	var value = this.nodes[idx+VALUE];
	if (this.cmp(value,x) > 0) {
	    // we got one!
	    best_idx = idx;
	    best_value = value;
	    // also consider smaller ones
	    idx = this.nodes[idx+LEFT];
	} else {
	    // this node is too small!
	    // consider bigger ones
	    idx = this.nodes[idx+RIGHT];
	}
    }
    if (best_idx !== null) {
	this.remove(best_idx);
    }
    return best_value;
}

var offset = 20000000000;
function processData(input) {
    //Enter your code here
    var lines = input.split('\n');
    var n = Number(lines.shift());
    //var nodes = lines.shift().split(' ').map(x=>(Number(x)+offset).toString());
    var nodes = lines.shift().split(' ');
    //console.error(n);
    //console.error(nodes);

    
    var counts = nodes.reduce((acc,i) => {
        if (acc[i] === undefined ) {
            acc[i] = 1;
        } else {
            acc[i]++;
        }
        return acc;
    },{});
    
    var levels = {};
    var max_level = 0;
    var uniq_count = 0;
    for (var a in counts) {
        if (counts.hasOwnProperty(a)) {
            let level = counts[a];
            if (levels[level] === undefined) {
                levels[level] = new RBTree();
                //levels[level].insert(a);
                levels[level].insert(Number(a));
            } else {
                //levels[level].insert(a);
                levels[level].insert(Number(a));
            }
            uniq_count++;
            if (max_level < level) {
                max_level = level;
            }
        }
    }

    //console.error(levels);
    var level = max_level;
    // uniq_count = 0;
    if (uniq_count == n && Math.pow(2,level-1) == n && nodes.length == (2*n-1)) {
        var tree = new Array(nodes.length);
        var good = true;
        var cur_level = levels[level];
        tree[0] = cur_level.nodes[cur_level.root+VALUE];
        counts[tree[0]]--;
        var p = 0;
        var i = 1;
        while (i<nodes.length) {
            //add an old node and a new one!
            var parent = tree[p];
            p++;
            if (level > counts[parent]) {
                level = counts[parent];
                cur_level = levels[level];
                //num_sort(cur_level);
                //cur_level.sort();
                //cur_level.sort((a,b) => a-b );
                //console.error(level, levels, cur_level);
            }
            
            tree[i] = parent;
            counts[parent]--;
            i++;
            
            // find the smallest node at this level > parent
            var val = cur_level.pop_min_over_x(parent);
            if (val === undefined) {
                good = false;
                break;
            } else {
                tree[i] = val;
                counts[val]--;
                i++;
            }
        }
        if (good) {
            console.log('YES');
            //console.log(tree.map(a=>(Number(a)-offset),toString()).join(' '));
            console.log(tree.join(' '));
        } else {
            console.log('NO');        
        }
    } else {
        console.log('NO');        
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});