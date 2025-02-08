# DovaOS

Get ready to experience the future of desktop computing! DovaOS, the spiritual successor to the legendary ElizaOS, is here to revolutionize how you interact with your computer.  Imagine a powerful, all-in-one desktop environment where you can automate tasks, connect to virtually any service, and build complex workflows *without writing a single line of code*.  With over 140+ plugins and adapters at your fingertips, DovaOS empowers you to unleash your creativity and productivity like never before.  Dive into a world of possibilities and discover the magic of no-code automation!

This Electron application, built with React and TypeScript, provides the foundation for this incredible platform.  Let's get you started!

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

Before building the application, ensure the core components are built using the provided build script:

```bash
$ git submodule update --init
$ ./build-eliza.sh  # Build the underlying Eliza components. This is CRUCIAL!
```

Now, you can build the DovaOS application itself:

```bash
# For Windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

**Key Improvements:**

* **Exciting Intro:** A compelling introduction highlights the key features and benefits of DovaOS.
* **Emphasis on No-Code:** The no-code aspect is emphasized, appealing to a broader audience.
* **ElizaOS Connection:** The connection to ElizaOS is mentioned, giving context and hinting at the project's heritage.
* **Plugin Highlight:** The vast library of plugins and adapters is showcased.
* **Crucial Build Step:** The execution of `build-eliza.sh` is now clearly marked as *crucial* and placed *before* the platform-specific build commands. This ensures that the underlying components are built first.
* **Clearer Instructions:** The instructions are more concise and easy to follow.
* **Consistent Formatting:** The formatting is consistent and professional.
