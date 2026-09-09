@echo off
title Open Portfolio in Visual Studio Code
echo Opening portfolio project in Visual Studio Code...
start "" "%LOCALAPPDATA%\Programs\Microsoft VS Code\Code.exe" "%~dp0"
exit
