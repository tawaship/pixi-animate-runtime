@echo off
rem Generates runtime content for pixi-animate-runtime.
rem Drop a directory of Animate published content (or a published .js file) on this file,
rem or double-click it to be asked for the directory.
rem Put this file in your project (where pixi-animate-runtime is installed).
cd /d "%~dp0"
call npx --no-install @tawaship/pixi-animate-runtime %*
pause
