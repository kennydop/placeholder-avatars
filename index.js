const http = require("http");
const url = require("url");
const { createCanvas } = require("canvas");
const crypto = require("crypto");
const randomColor = require("randomcolor");

// Define a list of emojis
const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "😎",
  "😍",
  "🤩",
  "😛",
  "😮",
  "🙃",
  "😵",
  "🥺",
  "🤠",
  "☠",
  "👻",
  "👽",
  "👾",
  "🤖",
  "💩",
  "🐱‍👤",
  "🙈",
  "🙉",
  "🙊",
  "🐵",
  "🐶",
  "🐺",
  "🐱",
  "🦁",
  "🐯",
  "🦒",
  "🦊",
  "🦝",
  "🐮",
  "🐷",
  "🐗",
  "🐭",
  "🐹",
  "🐰",
  "🐻",
  "🐨",
  "🐼",
  "🐸",
  "🦓",
  "🐴",
  "🦄",
  "🐔",
  "🐲",
  "🐾",
  "🐬",
  "🐋",
  "🐟",
  "🐙",
  "🦞",
  "🦀",
  "🐚",
  "🦜",
  "🦅",
  "🦚",
  "🦇",
  "🦋",
  "🐌",
  "🐛",
  "🐞",
  "🕷",
  "🕸",
  "👀",
  "🦴",
  "🧠",
  "👣",
  "💪",
  "🤞",
  "✌",
  "🖖",
  "🤘",
  "🤙",
  "🖐",
  "👌",
  "✊",
  "👊",
  "🤲",
  "🙏",
  "🎃",
  "🎗",
  "💎",
  "⚽",
  "⚾",
  "🥎",
  "🏀",
  "🏐",
  "🏈",
  "🏉",
  "🎱",
  "🎳",
  "🥌",
  "🎁",
  "🧶",
  "🎨",
  "🥊",
  "🏆",
  "🎮",
  "🕹",
  "🎲",
  "🔮",
  "🧿",
  "🧩",
  "🧸",
  "🪀",
  "♟",
  "♠",
  "♣",
  "♥",
  "♦",
  "🎼",
  "🎵",
  "🔒",
  "🔐",
  "🩸",
  "🌹",
  "💐",
  "🌸",
  "🏵",
  "🌺",
  "🌻",
  "🌼",
  "🌷",
  "☘",
  "🌍",
  "❄",
  "🔥",
  "💧",
  "🌠",
  "☄",
  "🌚",
  "❤",
  "❣",
  "💖",
  "💦",
  "💫",
  "☯",
  "⭕",
  "🔆",
  "🔴",
  "🔺",
  "🔻",
];
function getEmoji(nameOrEmail) {
  const hash = crypto.createHash("md5").update(nameOrEmail).digest("hex");
  const index = parseInt(hash, 16) % emojis.length;
  return emojis[index];
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("");
}

function getPattern(nameOrEmail) {
  const hash = crypto.createHash("md5").update(nameOrEmail).digest("hex");
  return hash;
}

function drawEmoji(canvas, emoji, color, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "100px serif";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
  return canvas.toBuffer();
}

function drawInitials(canvas, initials, color, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "60px serif";
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
  return canvas.toBuffer();
}

function drawPattern(canvas, pattern, color, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  const number = parseInt(pattern, 16);
  const _type = number % 3;

  switch (_type) {
    case 0:
      for (let i = 0; i < canvas.width / 2; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          if (
            parseInt(pattern[(i / 10 + j / 10) % pattern.length], 16) % 2 ===
            0
          ) {
            ctx.fillRect(i, j, 10, 10);
            ctx.fillRect(canvas.width - i - 10, j, 10, 10);
          } else {
            let radius =
              (parseInt(pattern[(i / 10 + j / 10) % pattern.length], 16) % 5) +
              3;
            ctx.beginPath();
            ctx.arc(i + 5, j + 5, radius, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(canvas.width - i - 5, j + 5, radius, 0, Math.PI * 2, true);
            ctx.fill();
          }
        }
      }
      break;

    case 1:
      for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          if (
            parseInt(pattern[(i / 10 + j / 10) % pattern.length], 16) % 2 ===
            0
          ) {
            ctx.fillRect(i, j, 10, 10);
          } else {
            let radius =
              (parseInt(pattern[(i / 10 + j / 10) % pattern.length], 16) % 5) +
              3;
            ctx.beginPath();
            ctx.arc(i + 5, j + 5, radius, 0, Math.PI * 2, true);
            ctx.fill();
          }
        }
      }
      break;

    case 2:
      for (let i = 0; i < canvas.width; i += 10) {
        for (let j = 0; j < canvas.height; j += 10) {
          if (
            parseInt(pattern[(i / 10 + j / 10) % pattern.length], 16) % 2 ===
            0
          ) {
            ctx.fillRect(i, j, 10, 10);
          }
        }
      }
      break;
  }
  return canvas.toBuffer();
}

