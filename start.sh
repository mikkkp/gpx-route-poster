#!/bin/bash
# macOS 双击运行（Linux: bash start.sh）。起本地静态服务并打开浏览器；关闭此终端窗口即停止。
cd "$(dirname "$0")"
PORT=${PORT:-8765}
while lsof -i :$PORT >/dev/null 2>&1 || ss -ltn 2>/dev/null | grep -q ":$PORT "; do PORT=$((PORT+1)); done
URL="http://127.0.0.1:$PORT/index.html"
( sleep 1; if command -v open >/dev/null; then open "$URL"; else xdg-open "$URL" >/dev/null 2>&1 || echo "请手动打开 $URL"; fi ) &
echo "海报工具已启动：$URL  （Ctrl+C 或关闭窗口停止）"
exec python3 -m http.server "$PORT" --bind 127.0.0.1
