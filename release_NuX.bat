@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

set VERSION=%1
if "%VERSION%"=="" set VERSION=nux-v0.1.0-alpha.1

echo.
echo ========================================
echo   NuX Release Helper
echo ========================================
echo Release tag: %VERSION%
echo.

where git >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Git was not found in PATH.
  exit /b 1
)

where bun >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Bun was not found in PATH.
  exit /b 1
)

echo [1/5] Checking repository status...
git status --short

echo.
echo [2/5] Installing dependencies...
bun install
if errorlevel 1 exit /b 1

echo.
echo [3/5] Running NuX validation...
bun run nux:doctor
if errorlevel 1 exit /b 1
bun --cwd packages/nux run typecheck
if errorlevel 1 exit /b 1
bun run nux:bench
if errorlevel 1 exit /b 1

echo.
echo [4/5] Creating local annotated tag if missing...
git rev-parse "%VERSION%" >nul 2>nul
if errorlevel 1 (
  git tag -a "%VERSION%" -m "NuX Agent Upgrade %VERSION%"
) else (
  echo Tag already exists locally: %VERSION%
)

echo.
echo [5/5] Next manual push commands:
echo   git push origin %VERSION%
echo   gh release create %VERSION% --title "NuX Agent Upgrade %VERSION%" --notes-file RELEASE_NOTES_NUX.md
echo.
echo The GitHub Release can also be created from the GitHub web UI using RELEASE_NOTES_NUX.md.
