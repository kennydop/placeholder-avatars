# Placeholder Avatars

## Description

Placeholder Avatars is a Node.js application that generates unique, personalized avatars based on user input. It supports a variety of avatar types including emoji, initials, patterns, circles, and lines. The server is perfect for applications and websites that require user avatars, offering a more personalized and fun alternative to standard placeholder images.

## Usage

To generate an avatar, make a GET request to the server with the following parameters:

- `name` or `email`: The user's name or email. This is used to generate a unique avatar.
- `width` and `height`: The desired width and height of the avatar (default is 200x200).
- `color`: The desired color of the avatar (default is black).
- `bg`: The desired background color of the avatar (default is white).
- `type`: The type of avatar to generate. Options include `emoji`, `initials`, `pattern`, `circles`, and `lines` (default is `initials`).

Example request:

```
https://placeholder-avatars.herokuapp.com/?name=John%20Doe&width=200&height=200&color=000&bg=fff&type=emoji
```

The server will return the generated avatar as a PNG image.

## Local Installation

1. Ensure that you have Node.js installed on your system. If not, you can download it from [here](https://nodejs.org/).

2. Clone this repository to your local machine.

3. Navigate to the project directory and install the required dependencies by running:

```bash
npm install
```

## Local Usage

To start the server, run the following command in your terminal:

```bash
node server.js
```

The server will start and listen on port 5551.

To generate an avatar, make a GET request to the server with the following parameters:

- `name` or `email`: The user's name or email. This is used to generate a unique avatar.
- `width` and `height`: The desired width and height of the avatar (default is 200x200).
- `color`: The desired color of the avatar (default is black).
- `bg`: The desired background color of the avatar (default is white).
- `type`: The type of avatar to generate. Options include `emoji`, `initials`, `pattern`, `circles`, and `lines` (default is `initials`).

Example request:

```
http://localhost:5551/?name=John%20Doe&width=200&height=200&color=000&bg=fff&type=emoji
```

The server will return the generated avatar as a PNG image.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GNU General Public License v3.0 License. See the [LICENSE](https://github.com/kennydop/placeholder-avatars/blob/main/LICENSE) file for details.
