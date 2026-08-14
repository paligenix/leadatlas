@echo off
setlocal
set "NODE_HOME=%USERPROFILE%\.local\node"
if not exist "%NODE_HOME%\node.exe" (
  echo Portable Node not found at %NODE_HOME%
  exit /b 1
)
set "PATH=%NODE_HOME%;%PATH%"
cd /d "%~dp0"
if not exist "node_modules\vite" (
  echo Installing dependencies...
  call "%NODE_HOME%\npm.cmd" install
  if errorlevel 1 exit /b 1
)
echo LeadAtlas
echo UI:  http://127.0.0.1:5173/
echo API: http://127.0.0.1:8787/
call "%NODE_HOME%\npm.cmd" run dev
