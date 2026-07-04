@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo ========================================
echo   NuX Agent Upgrade Installer
echo ========================================
echo.

where bun >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Bun was not found in PATH.
  echo Install Bun first, then restart this terminal.
  echo https://bun.sh/docs/installation
  exit /b 1
)

if not exist package.json (
  echo [ERROR] package.json was not found.
  echo Run this file from the repository root.
  exit /b 1
)

if not exist packages\nux\package.json (
  echo [ERROR] packages\nux\package.json was not found.
  echo Make sure this checkout includes the NuX upgrade files.
  exit /b 1
)

echo [1/3] Installing dependencies...
bun install
if errorlevel 1 exit /b 1

echo.
echo [2/3] Running NuX doctor...
bun run nux:doctor
if errorlevel 1 exit /b 1

echo.
echo [3/3] Running NuX smoke benchmark...
bun run nux:bench
if errorlevel 1 exit /b 1

echo.
echo NuX is installed and verified.
echo Next commands:
echo   bun run nux:plan "Improve this project"
echo   bun run nux:risk "git status"
echo   bun run nux:bench --summary
echo.
