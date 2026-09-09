@echo off
title Portfolio Website Preview
echo ========================================================
echo   Launching Personal Portfolio Website Preview...
echo ========================================================
echo.

where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting local web server at http://localhost:8000 ...
    start "" http://localhost:8000
    py -m http.server 8000
    goto end
)

where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Starting local web server at http://localhost:8000 ...
    start "" http://localhost:8000
    python -m http.server 8000
    goto end
)

echo Opening index.html directly in your default browser...
start "" index.html

:end
