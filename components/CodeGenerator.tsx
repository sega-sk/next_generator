'use client'
import { useState } from 'react'
import { Copy, Download, FileCode } from 'lucide-react'

interface Config {
  apiUrl: string
  method: string
  displayType: string
  itemsPerView: number
  fields: Array<{ key: string; label: string; type: string }>
}

export default function CodeGenerator({ config }: { config: Config }) {
  const [copied, setCopied] = useState(false)
  const [activeCode, setActiveCode] = useState('shortcode')

  const generateShortcode = () => {
    const fields = config.fields.map(f => f.key).join(',')
    return `[automotive_block 
  api="${config.apiUrl}" 
  method="${config.method}" 
  type="${config.displayType}" 
  items="${config.itemsPerView}" 
  fields="${fields}"
  domain="{{DOMAIN}}"
]`
  }

  async init() {
    const data = await this.fetchData();
    this.render(data);
    this.attachEvents();
  }

  attachEvents() {
    if (this.displayType === 'slider') {
      const prev = this.container.querySelector('.prev');
      const next = this.container.querySelector('.next');
      const container = this.container.querySelector('.slider-container');
      let currentIndex = 0;
      
      prev?.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        container.style.transform = \`translateX(-\${currentIndex * (100 / this.itemsPerView)}%)\`;
      });
      
      next?.addEventListener('click', () => {
        const maxIndex = Math.ceil(container.children.length / this.itemsPerView) - 1;
        currentIndex = Math.min(maxIndex, currentIndex + 1);
        container.style.transform = \`translateX(-\${currentIndex * (100 / this.itemsPerView)}%)\`;
      });
    }
  }
}

// Usage Example:
new AutomotiveBlock({
  selector: '#automotive-block',
  apiUrl: '${config.apiUrl}',
  method: '${config.method}',
  displayType: '${config.displayType}',
  itemsPerView: ${config.itemsPerView},
  fields: ${JSON.stringify(config.fields, null, 2)}
});`
  }

  const generateCSS = () => {
    return `.automotive-block {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.automotive-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.automotive-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

.field {
  margin-bottom: 0.5rem;
}

.field.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.field.price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
}

.view-details {
  width: 100%;
  background: #1e40af;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.view-details:hover {
  background: #1d4ed8;
}

.automotive-slider {
  position: relative;
  overflow: hidden;
}

.slider-container {
  display: flex;
  gap: 1.5rem;
  transition: transform 0.3s ease;
}

.slider-container .automotive-card {
  flex: 0 0 calc(100% / ${config.itemsPerView} - 1rem);
}

.slider-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.slider-nav button {
  background: #1e40af;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
}

.automotive-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .slider-container .automotive-card {
    flex: 0 0 calc(100% - 1rem);
  }
}`

  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Automotive Block</title>
    <style>
        ${generateCSS()}
    </style>
</head>
<body>
    <div id="automotive-block"></div>
    
    <script>
        ${generateJavaScript()}
    </script>
</body>
</html>`
  }

  const generateWordPressPlugin = () => {
    return `<?php
/**
 * Plugin Name: Automotive Blocks
 * Description: Generate automotive display blocks
 * Version: 1.0.0
 */

function automotive_block_shortcode($atts) {
    $atts = shortcode_atts([
        'api' => '',
        'method' => 'GET',
        'type' => 'slider',
        'items' => '3',
        'fields' => 'title,price,make,year',
        'domain' => get_site_url()
    ], $atts);

    $api_url = str_replace('{{DOMAIN}}', $atts['domain'], $atts['api']);
    $fields_array = explode(',', $atts['fields']);
    
    ob_start();
    ?>
    <div id="automotive-block-<?php echo uniqid(); ?>" class="automotive-block-wrapper"></div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            new AutomotiveBlock({
                selector: '#automotive-block-<?php echo uniqid(); ?>',
                apiUrl: '<?php echo esc_js($api_url); ?>',
                method: '<?php echo esc_js($atts['method']); ?>',
                displayType: '<?php echo esc_js($atts['type']); ?>',
                itemsPerView: <?php echo intval($atts['items']); ?>,
                fields: <?php echo json_encode(array_map(function($field) {
                    return ['key' => trim($field), 'type' => 'text'];
                }, $fields_array)); ?>
            });
        });
    </script>
    <?php
    return ob_get_clean();
}
add_shortcode('automotive_block', 'automotive_block_shortcode');

function automotive_block_enqueue_scripts() {
    wp_enqueue_script('automotive-block-js', plugin_dir_url(__FILE__) . 'automotive-block.js', [], '1.0.0', true);
    wp_enqueue_style('automotive-block-css', plugin_dir_url(__FILE__) . 'automotive-block.css', [], '1.0.0');
}
add_action('wp_enqueue_scripts', 'automotive_block_enqueue_scripts');
?>`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const codeTypes = [
    { id: 'shortcode', label: 'Shortcode', icon: FileCode },
    { id: 'javascript', label: 'JavaScript', icon: FileCode },
    { id: 'css', label: 'CSS', icon: FileCode },
    { id: 'html', label: 'Complete HTML', icon: FileCode },
    { id: 'wordpress', label: 'WordPress Plugin', icon: FileCode }
  ]

  const getContent = () => {
    switch (activeCode) {
      case 'shortcode': return generateShortcode()
      case 'javascript': return generateJavaScript()
      case 'css': return generateCSS()
      case 'html': return generateHTML()
      case 'wordpress': return generateWordPressPlugin()
      default: return generateShortcode()
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Usage Instructions</h3>
        <div className="text-blue-800 space-y-2">
          <p><strong>Shortcode:</strong> Copy and paste into your CMS or website</p>
          <p><strong>Dynamic Variables:</strong> Use <code>{{DOMAIN}}</code> for dynamic domain replacement</p>
          <p><strong>API Format:</strong> Ensure your API returns JSON array of objects</p>
          <p><strong>Fields:</strong> API response should match the field keys you defined</p>
        </div>
      </div>

      <div className="flex space-x-2 border-b">
        {codeTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveCode(id)}
            className={`flex items-center gap-2 px-4 py-2 border-b-2 font-medium ${
              activeCode === id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-gray-900">Generated Code</h4>
          <div className="flex gap-2">
            <button
              onClick={() => copyToClipboard(getContent())}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
            >
              <Copy className="h-4 w-4" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button
              onClick={() => downloadFile(getContent(), `automotive-block.${activeCode === 'wordpress' ? 'php' : activeCode === 'css' ? 'css' : activeCode === 'html' ? 'html' : 'js'}`)}
              className="flex items-center gap-2 px-3 py-1 bg-primary text-white hover:bg-blue-700 rounded-lg text-sm"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
        
        <pre className="generated-code p-4 rounded-lg overflow-x-auto text-sm">
          <code>{getContent()}</code>
        </pre>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-900 mb-2">API Response Example</h4>
        <pre className="text-yellow-800 text-sm overflow-x-auto">
{`[
  {
    ${config.fields.map(field => `"${field.key}": "${field.type === 'currency' ? '45000' : field.type === 'number' ? '2024' : field.type === 'image' ? 'https://example.com/car.jpg' : 'Sample ' + field.label}"`).join(',\n    ')}
  }
]`}
        </pre>
      </div>
    </div>
  )
}const generateJavaScript = () => {
    return `// Automotive Block Component
class AutomotiveBlock {
  constructor(options) {
    this.apiUrl = options.apiUrl.replace('{{DOMAIN}}', window.location.origin);
    this.method = options.method || 'GET';
    this.displayType = options.displayType || 'slider';
    this.itemsPerView = options.itemsPerView || 3;
    this.fields = options.fields || [];
    this.container = document.querySelector(options.selector);
    this.init();
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiUrl, { method: this.method });
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }

  formatValue(value, type) {
    switch (type) {
      case 'currency': return '$' + value.toLocaleString();
      case 'number': return value.toString();
      default: return value;
    }
  }

  renderCard(item) {
    const imageField = this.fields.find(f => f.type === 'image');
    return \`
      <div class="automotive-card">
        \${imageField ? \`<img src="\${item[imageField.key]}" alt="\${item.title}" class="card-image">\` : ''}
        <div class="card-content">
          \${this.fields.filter(f => f.type !== 'image').map(field => \`
            <div class="field \${field.key}">
              \${this.formatValue(item[field.key], field.type)}
            </div>
          \`).join('')}
          <button class="view-details">View Details</button>
        </div>
      </div>
    \`;
  }

  render(data) {
    if (this.displayType === 'slider') {
      this.container.innerHTML = \`
        <div class="automotive-slider">
          <div class="slider-container">
            \${data.map(item => this.renderCard(item)).join('')}
          </div>
          <div class="slider-nav">
            <button class="prev">❮</button>
            <button class="next">❯</button>
          </div>
        </div>
      \`;
    } else if (this.displayType === 'list') {
      this.container.innerHTML = \`
        <div class="automotive-list">
          \${data.map(item => this.renderCard(item)).join('')}
        </div>
      \`;
    }
    // Add more display types as needed
  }

  