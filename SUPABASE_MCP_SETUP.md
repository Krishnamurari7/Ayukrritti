# Supabase MCP Connection Guide

This guide will help you connect Supabase MCP (Model Context Protocol) to Cursor, enabling AI assistants to interact with your Supabase database directly.

## What is Supabase MCP?

Model Context Protocol (MCP) allows AI assistants like Cursor's AI to securely connect to and interact with your Supabase projects. Once connected, you can:
- Query your database tables
- Manage database schema
- Execute SQL queries
- View service logs
- Access security and performance advisors

## Setup Instructions

### Method 1: Using Cursor Settings (Recommended)

1. **Open Cursor Settings**
   - Press `Ctrl+,` (Windows) or `Cmd+,` (Mac) to open settings
   - Or go to `File → Preferences → Settings`

2. **Navigate to MCP Settings**
   - Search for "MCP" or "Model Context Protocol" in the settings search bar
   - Or go to `Features → Model Context Protocol`

3. **Add Supabase MCP Server**
   - Click "Add Server" or "Configure MCP Servers"
   - Add the following configuration:

   ```json
   {
     "mcpServers": {
       "supabase": {
         "url": "https://mcp.supabase.com/mcp"
       }
     }
   }
   ```

4. **Authenticate**
   - After adding the server, Cursor will prompt you to authenticate
   - A browser window will open asking you to log in to your Supabase account
   - Grant organization access when prompted
   - After logging in, restart Cursor to detect all available tools

### Method 2: Manual Configuration File

If you prefer to configure manually, you can edit Cursor's MCP configuration file:

**Windows Location:**
```
%APPDATA%\Cursor\User\globalStorage\mcp.json
```

**Mac Location:**
```
~/Library/Application Support/Cursor/User/globalStorage/mcp.json
```

**Linux Location:**
```
~/.config/Cursor/User/globalStorage/mcp.json
```

Add the following configuration:

```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```

## Verification

After setup, you can verify the connection by:

1. **Check MCP Resources**
   - The AI assistant should now be able to see your Supabase resources
   - Try asking: "List my Supabase tables" or "Show me my database schema"

2. **Available Tools**
   Once connected, you'll have access to:
   - Database operations (list tables, execute SQL, manage migrations)
   - Debugging tools (service logs, security advisors)
   - Configuration access

## Troubleshooting

### Connection Issues
- Make sure you're logged into your Supabase account
- Verify you have access to the Supabase project
- Restart Cursor after configuration changes

### Authentication Problems
- Clear browser cookies and try logging in again
- Make sure you grant organization access when prompted
- Check that your Supabase account has the necessary permissions

### Not Seeing Resources
- Restart Cursor completely
- Check that the MCP server is enabled in settings
- Verify the configuration JSON is valid

## Your Current Supabase Setup

Based on your project configuration, you're using:
- **Supabase URL**: Set via `NEXT_PUBLIC_SUPABASE_URL` environment variable
- **Anon Key**: Set via `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
- **Service Role Key**: Set via `SUPABASE_SERVICE_ROLE_KEY` environment variable

The MCP connection will use your Supabase account authentication, so you don't need to provide these keys separately.

## Next Steps

After connecting:
1. Try asking the AI to explore your database schema
2. Query your tables: "Show me all products in my database"
3. Get insights: "What are the most recent orders?"
4. Manage your database through natural language commands

## Resources

- [Supabase MCP Documentation](https://supabase.com/docs/guides/getting-started/mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Supabase Dashboard](https://app.supabase.com)
