# PortZap

A command-line tool to easily identify and terminate processes using specific ports on your system.

## Features

- 🔍 Scan for processes using a specific port
- 📊 Display detailed process information in a table format
- ⚡ Selectively terminate processes
- 🎯 Simple and intuitive command-line interface
- 🔧 Cross-platform support (Windows, Linux, macOS)

## Installation

### Using npm

```bash
npm install -g portzapper
```

### Manual Installation

1. Clone the repository:
```bash
git clone https://github.com/pablo-medina/portzapper.git
```

2. Install dependencies:
```bash
cd portzapper
npm install
```

3. Build the executable:
```bash
npm run build
```

The compiled binaries will be available in the `dist` directory.

## Usage

1. Run the application:
```bash
portzap
```

2. Enter the port number you want to scan when prompted
3. Review the table of processes using the port
4. Select the processes you want to terminate
5. The selected processes will be terminated, freeing up the port

## Example

```
⚡ Welcome to PortZap! Let's reclaim your port. ⚡

? Enter the port number to scan: 3000

Processes using port 3000:

┌───────┬────────────────────┬──────────┬──────────────┐
│ PID   │ Name               │ Session  │ Memory Usage │
├───────┼────────────────────┼──────────┼──────────────┤
│ 1234  │ node.exe           │ Console  │ 45,000 K     │
└───────┴────────────────────┴──────────┴──────────────┘

? Select processes to terminate: node.exe (PID 1234)
✅ Process 1234 killed.

✨ Done. Port should be free now.
```

## Requirements

- Node.js 16 or higher
- Windows, Linux, or macOS operating system

## Dependencies

- cli-table3: For displaying process information in a table format
- inquirer: For interactive command-line prompts

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Pablo Medina

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 