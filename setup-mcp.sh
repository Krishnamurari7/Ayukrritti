#!/bin/bash
# Bash script to set up Supabase MCP configuration for Cursor
# Run this script: chmod +x setup-mcp.sh && ./setup-mcp.sh

# Determine OS and set config path
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    MCP_CONFIG_PATH="$HOME/Library/Application Support/Cursor/User/globalStorage/mcp.json"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux
    MCP_CONFIG_PATH="$HOME/.config/Cursor/User/globalStorage/mcp.json"
else
    echo "Unsupported OS. Please configure manually."
    exit 1
fi

MCP_CONFIG_DIR=$(dirname "$MCP_CONFIG_PATH")

# Create directory if it doesn't exist
mkdir -p "$MCP_CONFIG_DIR"

# MCP configuration
MCP_CONFIG='{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}'

# Check if mcp.json already exists
if [ -f "$MCP_CONFIG_PATH" ]; then
    echo "Found existing MCP configuration at: $MCP_CONFIG_PATH"
    
    # Check if supabase server already exists
    if grep -q '"supabase"' "$MCP_CONFIG_PATH"; then
        echo "Supabase MCP server already configured!"
        echo "Current configuration:"
        cat "$MCP_CONFIG_PATH"
        read -p "Do you want to update it? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Configuration unchanged."
            exit 0
        fi
    fi
    
    # Merge with existing configuration (simple merge - adds supabase if not exists)
    # For a proper merge, you might want to use jq if available
    if command -v jq &> /dev/null; then
        jq '.mcpServers.supabase = {"url": "https://mcp.supabase.com/mcp"}' "$MCP_CONFIG_PATH" > "$MCP_CONFIG_PATH.tmp" && mv "$MCP_CONFIG_PATH.tmp" "$MCP_CONFIG_PATH"
    else
        echo "Warning: jq not found. Creating new configuration file."
        echo "$MCP_CONFIG" > "$MCP_CONFIG_PATH"
    fi
else
    # Create new configuration
    echo "$MCP_CONFIG" > "$MCP_CONFIG_PATH"
fi

echo ""
echo "✅ Supabase MCP configuration has been added!"
echo ""
echo "Configuration saved to: $MCP_CONFIG_PATH"
echo ""
echo "Next steps:"
echo "1. Restart Cursor completely"
echo "2. You'll be prompted to authenticate with your Supabase account"
echo "3. Grant organization access when prompted"
echo "4. After authentication, you can query your database!"
echo ""
echo "Try asking: 'List my Supabase tables' or 'Show me my database schema'"
