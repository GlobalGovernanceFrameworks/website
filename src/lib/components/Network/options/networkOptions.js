// src/lib/components/Network/options/networkOptions.js
// Options for configuring the vis-network visualizations

/**
 * Get network visualization options based on network type
 * @param {string} type - The type of network visualization
 * @returns {Object} - Configuration options for vis-network
 */
export function getNetworkOptions(type) {
  // Common options for all network types
  const commonOptions = {
    nodes: {
      shape: 'dot',
      size: 20,
      font: {
        size: 14,
        color: '#333333'
      },
      borderWidth: 2,
      shadow: true
    },
    edges: {
      width: 2,
      color: {
        color: '#848484',
        highlight: '#2B7CE9',
        hover: '#2B7CE9'
      },
      shadow: true,
      smooth: {
        type: 'continuous'
      },
      hoverWidth: 2
    },
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -5000,
        centralGravity: 0.1,
        springLength: 150,
        springConstant: 0.05,
        damping: 0.1
      },
      stabilization: {
        enabled: true,
        iterations: 1000,
        fit: true
      }
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      navigationButtons: true,
      keyboard: {
        enabled: true,
        bindToWindow: false
      },
      multiselect: false
    },
    layout: {
      improvedLayout: true
    }
  };
  
  // Type-specific options
  const typeSpecificOptions = {
    'formal-informal': {
      nodes: {
        color: {
          border: '#2B7CE9',
          background: '#97C2FC'
        }
      },
      groups: {
        1: { // Formal institutions
          color: {
            border: '#2C3E50',
            background: '#3498DB'
          },
          shape: 'dot'
        },
        2: { // Civil society organizations
          color: {
            border: '#27AE60',
            background: '#2ECC71'
          },
          shape: 'dot' 
        },
        3: { // Community initiatives
          color: {
            border: '#8E44AD',
            background: '#9B59B6'
          },
          shape: 'dot'
        },
        4: { // Other actors
          color: {
            border: '#7F8C8D',
            background: '#95A5A6'
          },
          shape: 'dot'
        }
      },
      layout: {
        hierarchical: {
          enabled: false
        }
      }
    },
    'resource-flow': {
      nodes: {
        color: {
          border: '#E67E22',
          background: '#F39C12'
        }
      },
      groups: {
        1: { // Donors
          color: {
            border: '#C0392B',
            background: '#E74C3C'
          },
          shape: 'dot'
        },
        2: { // Implementers
          color: {
            border: '#D35400',
            background: '#F39C12'
          },
          shape: 'dot'
        },
        3: { // Beneficiaries
          color: {
            border: '#16A085',
            background: '#1ABC9C'
          },
          shape: 'dot'
        },
        4: { // Other
          color: {
            border: '#7F8C8D',
            background: '#95A5A6'
          },
          shape: 'dot'
        }
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      },
      layout: {
        hierarchical: {
          enabled: true,
          direction: 'UD', // Up to down
          sortMethod: 'directed',
          nodeSpacing: 150
        }
      }
    },
    'influence': {
      nodes: {
        color: {
          border: '#2980B9',
          background: '#3498DB'
        }
      },
      groups: {
        1: { // Government actors
          color: {
            border: '#2980B9',
            background: '#3498DB'
          },
          shape: 'dot'
        },
        2: { // Non-state influencers
          color: {
            border: '#D35400',
            background: '#E67E22'
          },
          shape: 'dot'
        },
        3: { // International actors
          color: {
            border: '#8E44AD',
            background: '#9B59B6'
          },
          shape: 'dot'
        },
        4: { // Other stakeholders
          color: {
            border: '#7F8C8D',
            background: '#95A5A6'
          },
          shape: 'dot'
        }
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 0.5
          }
        }
      },
      physics: {
        barnesHut: {
          gravitationalConstant: -10000, // Stronger repulsion for influence networks
          centralGravity: 0.3,
          springLength: 200,
          springConstant: 0.04
        }
      }
    },
    'trust': {
      nodes: {
        color: {
          border: '#2980B9',
          background: '#3498DB'
        }
      },
      groups: {
        1: { // Group A
          color: {
            border: '#2980B9', 
            background: '#3498DB'
          },
          shape: 'dot'
        },
        2: { // Group B
          color: {
            border: '#C0392B',
            background: '#E74C3C'
          },
          shape: 'dot'
        },
        3: { // Mediators
          color: {
            border: '#27AE60',
            background: '#2ECC71'
          },
          shape: 'dot'
        },
        4: { // Other
          color: {
            border: '#7F8C8D',
            background: '#95A5A6'
          },
          shape: 'dot'
        }
      },
      edges: {
        color: {
          color: '#95A5A6',
          highlight: '#2B7CE9',
          hover: '#2B7CE9'
        },
        dashes: true
      },
      layout: {
        improvedLayout: true
      }
    }
  };
  
  // Merge common options with type-specific options
  const typeOptions = typeSpecificOptions[type] || typeSpecificOptions['formal-informal'];
  
  return mergeDeep(commonOptions, typeOptions);
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge into target
 * @returns {Object} - Merged object
 */
function mergeDeep(target, source) {
  const output = Object.assign({}, target);
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  
  return output;
}

/**
 * Check if value is an object
 * @param {*} item - Value to check
 * @returns {boolean} - True if object
 */
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}