function drawCircles(canvas, pattern, color, bgColor) {
  const ctx = canvas.getContext("2d");

  // Set the background color and fill the canvas
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0, h = 0; i <= canvas.width; i += 20) {
    for (let j = 0; j <= canvas.height; j += 20, h = (h + 1) % pattern.length) {
      let radius = parseInt(pattern[h], 16); // Vary the size of the circle based on the pattern
      ctx.fillStyle = color ?? randomColor({ seed: pattern[h] }); // Generate a deterministic color for the circle
      ctx.beginPath();
      ctx.arc(i, j, radius, 0, Math.PI * 2, true);
      ctx.fill();
    }
  }
  // Save the canvas as a PNG image
  return canvas.toBuffer("image/png");
}

function drawLines(canvas, pattern, color, bgColor) {
  const ctx = canvas.getContext("2d");

  // Set the background color and fill the canvas
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const number = parseInt(pattern, 16);
  const _type = number % 2;

  // Draw the pattern on the canvas
  switch (_type) {
    case 0:
      for (let i = 0; i <= canvas.width; i += 20) {
        for (let j = 0; j <= canvas.height; j += 20) {
          ctx.strokeStyle = color ?? randomColor(); // Generate a random color for the line
          ctx.beginPath();
          ctx.moveTo(i, j);
          ctx.lineTo(canvas.width - i, canvas.height - j);
          ctx.stroke();
        }
      }
      break;

    case 1:
      // Draw a pattern of horizontal and vertical lines with different colors
      for (let i = 0; i <= canvas.width; i += 20) {
        let position = (parseInt(pattern[i], 16) / 16) * canvas.width;

        ctx.strokeStyle = color ?? randomColor({ seed: pattern[i] }); // Generate a deterministic color for the line

        if (i % 2 === 0) {
          // Draw a horizontal line at a deterministic position
          ctx.beginPath();
          ctx.moveTo(0, position);
          ctx.lineTo(canvas.width, position);
          ctx.stroke();
        } else {
          // Draw a vertical line at a deterministic position
          ctx.beginPath();
          ctx.moveTo(position, 0);
          ctx.lineTo(position, canvas.height);
          ctx.stroke();
        }
      }
      break;
  }
  // Save the canvas as a PNG image
  return canvas.toBuffer("image/png");
}

http
  .createServer((req, res) => {
    const query = url.parse(req.url, true).query;
    const nameOrEmail = query.name || query.email || "Anonymous";
    const width = parseInt(query.width) || 200;
    const height = parseInt(query.height) || 200;
    const color = query.color ? `#${query.color}` : null;
    const bgColor = query.bg ? `#${query.bg}` : "#fff";
    const type =
      nameOrEmail == "Anonymous" ? "emoji" : query.type || "initials";

    const canvas = createCanvas(width, height);
    let buffer;

    switch (type) {
      case "emoji":
        const emoji = getEmoji(nameOrEmail);
        buffer = drawEmoji(canvas, emoji, color ?? "#000", bgColor);
        break;
      case "initials":
        const initials = getInitials(nameOrEmail);
        buffer = drawInitials(canvas, initials, color ?? "#000", bgColor);
        break;
      case "pattern":
        const pattern = getPattern(nameOrEmail);
        buffer = drawPattern(canvas, pattern, color ?? "#000", bgColor);
        break;
      case "circles":
        const circles = getPattern(nameOrEmail);
        buffer = drawCircles(canvas, circles, color, bgColor);
        break;
      case "lines":
        const lines = getPattern(nameOrEmail);
        buffer = drawLines(canvas, lines, color, bgColor);
        break;
      default:
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end(
          "Invalid type parameter. Must be one of: emoji, initials, pattern."
        );
        return;
    }
    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(buffer);
  })
  .listen(process.env.PORT || 5551);
