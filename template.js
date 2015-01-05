var index = {};

module.exports = index; 
<% paths.forEach(function(p) { if (p[0] !== 'index') { %>
index.<%= p[0] %> = require('./<%= p[0] %>'); <% }}) %>
